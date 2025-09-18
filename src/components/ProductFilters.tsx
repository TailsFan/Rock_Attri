'use client';
import { Filter, SortAsc } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { SortOption } from '../types';
import { categories } from '../data/categories';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalProducts: number;
  bands: string[];
  selectedBand: string;
  onBandChange: (band: string) => void;
}

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalProducts,
  bands,
  selectedBand,
  onBandChange
}: ProductFiltersProps) {
  const sortOptions = [
    { value: 'name' as SortOption, label: 'По названию' },
    { value: 'price-low' as SortOption, label: 'Сначала дешевые' },
    { value: 'price-high' as SortOption, label: 'Сначала дорогие' },
    { value: 'newest' as SortOption, label: 'Новинки' }
  ];

  const clearFilters = () => {
    onCategoryChange('');
    onBandChange('');
  };

  const activeFiltersCount = (selectedCategory ? 1 : 0) + (selectedBand ? 1 : 0);

  const filterContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {/* Категории */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Категории
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === '' ? 'secondary' : 'ghost'}
            size="sm"
            className="w-full justify-start"
            onClick={() => onCategoryChange('')}
          >
            Все товары
          </Button>
          <Separator />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.slug ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => onCategoryChange(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Группы */}
      {bands.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Группы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={selectedBand === '' ? 'secondary' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => onBandChange('')}
            >
              Все группы
            </Button>
            <Separator />
            {bands.slice(0, 10).map((band) => (
              <Button
                key={band}
                variant={selectedBand === band ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => onBandChange(band)}
              >
                {band}
              </Button>
            ))}
            {bands.length > 10 && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                И еще {bands.length - 10} групп...
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Верхняя панель с сортировкой и результатами */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm">
            Найдено: {totalProducts}
          </span>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-destructive hover:text-destructive h-auto p-1 text-sm"
            >
              Сбросить ({activeFiltersCount})
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Активные фильтры */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => onCategoryChange('')}
            >
              {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <span className="ml-1">×</span>
            </Badge>
          )}
          {selectedBand && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => onBandChange('')}
            >
              {selectedBand}
              <span className="ml-1">×</span>
            </Badge>
          )}
        </div>
      )}

      {/* Боковые фильтры - скрыты на мобильных, видимы на десктопе */}
      <div className="hidden lg:block">
        {filterContent}
      </div>

      {/* Аккордеон с фильтрами для мобильных */}
      <div className="lg:hidden">
         <Accordion type="single" collapsible>
            <AccordionItem value="filters">
                <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4" />
                        <span>Фильтры {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {filterContent}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
