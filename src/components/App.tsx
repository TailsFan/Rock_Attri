'use client';
import { useState, useMemo, useEffect } from 'react';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import { Cart } from './Cart';
import { ProductFilters } from './ProductFilters';
import { useCart } from '../hooks/useCart';
import { Product, SortOption } from '../types';
import { toast } from 'sonner';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBand, setSelectedBand] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Не удалось загрузить товары");
      }
    };
    fetchProducts();
  }, []);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const bands = useMemo(() => {
    if (!products) return [];
    const uniqueBands = [...new Set(products.filter(p => p.band).map(p => p.band!))]
      .sort();
    return uniqueBands;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.band && product.band.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedBand) {
      filtered = filtered.filter(product => product.band === selectedBand);
    }

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return sorted;
  }, [searchQuery, selectedCategory, selectedBand, sortBy, products]);

  const handleAddToCart = (product: Product, selectedSize?: string, selectedColor?: string) => {
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} добавлен в корзину`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={getTotalItems()}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        onCategoryClick={handleCategoryClick}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalProducts={filteredProducts.length}
              bands={bands}
              selectedBand={selectedBand}
              onBandChange={setSelectedBand}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl text-muted-foreground mb-4">
                  Товары не найдены
                </h2>
                <p className="text-muted-foreground">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}
