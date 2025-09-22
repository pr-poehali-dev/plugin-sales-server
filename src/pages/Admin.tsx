import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface AdminPlugin {
  id: number;
  name: string;
  author: string;
  price: number;
  downloads: number;
  rating: number;
  status: 'active' | 'pending' | 'rejected' | 'suspended';
  category: string;
  dateAdded: string;
  revenue: number;
}

interface AdminOrder {
  id: number;
  customerEmail: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'refunded' | 'cancelled';
  date: string;
  paymentMethod: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  totalSpent: number;
  totalOrders: number;
  status: 'active' | 'banned' | 'suspended';
}

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'plugins' | 'orders' | 'users' | 'analytics'>('dashboard');
  const [newPluginDialog, setNewPluginDialog] = useState(false);

  const [plugins] = useState<AdminPlugin[]>([
    {
      id: 1,
      name: "Advanced Building System",
      author: "BuildMaster",
      price: 299,
      downloads: 15420,
      rating: 4.8,
      status: 'active',
      category: "Строительство",
      dateAdded: "15.09.2024",
      revenue: 4610580
    },
    {
      id: 2,
      name: "Combat Overhaul",
      author: "WarForge",
      price: 499,
      downloads: 8932,
      rating: 4.9,
      status: 'active',
      category: "PvP",
      dateAdded: "10.09.2024",
      revenue: 4457268
    },
    {
      id: 3,
      name: "NewPlugin Beta",
      author: "TestDev",
      price: 199,
      downloads: 0,
      rating: 0,
      status: 'pending',
      category: "Утилиты",
      dateAdded: "22.09.2024",
      revenue: 0
    }
  ]);

  const [orders] = useState<AdminOrder[]>([
    {
      id: 1001,
      customerEmail: "player@example.com",
      customerName: "RustPlayer2024",
      items: ["Advanced Building System", "Combat Overhaul"],
      total: 798,
      status: 'completed',
      date: "21.09.2024",
      paymentMethod: "Банковская карта"
    },
    {
      id: 1002,
      customerEmail: "admin@rustserver.com",
      customerName: "ServerAdmin",
      items: ["Economy System"],
      total: 799,
      status: 'pending',
      date: "22.09.2024",
      paymentMethod: "ЮMoney"
    },
    {
      id: 1003,
      customerEmail: "gamer123@mail.com",
      customerName: "ProGamer",
      items: ["Resource Manager Pro"],
      total: 199,
      status: 'refunded',
      date: "20.09.2024",
      paymentMethod: "QIWI"
    }
  ]);

  const [users] = useState<AdminUser[]>([
    {
      id: 1,
      name: "RustPlayer2024",
      email: "player@example.com",
      joinDate: "15.03.2023",
      totalSpent: 2350,
      totalOrders: 8,
      status: 'active'
    },
    {
      id: 2,
      name: "ServerAdmin",
      email: "admin@rustserver.com",
      joinDate: "10.01.2023",
      totalSpent: 5420,
      totalOrders: 15,
      status: 'active'
    },
    {
      id: 3,
      name: "BadUser",
      email: "spam@fake.com",
      joinDate: "20.09.2024",
      totalSpent: 0,
      totalOrders: 0,
      status: 'banned'
    }
  ]);

  const [newPlugin, setNewPlugin] = useState({
    name: '',
    author: '',
    price: '',
    category: '',
    description: '',
    file: null as File | null
  });

  const getStatusBadge = (status: string, type: 'plugin' | 'order' | 'user') => {
    const configs = {
      plugin: {
        active: { label: 'Активный', variant: 'default' as const },
        pending: { label: 'На модерации', variant: 'secondary' as const },
        rejected: { label: 'Отклонен', variant: 'destructive' as const },
        suspended: { label: 'Приостановлен', variant: 'outline' as const }
      },
      order: {
        pending: { label: 'Обработка', variant: 'secondary' as const },
        completed: { label: 'Завершен', variant: 'default' as const },
        refunded: { label: 'Возврат', variant: 'outline' as const },
        cancelled: { label: 'Отменен', variant: 'destructive' as const }
      },
      user: {
        active: { label: 'Активный', variant: 'default' as const },
        banned: { label: 'Заблокирован', variant: 'destructive' as const },
        suspended: { label: 'Приостановлен', variant: 'outline' as const }
      }
    };

    const config = configs[type][status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handlePluginAction = (pluginId: number, action: 'approve' | 'reject' | 'suspend') => {
    toast({
      title: "Действие выполнено",
      description: `Плагин ${action === 'approve' ? 'одобрен' : action === 'reject' ? 'отклонен' : 'приостановлен'}`,
    });
  };

  const handleOrderAction = (orderId: number, action: 'complete' | 'refund' | 'cancel') => {
    toast({
      title: "Заказ обновлен",
      description: `Статус заказа #${orderId} изменен`,
    });
  };

  const getTotalRevenue = () => {
    return plugins.reduce((sum, plugin) => sum + plugin.revenue, 0);
  };

  const getTotalUsers = () => users.length;
  const getTotalOrders = () => orders.length;
  const getTotalPlugins = () => plugins.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Shield" className="text-primary" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-foreground">ADMIN PANEL</h1>
                <p className="text-muted-foreground">Панель управления магазином плагинов</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                К магазину
              </Button>
              <Button variant="outline">
                <Icon name="LogOut" className="mr-2" size={20} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Панель</TabsTrigger>
            <TabsTrigger value="plugins">Плагины</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Общий доход</p>
                      <p className="text-2xl font-bold text-primary">{getTotalRevenue().toLocaleString()} ₽</p>
                    </div>
                    <Icon name="DollarSign" className="text-primary" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Всего плагинов</p>
                      <p className="text-2xl font-bold">{getTotalPlugins()}</p>
                    </div>
                    <Icon name="Package" className="text-green-600" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Заказы</p>
                      <p className="text-2xl font-bold">{getTotalOrders()}</p>
                    </div>
                    <Icon name="ShoppingBag" className="text-blue-600" size={32} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Пользователи</p>
                      <p className="text-2xl font-bold">{getTotalUsers()}</p>
                    </div>
                    <Icon name="Users" className="text-purple-600" size={32} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{order.total} ₽</p>
                          {getStatusBadge(order.status, 'order')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Плагины на модерации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plugins.filter(p => p.status === 'pending').map((plugin) => (
                      <div key={plugin.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold">{plugin.name}</p>
                          <p className="text-sm text-muted-foreground">by {plugin.author}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handlePluginAction(plugin.id, 'approve')}>
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handlePluginAction(plugin.id, 'reject')}>
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plugins Tab */}
          <TabsContent value="plugins">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Управление плагинами</h2>
              <Dialog open={newPluginDialog} onOpenChange={setNewPluginDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить плагин
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить новый плагин</DialogTitle>
                    <DialogDescription>Заполните информацию о новом плагине</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Название</Label>
                        <Input
                          placeholder="Название плагина"
                          value={newPlugin.name}
                          onChange={(e) => setNewPlugin({...newPlugin, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Автор</Label>
                        <Input
                          placeholder="Автор плагина"
                          value={newPlugin.author}
                          onChange={(e) => setNewPlugin({...newPlugin, author: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Цена</Label>
                        <Input
                          type="number"
                          placeholder="999"
                          value={newPlugin.price}
                          onChange={(e) => setNewPlugin({...newPlugin, price: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Категория</Label>
                        <Select value={newPlugin.category} onValueChange={(value) => setNewPlugin({...newPlugin, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="building">Строительство</SelectItem>
                            <SelectItem value="pvp">PvP</SelectItem>
                            <SelectItem value="utils">Утилиты</SelectItem>
                            <SelectItem value="admin">Администрирование</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Описание</Label>
                      <Textarea
                        placeholder="Описание плагина..."
                        value={newPlugin.description}
                        onChange={(e) => setNewPlugin({...newPlugin, description: e.target.value})}
                      />
                    </div>
                    <Button className="w-full">Добавить плагин</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Скачивания</TableHead>
                      <TableHead>Рейтинг</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plugins.map((plugin) => (
                      <TableRow key={plugin.id}>
                        <TableCell className="font-semibold">{plugin.name}</TableCell>
                        <TableCell>{plugin.author}</TableCell>
                        <TableCell>{plugin.category}</TableCell>
                        <TableCell>{plugin.price} ₽</TableCell>
                        <TableCell>{plugin.downloads.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Icon name="Star" className="text-yellow-500 mr-1" size={16} />
                            {plugin.rating}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(plugin.status, 'plugin')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Pause" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Управление заказами</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Покупатель</TableHead>
                      <TableHead>Товары</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Способ оплаты</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-48">
                            {order.items.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">{order.total} ₽</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{getStatusBadge(order.status, 'order')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {order.status === 'pending' && (
                              <Button size="sm" onClick={() => handleOrderAction(order.id, 'complete')}>
                                <Icon name="Check" size={16} />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Управление пользователями</h2>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Потрачено</TableHead>
                      <TableHead>Заказов</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell className="font-bold">{user.totalSpent.toLocaleString()} ₽</TableCell>
                        <TableCell>{user.totalOrders}</TableCell>
                        <TableCell>{getStatusBadge(user.status, 'user')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Mail" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Топ плагинов по доходу</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plugins
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 5)
                      .map((plugin, index) => (
                        <div key={plugin.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{plugin.name}</p>
                              <p className="text-sm text-muted-foreground">{plugin.downloads} скачиваний</p>
                            </div>
                          </div>
                          <p className="font-bold text-primary">{plugin.revenue.toLocaleString()} ₽</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика по категориям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Строительство', 'PvP', 'Утилиты', 'Администрирование'].map((category) => {
                      const categoryPlugins = plugins.filter(p => p.category === category);
                      const totalDownloads = categoryPlugins.reduce((sum, p) => sum + p.downloads, 0);
                      
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{category}</p>
                            <p className="text-sm text-muted-foreground">{categoryPlugins.length} плагинов</p>
                          </div>
                          <p className="font-bold">{totalDownloads.toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;