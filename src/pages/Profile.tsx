import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface UserProfile {
  name: string;
  email: string;
  steamId: string;
  bio: string;
  avatar: string;
  joinDate: string;
  totalPurchases: number;
  totalSpent: number;
}

interface Purchase {
  id: number;
  pluginName: string;
  price: number;
  date: string;
  status: "completed" | "pending" | "refunded";
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile>({
    name: "RustPlayer2024",
    email: "player@example.com",
    steamId: "76561198123456789",
    bio: "Опытный игрок Rust с 2020 года. Администратор сервера RustCommunity.",
    avatar: "",
    joinDate: "15 марта 2023",
    totalPurchases: 8,
    totalSpent: 2350,
  });

  const [purchases] = useState<Purchase[]>([
    {
      id: 1,
      pluginName: "Advanced Building System",
      price: 299,
      date: "20 сентября 2024",
      status: "completed",
    },
    {
      id: 2,
      pluginName: "Combat Overhaul",
      price: 499,
      date: "18 сентября 2024",
      status: "completed",
    },
    {
      id: 3,
      pluginName: "Resource Manager Pro",
      price: 199,
      date: "15 сентября 2024",
      status: "completed",
    },
    {
      id: 4,
      pluginName: "Server Analytics",
      price: 399,
      date: "10 сентября 2024",
      status: "pending",
    },
    {
      id: 5,
      pluginName: "Economy System",
      price: 799,
      date: "5 сентября 2024",
      status: "completed",
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  const getStatusBadge = (status: Purchase["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Завершен</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">В обработке</Badge>;
      case "refunded":
        return <Badge variant="destructive">Возврат</Badge>;
    }
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
                <h1 className="text-3xl font-bold text-foreground">
                  RUST ToxicRust STORE
                </h1>
                <p className="text-muted-foreground">Личный кабинет</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                Назад к магазину
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>Участник с {user.joinDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {user.totalPurchases}
                    </div>
                    <div className="text-sm text-muted-foreground">Покупок</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {user.totalSpent.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Потрачено
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Icon
                      name="Mail"
                      className="mr-2 text-muted-foreground"
                      size={16}
                    />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Icon
                      name="Gamepad2"
                      className="mr-2 text-muted-foreground"
                      size={16}
                    />
                    <span className="text-muted-foreground">
                      {user.steamId}
                    </span>
                  </div>
                </div>

                {user.bio && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">О себе</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.bio}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Профиль</TabsTrigger>
                <TabsTrigger value="purchases">Покупки</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Информация о профиле</CardTitle>
                        <CardDescription>
                          Редактируйте свою личную информацию
                        </CardDescription>
                      </div>
                      {!editMode && (
                        <Button onClick={() => setEditMode(true)}>
                          <Icon name="Edit" className="mr-2" size={16} />
                          Редактировать
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя пользователя</Label>
                        <Input
                          id="name"
                          value={editMode ? formData.name : user.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          disabled={!editMode}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editMode ? formData.email : user.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          disabled={!editMode}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="steamId">Steam ID</Label>
                      <Input
                        id="steamId"
                        value={editMode ? formData.steamId : user.steamId}
                        onChange={(e) =>
                          setFormData({ ...formData, steamId: e.target.value })
                        }
                        disabled={!editMode}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={editMode ? formData.bio : user.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        disabled={!editMode}
                        placeholder="Расскажите о себе..."
                      />
                    </div>

                    {editMode && (
                      <div className="flex space-x-4">
                        <Button onClick={handleSave}>
                          <Icon name="Check" className="mr-2" size={16} />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <Icon name="X" className="mr-2" size={16} />
                          Отменить
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases">
                <Card>
                  <CardHeader>
                    <CardTitle>История покупок</CardTitle>
                    <CardDescription>Все ваши покупки плагинов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {purchase.pluginName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Дата покупки: {purchase.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="font-bold text-lg">
                                {purchase.price} ₽
                              </div>
                              {getStatusBadge(purchase.status)}
                            </div>
                            <Button variant="outline" size="sm">
                              <Icon name="Download" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {purchases.length === 0 && (
                        <div className="text-center py-12">
                          <Icon
                            name="ShoppingBag"
                            className="mx-auto text-muted-foreground mb-4"
                            size={48}
                          />
                          <h3 className="text-xl font-semibold mb-2">
                            Покупок пока нет
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Начните покупать плагины для улучшения вашего
                            сервера
                          </p>
                          <Button onClick={() => window.history.back()}>
                            Перейти в каталог
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Уведомления</CardTitle>
                      <CardDescription>
                        Настройте предпочтения уведомлений
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email уведомления</div>
                          <div className="text-sm text-muted-foreground">
                            Получать уведомления о новых плагинах и обновлениях
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Включить
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Скидки и акции</div>
                          <div className="text-sm text-muted-foreground">
                            Получать информацию о скидках и специальных
                            предложениях
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Включить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Безопасность</CardTitle>
                      <CardDescription>
                        Управление безопасностью аккаунта
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Icon name="Key" className="mr-2" size={16} />
                        Изменить пароль
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Icon name="Shield" className="mr-2" size={16} />
                        Двухфакторная аутентификация
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Icon name="Smartphone" className="mr-2" size={16} />
                        Управление устройствами
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">
                        Опасная зона
                      </CardTitle>
                      <CardDescription>
                        Необратимые действия с аккаунтом
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="destructive" className="w-full">
                        <Icon name="Trash2" className="mr-2" size={16} />
                        Удалить аккаунт
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
