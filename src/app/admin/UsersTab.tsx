'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
    // Фильтруем текущего пользователя из списка, чтобы он не мог сам себя редактировать
    setUsers(usersData.filter(u => u.id !== user?.uid));
  };

  useEffect(() => {
    if(user) {
        fetchUsers();
    }
  }, [user]);

  const handleRoleChange = async (userId: string, role: string) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { role });
    fetchUsers();
    toast.success('Роль пользователя обновлена');
  };

  const handleDelete = async (userId: string) => {
    // Note: This only deletes the user's data from Firestore, not from Firebase Auth.
    // Deleting from Auth requires Admin SDK on a backend.
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.')) {
      await deleteDoc(doc(db, 'users', userId));
      fetchUsers();
      toast.success('Пользователь удален из базы данных');
    }
  };

  return (
    <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Роль</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(u => (
                    <TableRow key={u.id}>
                        <TableCell className="font-medium truncate max-w-[150px] sm:max-w-none">{u.email}</TableCell>
                        <TableCell>
                            <Select 
                                value={u.role} 
                                onValueChange={(value) => handleRoleChange(u.id, value)}
                                disabled={u.role === 'admin'}
                            >
                                <SelectTrigger className="w-full max-w-[150px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">Пользователь</SelectItem>
                                    <SelectItem value="manager">Менеджер</SelectItem>
                                    <SelectItem value="admin" disabled>Админ</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDelete(u.id)}
                                disabled={u.role === 'admin'}
                            >
                                Удалить
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
