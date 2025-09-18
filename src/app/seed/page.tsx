'use client';

import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import {
  collection,
  writeBatch,
  doc,
  setDoc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { products as initialProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const usersToSeed = [
    { email: 'admin@rock.com', password: 'password', role: 'admin' },
    { email: 'manager@rock.com', password: 'password', role: 'manager' },
    { email: 'user@rock.com', password: 'password', role: 'user' },
];

export default function SeedPage() {
  const [loading, setLoading] = useState(false);

  const seedDatabase = async () => {
    setLoading(true);
    try {
        // Seed products
        const productsBatch = writeBatch(db);
        const productsCollection = collection(db, 'products');
        initialProducts.forEach((product) => {
            const docRef = doc(productsCollection, product.id);
            productsBatch.set(docRef, product);
        });
        await productsBatch.commit();
        toast.success('Товары успешно добавлены');

        // Seed categories
        const categoriesBatch = writeBatch(db);
        const categoriesCollection = collection(db, 'categories');
        categories.forEach((category) => {
            const docRef = doc(categoriesCollection, category.id);
            categoriesBatch.set(docRef, category);
        });
        await categoriesBatch.commit();
        toast.success('Категории успешно добавлены');
        
        // Seed users and roles
        for (const userData of usersToSeed) {
            try {
                // IMPORTANT: In a real app, you'd use Admin SDK for user creation.
                // This client-side creation is for demo purposes and requires
                // email/password sign-in to be enabled in Firebase Auth.
                // It also logs in the user after creation. A better approach
                // for seeding is a server-side script.
                const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    role: userData.role,
                });
                toast.success(`Пользователь ${userData.email} создан`);
            } catch (error: any) {
                 if (error.code === 'auth/email-already-in-use') {
                    toast.info(`Пользователь ${userData.email} уже существует.`);
                } else {
                    console.error("Ошибка при создании пользователя:", userData.email, error);
                    toast.error(`Ошибка при создании пользователя ${userData.email}`);
                }
            }
        }
    } catch (error) {
        console.error('Ошибка заполнения базы данных:', error);
        toast.error('Ошибка заполнения базы данных');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Заполнение базы данных</CardTitle>
          <CardDescription>
            Нажмите кнопку ниже, чтобы заполнить вашу базу данных Firestore
            начальными данными (товары, категории и пользователи).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedDatabase} disabled={loading} className="w-full">
            {loading ? 'Заполнение...' : 'Заполнить базу данных'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
