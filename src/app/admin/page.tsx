'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTab from './ProductsTab';
import UsersTab from './UsersTab';
import { Header } from '@/components/Header';

export default function AdminPage() {
    const { user, userProfile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || (userProfile?.role !== 'admin' && userProfile?.role !== 'manager'))) {
            router.push('/');
        }
    }, [user, userProfile, loading, router]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!user || (userProfile?.role !== 'admin' && userProfile?.role !== 'manager')) {
        return null;
    }
    
    const pageTitle = userProfile?.role === 'admin' ? 'Админ панель' : 'Панель менеджера';

    return (
        <div>
            <Header 
                cartItemsCount={0} 
                searchQuery="" 
                onSearchChange={() => {}} 
                onCartClick={() => router.push('/')} 
                onCategoryClick={() => router.push('/')}
            />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
                <Tabs defaultValue="products">
                    <TabsList>
                        <TabsTrigger value="products">Товары</TabsTrigger>
                        {userProfile?.role === 'admin' && (
                           <TabsTrigger value="users">Пользователи</TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="products">
                       <ProductsTab />
                    </TabsContent>
                    {userProfile?.role === 'admin' && (
                        <TabsContent value="users">
                            <UsersTab />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}
