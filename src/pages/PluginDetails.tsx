import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface Plugin {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  totalReviews: number;
  downloads: number;
  category: string;
  compatibility: string;
  author: string;
  authorAvatar: string;
  images: string[];
  features: string[];
  changelog: string[];
  tags: string[];
  fileSize: string;
  lastUpdate: string;
  version: string;
}

const PluginDetails = () => {
  const { toast } = useToast();
  
  const [plugin] = useState<Plugin>({
    id: 1,
    name: "Advanced Building System",
    description: "Расширенная система строительства с новыми материалами и инструментами",
    longDescription: "Advanced Building System - это комплексный плагин для серверов Rust, который кардинально расширяет возможности строительства. Плагин добавляет более 50 новых строительных блоков, инструментов и материалов, позволяя игрокам создавать уникальные и сложные постройки.\n\nОсновные возможности:\n- Новые строительные материалы: металл, дерево премиум-класса, стекло\n- Расширенные инструменты строительства с улучшенной функциональностью\n- Система планирования построек с 3D предпросмотром\n- Автоматическое размещение блоков и копирование структур\n- Совместимость с популярными экономическими плагинами",
    price: 299,
    rating: 4.8,
    totalReviews: 247,
    downloads: 15420,
    category: "Строительство",
    compatibility: "Rust 2023+",
    author: "BuildMaster",
    authorAvatar: "",
    images: ["/img/399710fb-b989-42a4-8869-f41e6eb43bbe.jpg"],
    features: [
      "50+ новых строительных блоков",
      "Улучшенные инструменты строительства", 
      "3D предпросмотр построек",
      "Автоматическое размещение блоков",
      "Система копирования структур",
      "Интеграция с экономикой",
      "Поддержка команд"
    ],
    changelog: [
      "v2.1.0 - Добавлены новые материалы и исправлены баги",
      "v2.0.5 - Улучшена совместимость с последним обновлением Rust",
      "v2.0.0 - Полная переработка системы строительства"
    ],
    tags: ["building", "construction", "tools", "materials"],
    fileSize: "2.3 MB",
    lastUpdate: "15.09.2024",
    version: "2.1.0"
  });

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "RustBuilder2023",
      rating: 5,
      comment: "Отличный плагин! Значительно расширяет возможности строительства. Особенно нравится функция 3D предпросмотра. Разработчик активно поддерживает и обновляет плагин.",
      date: "20.09.2024",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userName: "ServerAdmin",
      rating: 5,
      comment: "Использую на своем сервере уже полгода. Игроки в восторге от новых возможностей строительства. Никаких проблем с производительностью.",
      date: "18.09.2024", 
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "ProGamer",
      rating: 4,
      comment: "Хороший плагин, но есть небольшие баги с копированием больших структур. В целом рекомендую.",
      date: "16.09.2024",
      helpful: 5,
      verified: false
    },
    {
      id: 4,
      userName: "NewPlayer",
      rating: 5,
      comment: "Лучший плагин для строительства! Даже новичок может создавать красивые постройки.",
      date: "14.09.2024",
      helpful: 3,
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const [inCart, setInCart] = useState(false);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    
    return Object.entries(distribution)
      .reverse()
      .map(([rating, count]) => ({
        rating: parseInt(rating),
        count,
        percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
      }));
  };

  const handleAddToCart = () => {
    setInCart(true);
    toast({
      title: "Плагин добавлен в корзину!",
      description: `${plugin.name} - ${plugin.price} ₽`,
    });
  };

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, напишите отзыв",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Отзыв отправлен!",
      description: "Спасибо за ваш отзыв. Он появится после модерации.",
    });

    setNewReview({ rating: 5, comment: '' });
  };

  const renderStars = (rating: number, size = 16) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={`${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
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
                <p className="text-muted-foreground">Детали плагина</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" className="mr-2" size={20} />
                Назад к каталогу
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plugin Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{plugin.name}</h1>
                    <p className="text-muted-foreground mb-4">{plugin.description}</p>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-2">
                        {renderStars(Math.floor(plugin.rating))}
                        <span className="font-semibold">{plugin.rating}</span>
                        <span className="text-muted-foreground">({plugin.totalReviews} отзывов)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Icon name="Download" size={16} />
                        <span className="text-muted-foreground">{plugin.downloads.toLocaleString()} скачиваний</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{plugin.category}</Badge>
                      <Badge variant="outline">{plugin.compatibility}</Badge>
                      <span className="text-sm text-muted-foreground">v{plugin.version}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-4">{plugin.price} ₽</div>
                    <Button 
                      size="lg" 
                      className="w-full min-w-[150px]"
                      onClick={handleAddToCart}
                      disabled={inCart}
                    >
                      {inCart ? (
                        <>
                          <Icon name="Check" className="mr-2" size={20} />
                          В корзине
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCart" className="mr-2" size={20} />
                          В корзину
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Plugin Image */}
                <div className="mb-6">
                  <img 
                    src={plugin.images[0]} 
                    alt={plugin.name}
                    className="w-full h-64 object-cover rounded-lg bg-muted"
                  />
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {plugin.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">Разработчик: {plugin.author}</p>
                    <p className="text-sm text-muted-foreground">Последнее обновление: {plugin.lastUpdate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Связаться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Описание</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {plugin.longDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Возможности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plugin.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0" size={16} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Отзывы ({plugin.totalReviews})</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Rating Distribution */}
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{plugin.rating}</div>
                      {renderStars(Math.floor(plugin.rating), 20)}
                      <p className="text-muted-foreground mt-2">Основано на {plugin.totalReviews} отзывах</p>
                    </div>
                    
                    <div className="space-y-2">
                      {getRatingDistribution().map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 w-12">
                            <span className="text-sm">{rating}</span>
                            <Icon name="Star" className="text-yellow-500 fill-current" size={12} />
                          </div>
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-8">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Write Review */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Оставить отзыв</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">Оценка:</span>
                      <Select 
                        value={newReview.rating.toString()} 
                        onValueChange={(value) => setNewReview({...newReview, rating: parseInt(value)})}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              <div className="flex items-center space-x-2">
                                <span>{rating}</span>
                                <Icon name="Star" className="text-yellow-500 fill-current" size={14} />
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Textarea
                      placeholder="Поделитесь своим опытом использования плагина..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      rows={4}
                    />
                    
                    <Button onClick={handleSubmitReview}>
                      <Icon name="Send" className="mr-2" size={16} />
                      Отправить отзыв
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-muted">
                              {review.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{review.userName}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Icon name="CheckCircle" className="mr-1" size={12} />
                                  Проверен
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {renderStars(review.rating, 14)}
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <Button variant="ghost" size="sm">
                          <Icon name="ThumbsUp" className="mr-1" size={14} />
                          Полезно ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Flag" className="mr-1" size={14} />
                          Пожаловаться
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plugin Details */}
            <Card>
              <CardHeader>
                <CardTitle>Информация о плагине</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Размер файла:</span>
                  <span className="font-medium">{plugin.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Версия:</span>
                  <span className="font-medium">{plugin.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Совместимость:</span>
                  <span className="font-medium">{plugin.compatibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Обновлен:</span>
                  <span className="font-medium">{plugin.lastUpdate}</span>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-2">Теги:</p>
                  <div className="flex flex-wrap gap-2">
                    {plugin.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changelog */}
            <Card>
              <CardHeader>
                <CardTitle>История изменений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {plugin.changelog.map((change, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{change.split(' - ')[0]}</p>
                      <p className="text-muted-foreground">{change.split(' - ')[1]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Поддержка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="MessageCircle" className="mr-2" size={16} />
                  Связаться с автором
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="FileText" className="mr-2" size={16} />
                  Документация
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="HelpCircle" className="mr-2" size={16} />
                  FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginDetails;