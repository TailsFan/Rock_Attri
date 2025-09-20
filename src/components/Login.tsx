'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog';

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Вы успешно вошли в систему');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DialogContent className="w-full sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Вход</DialogTitle>
        <DialogDescription>
          Введите свои данные для входа в аккаунт.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password"className="text-right">
            Пароль
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Закрыть
          </Button>
        </DialogClose>
        <DialogClose asChild>
           <Button onClick={handleLogin}>Войти</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
