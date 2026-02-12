import { useState, useMemo } from "react";
import { USERS, User } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, ShieldAlert, Users, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [allUsers, setAllUsers] = useState<User[]>(USERS);
  const { toast } = useToast();

  const handleStatusUpdate = (userId: string, newStatus: "approved" | "rejected") => {
    setAllUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: `User ${newStatus === "approved" ? "Approved" : "Rejected"}`,
      description: `User status has been updated successfully.`,
    });
  };

  const pendingUsers = allUsers.filter(u => u.status === "pending");
  const tutors = allUsers.filter(u => u.role === "tutor");
  const students = allUsers.filter(u => u.role === "student");

  const StatusBadge = ({ status }: { status?: string }) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Rejected</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      default:
        return <Badge variant="secondary">Active</Badge>;
    }
  };

  const UserTable = ({ users }: { users: User[] }) => (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold">{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="text-right">
                {user.status === "pending" ? (
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 w-8 p-0 rounded-full border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => handleStatusUpdate(user.id, "rejected")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full bg-green-500 hover:bg-green-600"
                      onClick={() => handleStatusUpdate(user.id, "approved")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" className="h-8 text-xs">View Details</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground">Manage platform users, approvals, and system health.</p>
        </div>
        <div className="flex gap-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" /> System Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-none bg-primary/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
              <Users className="h-4 w-4" /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-yellow-500/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" /> Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs your attention</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-green-500/5 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase flex items-center gap-2">
              <UserCheck className="h-4 w-4" /> Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">84</div>
            <p className="text-xs text-muted-foreground mt-1">Across NYC area</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-6">All Users</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg px-6 flex gap-2 items-center">
              Pending {pendingUsers.length > 0 && <Badge className="h-5 min-w-5 px-1 bg-primary text-[10px]">{pendingUsers.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="tutors" className="rounded-lg px-6">Tutors</TabsTrigger>
            <TabsTrigger value="students" className="rounded-lg px-6">Students</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="rounded-full flex-1 md:flex-none">Export CSV</Button>
            <Button size="sm" className="rounded-full flex-1 md:flex-none">Add New User</Button>
          </div>
        </div>

        <TabsContent value="all" className="animate-in fade-in slide-in-from-bottom-2">
          <UserTable users={allUsers} />
        </TabsContent>
        
        <TabsContent value="pending" className="animate-in fade-in slide-in-from-bottom-2">
          {pendingUsers.length > 0 ? (
            <UserTable users={pendingUsers} />
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
              <UserCheck className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-bold text-lg">All caught up!</h3>
              <p className="text-muted-foreground">There are no pending user approvals at this time.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tutors" className="animate-in fade-in slide-in-from-bottom-2">
          <UserTable users={tutors} />
        </TabsContent>

        <TabsContent value="students" className="animate-in fade-in slide-in-from-bottom-2">
          <UserTable users={students} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
