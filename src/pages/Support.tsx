import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  id: number;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  date: string;
  lastUpdate: string;
}

const Support = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "tickets">(
    "faq",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "medium",
    message: "",
    plugin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Как установить плагин на сервер?",
      answer:
        "1. Скачайте плагин из личного кабинета\n2. Поместите файл .cs в папку /oxide/plugins/\n3. Перезагрузите плагин командой oxide.reload ИмяПлагина\n4. Настройте конфигурацию в /oxide/config/",
      category: "Установка",
    },
    {
      id: 2,
      question: "Плагин не работает после обновления сервера",
      answer:
        "Обновления сервера могут ломать совместимость плагинов. Проверьте:\n1. Совместимость версии плагина с вашей версией сервера\n2. Обновите плагин до последней версии\n3. Проверьте логи сервера на ошибки\n4. Обратитесь к автору плагина за обновлением",
      category: "Устранение проблем",
    },
    {
      id: 3,
      question: "Можно ли вернуть деньги за плагин?",
      answer:
        "Возврат средств возможен в течение 7 дней с момента покупки при условии:\n1. Плагин не работает на вашей версии сервера\n2. Функционал не соответствует описанию\n3. Плагин содержит критические ошибки\nОбратитесь в техподдержку с подробным описанием проблемы.",
      category: "Платежи",
    },
    {
      id: 4,
      question: "Как получить техническую поддержку по плагину?",
      answer:
        "Техподдержка предоставляется несколькими способами:\n1. Через форму на этой странице\n2. В Discord сервере разработчика\n3. Через личные сообщения автору плагина\n4. В комментариях к плагину на странице магазина",
      category: "Поддержка",
    },
    {
      id: 5,
      question: "Как обновить плагин до новой версии?",
      answer:
        "Обновление плагина:\n1. Скачайте новую версию из личного кабинета\n2. Остановите сервер или выгрузите старую версию\n3. Замените файл плагина на новый\n4. Перезагрузите плагин\n5. Проверьте конфигурацию на новые параметры",
      category: "Обновления",
    },
    {
      id: 6,
      question: "Плагин конфликтует с другими плагинами",
      answer:
        "Для решения конфликтов:\n1. Проверьте совместимость плагинов\n2. Обновите все плагины до последних версий\n3. Проверьте порядок загрузки плагинов\n4. Отключите конфликтующие плагины по очереди\n5. Обратитесь к авторам плагинов за помощью",
      category: "Устранение проблем",
    },
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 1001,
      subject: "Проблема с плагином Economy System",
      status: "in-progress",
      priority: "high",
      date: "20.09.2024",
      lastUpdate: "21.09.2024",
    },
    {
      id: 1002,
      subject: "Запрос на возврат средств",
      status: "resolved",
      priority: "medium",
      date: "18.09.2024",
      lastUpdate: "19.09.2024",
    },
    {
      id: 1003,
      subject: "Вопрос по установке Advanced Building System",
      status: "closed",
      priority: "low",
      date: "15.09.2024",
      lastUpdate: "16.09.2024",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Симуляция отправки
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Обращение отправлено!",
      description: "Мы свяжемся с вами в течение 24 часов.",
    });

    // Очистка формы
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      priority: "medium",
      message: "",
      plugin: "",
    });

    setIsSubmitting(false);
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    const statusConfig = {
      open: { label: "Открыт", variant: "default" as const },
      "in-progress": { label: "В работе", variant: "secondary" as const },
      resolved: { label: "Решен", variant: "default" as const },
      closed: { label: "Закрыт", variant: "outline" as const },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    const priorityConfig = {
      low: { label: "Низкий", color: "text-green-600" },
      medium: { label: "Средний", color: "text-yellow-600" },
      high: { label: "Высокий", color: "text-orange-600" },
      urgent: { label: "Срочный", color: "text-red-600" },
    };

    const config = priorityConfig[priority];
    return (
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const groupedFAQ = faqItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, FAQItem[]>,
  );

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
                <p className="text-muted-foreground">Техническая поддержка</p>
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveTab("faq")}
          >
            <CardContent className="flex items-center p-6">
              <Icon name="HelpCircle" className="text-primary mr-4" size={32} />
              <div>
                <h3 className="font-semibold">FAQ</h3>
                <p className="text-sm text-muted-foreground">Частые вопросы</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveTab("contact")}
          >
            <CardContent className="flex items-center p-6">
              <Icon
                name="MessageSquare"
                className="text-primary mr-4"
                size={32}
              />
              <div>
                <h3 className="font-semibold">Связаться с нами</h3>
                <p className="text-sm text-muted-foreground">Новое обращение</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveTab("tickets")}
          >
            <CardContent className="flex items-center p-6">
              <Icon name="Ticket" className="text-primary mr-4" size={32} />
              <div>
                <h3 className="font-semibold">Мои обращения</h3>
                <p className="text-sm text-muted-foreground">
                  История поддержки
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          {[
            { id: "faq", label: "FAQ", icon: "HelpCircle" },
            {
              id: "contact",
              label: "Обратиться в поддержку",
              icon: "MessageSquare",
            },
            { id: "tickets", label: "Мои обращения", icon: "Ticket" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex items-center"
            >
              <Icon name={tab.icon as any} className="mr-2" size={16} />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
                <CardDescription>
                  Ответы на популярные вопросы по использованию плагинов
                </CardDescription>
              </CardHeader>
            </Card>

            {Object.entries(groupedFAQ).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item) => (
                      <AccordionItem key={item.id} value={`item-${item.id}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="whitespace-pre-line text-muted-foreground">
                            {item.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle>Обратиться в техподдержку</CardTitle>
              <CardDescription>
                Опишите вашу проблему, и мы поможем её решить
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Тема обращения *</Label>
                  <Input
                    id="subject"
                    placeholder="Кратко опишите проблему"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Установка</SelectItem>
                        <SelectItem value="bugs">Ошибки</SelectItem>
                        <SelectItem value="refund">Возврат средств</SelectItem>
                        <SelectItem value="compatibility">
                          Совместимость
                        </SelectItem>
                        <SelectItem value="configuration">Настройка</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Приоритет</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="urgent">Срочный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plugin">Плагин</Label>
                    <Select
                      value={formData.plugin}
                      onValueChange={(value) =>
                        setFormData({ ...formData, plugin: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите плагин" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="building">
                          Advanced Building System
                        </SelectItem>
                        <SelectItem value="combat">Combat Overhaul</SelectItem>
                        <SelectItem value="resource">
                          Resource Manager Pro
                        </SelectItem>
                        <SelectItem value="analytics">
                          Server Analytics
                        </SelectItem>
                        <SelectItem value="vehicle">
                          Vehicle Expansion
                        </SelectItem>
                        <SelectItem value="economy">Economy System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Подробное описание *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Опишите проблему максимально подробно. Укажите версию сервера, сообщения об ошибках, шаги для воспроизведения..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon
                        name="Loader2"
                        className="mr-2 animate-spin"
                        size={16}
                      />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2" size={16} />
                      Отправить обращение
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Мои обращения</CardTitle>
                <CardDescription>
                  История ваших обращений в техподдержку
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <Card key={ticket.id} className="border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">#{ticket.id}</span>
                            {getStatusBadge(ticket.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {ticket.date}
                          </div>
                        </div>

                        <h4 className="font-semibold mb-2">{ticket.subject}</h4>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="text-muted-foreground">
                              Приоритет:
                            </span>
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <span className="text-muted-foreground">
                            Обновлено: {ticket.lastUpdate}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {supportTickets.length === 0 && (
                    <div className="text-center py-12">
                      <Icon
                        name="Ticket"
                        className="mx-auto text-muted-foreground mb-4"
                        size={48}
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        Обращений пока нет
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Если у вас возникнут вопросы, создайте новое обращение
                      </p>
                      <Button onClick={() => setActiveTab("contact")}>
                        Создать обращение
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
