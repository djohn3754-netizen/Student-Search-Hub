import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Plus, 
  Smile, 
  Image as ImageIcon,
  Check,
  CheckCheck
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TUTORS } from "@/lib/mock-data";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export default function MessagingPage() {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState(TUTORS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", senderId: TUTORS[0].id, text: "Hi! Are you ready for our session tomorrow?", timestamp: "10:30 AM", status: "read" },
    { id: "2", senderId: "current-user", text: "Yes, I've prepared the list of questions we discussed.", timestamp: "10:35 AM", status: "read" },
    { id: "3", senderId: TUTORS[0].id, text: "Great! Please bring your textbook and the practice papers.", timestamp: "10:36 AM", status: "read" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setMessages([...messages, msg]);
    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact.id,
        text: "Understood! I'll see you then.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "delivered"
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  if (!user) return <div className="p-8 text-center">Please login to access messages.</div>;

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-120px)]">
      <div className="bg-card rounded-3xl border shadow-xl flex h-full overflow-hidden">
        
        {/* Sidebar: Contacts */}
        <div className="w-80 border-r flex flex-col hidden md:flex">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-heading font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-10 bg-muted/50 border-none rounded-xl" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y divide-muted/30">
              {TUTORS.map((tutor) => (
                <div 
                  key={tutor.id}
                  onClick={() => setSelectedContact(tutor)}
                  className={`p-4 flex gap-3 cursor-pointer transition-all hover:bg-muted/50 ${selectedContact.id === tutor.id ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-sm truncate">{tutor.name}</h4>
                      <span className="text-[10px] text-muted-foreground font-medium">10:36 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-medium">
                      See you tomorrow at the library.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-muted/5 relative">
          {/* Chat Header */}
          <div className="p-4 border-b bg-background/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm">{selectedContact.name}</h3>
                <p className="text-[10px] font-medium text-green-500 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary"><Phone className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary"><Video className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary"><MoreVertical className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* Messages Container */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg, i) => {
                const isMe = msg.senderId === "current-user";
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                      {!isMe && (
                        <Avatar className="h-8 w-8 mt-auto border border-muted shadow-sm">
                          <AvatarImage src={selectedContact.avatar} />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col gap-1">
                        <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                          isMe 
                            ? "bg-primary text-primary-foreground rounded-br-none" 
                            : "bg-background border rounded-bl-none"
                        }`}>
                          {msg.text}
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-medium text-muted-foreground ${isMe ? "justify-end" : "justify-start"}`}>
                          {msg.timestamp}
                          {isMe && (
                            msg.status === "read" ? <CheckCheck className="h-3 w-3 text-primary" /> : <Check className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 bg-background border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
              <div className="relative flex-1">
                <Input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="bg-muted/50 border-none rounded-full pr-20 h-11 focus-visible:ring-primary/20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Button type="submit" size="icon" className="rounded-full h-11 w-11 shadow-lg shadow-primary/20 shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
