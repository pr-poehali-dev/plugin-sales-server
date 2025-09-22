import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Plugin {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  compatibility: string;
  author: string;
  image: string;
}

const mockPlugins: Plugin[] = [
  {
    id: 1,
    name: "Advanced Building System",
    description: "Расширенная система строительства с новыми материалами и инструментами",
    price: 299,
    rating: 4.8,
    downloads: 15420,
    category: "Строительство",
    compatibility: "Rust 2023+",
    author: "BuildMaster",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  },
  {
    id: 2,
    name: "Combat Overhaul",
    description: "Полная переработка боевой системы с новым оружием и механиками",
    price: 499,
    rating: 4.9,
    downloads: 8932,
    category: "PvP",
    compatibility: "Rust 2024+",
    author: "WarForge",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  },
  {
    id: 3,
    name: "Resource Manager Pro",
    description: "Продвинутое управление ресурсами и автоматизация добычи",
    price: 199,
    rating: 4.7,
    downloads: 23156,
    category: "Утилиты",
    compatibility: "Rust 2022+",
    author: "DevTools",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  },
  {
    id: 4,
    name: "Server Analytics",
    description: "Детальная аналитика сервера с графиками и отчетами",
    price: 399,
    rating: 4.6,
    downloads: 5847,
    category: "Администрирование",
    compatibility: "Rust 2023+",
    author: "AdminPro",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  },
  {
    id: 5,
    name: "Vehicle Expansion",
    description: "Новые транспортные средства: танки, самолеты, корабли",
    price: 599,
    rating: 4.9,
    downloads: 12743,
    category: "Транспорт",
    compatibility: "Rust 2024+",
    author: "VehicleMods",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  },
  {
    id: 6,
    name: "Economy System",
    description: "Комплексная экономическая система с банками и торговлей",
    price: 799,
    rating: 4.8,
    downloads: 9654,
    category: "Экономика",
    compatibility: "Rust 2023+",
    author: "EconSoft",
    image: "/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"
  }
];

const Index = () => {
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
  const [cart, setCart] = useState<Plugin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>('all');
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ['all', 'Строительство', 'PvP', 'Утилиты', 'Администрирование', 'Транспорт', 'Экономика'];
  const compatibilities = ['all', 'Rust 2022+', 'Rust 2023+', 'Rust 2024+'];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
    const matchesCompatibility = selectedCompatibility === 'all' || plugin.compatibility === selectedCompatibility;
    
    return matchesSearch && matchesCategory && matchesCompatibility;
  });

  const addToCart = (plugin: Plugin) => {
    if (!cart.find(item => item.id === plugin.id)) {
      setCart([...cart, plugin]);
      // Уведомление о добавлении в корзину
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification('Плагин добавлен в корзину', {
            body: `${plugin.name} - ${plugin.price} ₽`,
            icon: '/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg'
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission();
        }
      }
    }
  };

  const removeFromCart = (pluginId: number) => {
    setCart(cart.filter(item => item.id !== pluginId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Settings" className="text-primary" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-foreground">RUST PLUGINS STORE</h1>
                <p className="text-muted-foreground">Магазин плагинов для серверов Rust</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = '/profile'}>
                <Icon name="User" className="mr-2" size={20} />
                Профиль
              </Button>
              <Button
                variant="outline"
                onClick={() => setCartOpen(!cartOpen)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={20} />
                <span className="ml-2">Корзина</span>
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Filter" className="mr-2" size={20} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <Input
                    placeholder="Поиск плагинов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'Все категории' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Совместимость</label>
                  <Select value={selectedCompatibility} onValueChange={setSelectedCompatibility}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {compatibilities.map(compatibility => (
                        <SelectItem key={compatibility} value={compatibility}>
                          {compatibility === 'all' ? 'Все версии' : compatibility}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Cart Sidebar */}
            {cartOpen && (
              <Card className="mb-6 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Icon name="ShoppingCart" className="mr-2" size={20} />
                      Корзина ({cart.length})
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setCartOpen(false)}>
                      <Icon name="X" size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">Корзина пуста</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Итого:</span>
                        <span className="text-primary">{getTotalPrice()} ₽</span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => window.location.href = '/checkout'}
                      >
                        <Icon name="CreditCard" className="mr-2" size={20} />
                        Оформить заказ
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Plugin Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlugins.map(plugin => (
                <Card key={plugin.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={plugin.image} 
                      alt={plugin.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <CardDescription className="text-sm">by {plugin.author}</CardDescription>
                      </div>
                      <Badge variant="secondary">{plugin.category}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Icon name="Star" className="text-yellow-500 fill-current mr-1" size={16} />
                        <span>{plugin.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Download" className="mr-1" size={16} />
                        <span>{plugin.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Icon name="Check" className="mr-1 text-green-500" size={16} />
                      <span>{plugin.compatibility}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">{plugin.price} ₽</div>
                    <Button 
                      onClick={() => addToCart(plugin)}
                      disabled={cart.some(item => item.id === plugin.id)}
                      className="min-w-[120px]"
                    >
                      {cart.some(item => item.id === plugin.id) ? (
                        <>
                          <Icon name="Check" className="mr-2" size={16} />
                          В корзине
                        </>
                      ) : (
                        <>
                          <Icon name="Plus" className="mr-2" size={16} />
                          Купить
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPlugins.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="Search" className="mx-auto text-muted-foreground mb-4" size={48} />
                  <h3 className="text-xl font-semibold mb-2">Плагины не найдены</h3>
                  <p className="text-muted-foreground">
                    Попробуйте изменить фильтры или поисковый запрос
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Магазин</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новинки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Популярное</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Поддержка</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/support" className="hover:text-primary transition-colors">Техподдержка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Разработчикам</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">SDK</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Публикация</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Аккаунт</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Войти</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Регистрация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Профиль</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Rust Plugins Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;