'use client';
import { Search, ShoppingCart, User, Menu, LogOut, LayoutDashboard, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Login from './Login';
import Register from './Register';
import Link from 'next/link';
import { Separator } from './ui/separator';


interface HeaderProps {
  cartItemsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

export function Header({ 
  cartItemsCount, 
  searchQuery, 
  onSearchChange, 
  onCartClick,
  onCategoryClick 
}: HeaderProps) {
  const { user, userProfile, loading } = useAuth();
  const [dialogContent, setDialogContent] = useState<'login' | 'register' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Вы успешно вышли из системы');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error('Ошибка при выходе из системы');
    }
  };
  
  const adminPanelLabel = userProfile?.role === 'admin' ? 'Админ панель' : 'Панель менеджера';

  const categories = [
    { name: 'Все товары', slug: '' },
    { name: 'Футболки', slug: 'tshirts' },
    { name: 'Одежда', slug: 'clothing' },
    { name: 'Аксессуары', slug: 'accessories' },
    { name: 'Винил', slug: 'vinyl' },
    { name: 'Обувь', slug: 'shoes' },
    { name: 'Постеры', slug: 'posters' },
    { name: 'Кружки', slug: 'mugs' },
    { name: 'Статуэтки', slug: 'figurines' }
  ];
  
  const handleCategoryMobileClick = (category: string) => {
    onCategoryClick(category);
    setIsMobileMenuOpen(false);
  }

  const MobileMenu = (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-sm">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <h1 className="text-2xl text-primary tracking-tight cursor-pointer">
                  Rock_Attri
                </h1>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="py-4 flex flex-col h-full">
            <div className="mb-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Поиск..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 bg-background border-border"
                    />
                </div>
            </div>

            <nav className="flex-grow">
                 {categories.map((category) => (
                    <Button
                        key={category.slug}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCategoryMobileClick(category.slug)}
                        className="w-full text-muted-foreground hover:text-primary hover:bg-secondary justify-start text-base py-3"
                    >
                        {category.name}
                    </Button>
                ))}
            </nav>

            <Separator className="my-4" />

            {!loading && (
              user ? (
                <div className="space-y-2">
                   <p className="font-semibold px-3 truncate">{user.email}</p>
                   {(userProfile?.role === 'admin' || userProfile?.role === 'manager') && (
                      <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>{adminPanelLabel}</span>
                        </Button>
                      </Link>
                    )}
                   <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); setDialogContent('login'); }}>
                            Войти
                        </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setIsMobileMenuOpen(false); setDialogContent('register'); }}>
                            Регистрация
                        </Button>
                    </DialogTrigger>
                </div>
              )
            )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <Dialog onOpenChange={(open) => !open && setDialogContent(null)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="lg:hidden">
                {MobileMenu}
              </div>
              <Link href="/">
                <h1 className="text-2xl text-primary tracking-tight cursor-pointer">
                  Rock_Attri
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Поиск по группам и товарам..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                {!loading && (
                  user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <User className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className="truncate max-w-[200px]">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(userProfile?.role === 'admin' || userProfile?.role === 'manager') && (
                          <Link href="/admin">
                            <DropdownMenuItem>
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              <span>{adminPanelLabel}</span>
                            </DropdownMenuItem>
                          </Link>
                        )}
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Выйти</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <DialogTrigger asChild>
                        <Button variant="ghost" onClick={() => setDialogContent('login')}>
                          Войти
                        </Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button onClick={() => setDialogContent('register')}>
                          Регистрация
                        </Button>
                      </DialogTrigger>
                    </>
                  )
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          <nav className="hidden lg:block border-t border-border">
            <div className="flex flex-wrap gap-x-2 py-3">
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant="ghost"
                  size="sm"
                  onClick={() => onCategoryClick(category.slug)}
                  className="text-muted-foreground hover:text-primary hover:bg-secondary"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </nav>
        </div>
        
        {dialogContent === 'login' && <Login onClose={() => setDialogContent(null)} />}
        {dialogContent === 'register' && <Register onClose={() => setDialogContent(null)} />}
      </Dialog>
    </header>
  );
}
