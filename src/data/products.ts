import { Product } from '../types';

export const products: Product[] = [
  // Футболки
  {
    id: '1',
    name: 'Metallica - Master of Puppets',
    price: 1299,
    image: 'https://picsum.photos/seed/1/400/400',
    category: 'tshirts',
    band: 'Metallica',
    description: 'Классическая футболка с обложкой альбома Master of Puppets',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Черный', 'Серый']
  },
  {
    id: '2',
    name: 'Iron Maiden - Powerslave',
    price: 1199,
    image: 'https://picsum.photos/seed/2/400/400',
    category: 'tshirts',
    band: 'Iron Maiden',
    description: 'Винтажная футболка с египетской тематикой альбома Powerslave',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный']
  },
  {
    id: '3',
    name: 'Slayer - Reign in Blood',
    price: 1399,
    image: 'https://picsum.photos/seed/3/400/400',
    category: 'tshirts',
    band: 'Slayer',
    description: 'Экстремальная футболка с дизайном альбома Reign in Blood',
    inStock: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Черный', 'Красный']
  },
  {
    id: '4',
    name: 'Black Sabbath - Paranoid',
    price: 1149,
    image: 'https://picsum.photos/seed/4/400/400',
    category: 'tshirts',
    band: 'Black Sabbath',
    description: 'Легендарная футболка пионеров хэви-метала',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Фиолетовый']
  },

  // Аксессуары
  {
    id: '5',
    name: 'Готический браслет с шипами',
    price: 899,
    image: 'https://picsum.photos/seed/5/400/400',
    category: 'accessories',
    description: 'Кожаный браслет с металлическими шипами',
    inStock: true,
    colors: ['Черный', 'Коричневый']
  },
  {
    id: '6',
    name: 'Чокер с подвеской-черепом',
    price: 799,
    image: 'https://picsum.photos/seed/6/400/400',
    category: 'accessories',
    description: 'Бархатный чокер с серебряной подвеской в виде черепа',
    inStock: true,
    colors: ['Черный', 'Красный', 'Фиолетовый']
  },
  {
    id: '7',
    name: 'Панк ремень с заклепками',
    price: 1099,
    image: 'https://picsum.photos/seed/7/400/400',
    category: 'accessories',
    description: 'Кожаный ремень с металлическими заклепками и пряжкой',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный']
  },

  // Винил
  {
    id: '8',
    name: 'The Dark Side of the Moon - Pink Floyd',
    price: 2499,
    image: 'https://picsum.photos/seed/8/400/400',
    category: 'vinyl',
    band: 'Pink Floyd',
    description: 'Классический альбом на виниле. Переиздание 2023 года',
    inStock: true
  },
  {
    id: '9',
    name: 'Master of Reality - Black Sabbath',
    price: 2199,
    image: 'https://picsum.photos/seed/9/400/400',
    category: 'vinyl',
    band: 'Black Sabbath',
    description: 'Оригинальное издание 1971 года на виниле',
    inStock: false
  },

  // Одежда
  {
    id: '10',
    name: 'Готическая кожаная куртка',
    price: 8999,
    image: 'https://picsum.photos/seed/10/400/400',
    category: 'clothing',
    description: 'Настоящая кожаная куртка в готическом стиле с металлической фурнитурой',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный']
  },

  // Обувь
  {
    id: '11',
    name: 'Готические ботинки с пряжками',
    price: 4599,
    image: 'https://picsum.photos/seed/11/400/400',
    category: 'shoes',
    description: 'Высокие готические ботинки из натуральной кожи',
    inStock: true,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    colors: ['Черный']
  },

  // Кружки
  {
    id: '12',
    name: 'Готическая кружка с черепом',
    price: 699,
    image: 'https://picsum.photos/seed/12/400/400',
    category: 'mugs',
    description: 'Керамическая кружка с готическим дизайном',
    inStock: true,
    colors: ['Черный', 'Серый']
  },

  // Постеры
  {
    id: '13',
    name: 'Vintage Rock Poster',
    price: 599,
    image: 'https://picsum.photos/seed/13/400/400',
    category: 'posters',
    description: 'Винтажный постер в стиле рок концертов 70-х',
    inStock: true
  },

  // Статуэтки
  {
    id: '14',
    name: 'Металлическая статуэтка черепа',
    price: 1599,
    image: 'https://picsum.photos/seed/14/400/400',
    category: 'figurines',
    description: 'Коллекционная статуэтка из металла',
    inStock: true,
    colors: ['Серебро', 'Бронза']
  },

  // Дополнительные товары
  {
    id: '15',
    name: 'Nirvana - Nevermind',
    price: 1299,
    image: 'https://picsum.photos/seed/15/400/400',
    category: 'tshirts',
    band: 'Nirvana',
    description: 'Культовая футболка с обложкой альбома Nevermind',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Синий']
  },
  {
    id: '16',
    name: 'AC/DC - Highway to Hell',
    price: 1199,
    image: 'https://picsum.photos/seed/16/400/400',
    category: 'tshirts',
    band: 'AC/DC',
    description: 'Классическая футболка австралийских рокеров',
    inStock: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Черный']
  },
  {
    id: '17',
    name: 'Led Zeppelin - IV',
    price: 2299,
    image: 'https://picsum.photos/seed/17/400/400',
    category: 'vinyl',
    band: 'Led Zeppelin',
    description: 'Легендарный четвертый альбом на виниле',
    inStock: true
  },
  {
    id: '18',
    name: 'Панк браслет с шипами',
    price: 659,
    image: 'https://picsum.photos/seed/18/400/400',
    category: 'accessories',
    description: 'Кожаный браслет в панк стиле',
    inStock: true,
    colors: ['Черный']
  },
  {
    id: '19',
    name: 'The Wall - Pink Floyd',
    price: 2699,
    image: 'https://picsum.photos/seed/19/400/400',
    category: 'vinyl',
    band: 'Pink Floyd',
    description: 'Двойной альбом The Wall на виниле',
    inStock: true
  },
  {
    id: '20',
    name: 'Готическое колье с крестом',
    price: 1299,
    image: 'https://picsum.photos/seed/20/400/400',
    category: 'accessories',
    description: 'Серебряное колье с готическим крестом',
    inStock: true,
    colors: ['Серебро', 'Черный']
  }
];
