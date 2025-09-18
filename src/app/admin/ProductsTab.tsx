'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
    setProducts(productsData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleAdd = () => {
    setCurrentProduct({
        id: 'new-product-' + Date.now(),
        name: '',
        price: 0,
        image: 'https://picsum.photos/seed/placeholder/400/400',
        category: '',
        description: '',
        inStock: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
      toast.success('Товар удален');
    }
  };

  const handleSave = async () => {
    if (!currentProduct || !currentProduct.id) return;
    const { id, ...productData } = currentProduct;
    await setDoc(doc(db, 'products', id), productData, { merge: true });
    fetchProducts();
    setIsDialogOpen(false);
    setCurrentProduct(null);
    toast.success('Товар сохранен');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    const { name, value, type } = e.target;
    
    setCurrentProduct({
      ...currentProduct,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };
  
  const handleCheckboxChange = (checked: boolean) => {
     if (!currentProduct) return;
     setCurrentProduct({ ...currentProduct, inStock: checked });
  }

  return (
    <div>
        <Button onClick={handleAdd} className="mb-4">Добавить товар</Button>
        <div className="rounded-md border">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-[60px] hidden sm:table-cell">Фото</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead className="hidden md:table-cell">Цена</TableHead>
                      <TableHead className="hidden sm:table-cell">В наличии</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {products.map(product => (
                      <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                              <Image 
                                  src={product.image} 
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded-md object-cover"
                              />
                          </TableCell>
                          <TableCell className="font-medium max-w-[150px] truncate sm:max-w-none">{product.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{product.price} RUB</TableCell>
                          <TableCell className="hidden sm:table-cell">{product.inStock ? 'Да' : 'Нет'}</TableCell>
                          <TableCell>
                              <div className="flex justify-end items-center gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>Ред.</Button>
                                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Удалить</Button>
                              </div>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) setCurrentProduct(null);
            setIsDialogOpen(open);
        }}>
            {currentProduct && (
                 <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{currentProduct.name ? 'Редактировать товар' : 'Добавить товар'}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] -mr-6 pr-6">
                      <div className="grid gap-4 py-4">
                          <Input name="name" placeholder="Название" value={currentProduct.name} onChange={handleChange} />
                          <Input name="price" type="number" placeholder="Цена" value={currentProduct.price} onChange={handleChange} />
                          <Input name="category" placeholder="Категория (slug)" value={currentProduct.category} onChange={handleChange} />
                          <Input name="description" placeholder="Описание" value={currentProduct.description} onChange={handleChange} />
                          <Input name="band" placeholder="Группа" value={currentProduct.band} onChange={handleChange} />
                          <Input name="image" placeholder="URL изображения" value={currentProduct.image} onChange={handleChange} />
                          {currentProduct.image && (
                              <div className="mt-2">
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Предпросмотр:</p>
                                  <Image
                                      src={currentProduct.image}
                                      alt={currentProduct.name || 'Предпросмотр изображения'}
                                      width={100}
                                      height={100}
                                      className="rounded-md object-cover border"
                                      onError={(e) => {
                                          e.currentTarget.src = 'https://placehold.co/100x100?text=Error';
                                      }}
                                  />
                              </div>
                          )}
                          <div className="flex items-center space-x-2 pt-2">
                            <Checkbox 
                                id="inStockCheckbox" 
                                name="inStock" 
                                checked={!!currentProduct.inStock} 
                                onCheckedChange={handleCheckboxChange} 
                            />
                            <Label htmlFor="inStockCheckbox">В наличии</Label>
                          </div>
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                        <DialogClose asChild>
                           <Button type="button" variant="secondary">Отмена</Button>
                        </DialogClose>
                        <Button onClick={handleSave}>Сохранить</Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    </div>
  );
}
