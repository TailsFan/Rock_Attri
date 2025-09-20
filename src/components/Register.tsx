'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
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

interface RegisterProps {
  onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Set default role for new user
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user',
      });
      toast.success('Регистрация прошла успешно');
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DialogContent className="w-full sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Регистрация</DialogTitle>
        <DialogDescription>
          Создайте новый аккаунт.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email-register" className="text-right">
            Email
          </Label>
          <Input
            id="email-register"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password-register" className="text-right">
            Пароль
          </Label>
          <Input
            id="password-register"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="confirm-password-register" className="text-right">
            Подтвердите пароль
          </Label>
          <Input
            id="confirm-password-register"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button onClick={handleRegister}>Зарегистрироваться</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
