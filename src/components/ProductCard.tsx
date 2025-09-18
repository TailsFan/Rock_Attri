import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Product } from '../types';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize?: string, selectedColor?: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize || undefined, selectedColor || undefined);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden flex flex-col">
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2"
          >
            Нет в наличии
          </Badge>
        )}
        {product.band && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2"
          >
            {product.band}
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 hover:bg-card"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-4 flex-grow">
        <h3 className="mb-2 line-clamp-2 hover:text-primary transition-colors h-12">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="space-y-2">
          {product.sizes && product.sizes.length > 0 && (
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите размер" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {product.colors && product.colors.length > 0 && (
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите цвет" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-2xl text-primary">
            {formatPrice(product.price)}
          </span>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
