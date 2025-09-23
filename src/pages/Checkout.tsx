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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface CartItem {
  id: number;
  name: string;
  price: number;
  author: string;
}

const Checkout = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Advanced Building System",
      price: 299,
      author: "BuildMaster",
    },
    {
      id: 2,
      name: "Combat Overhaul",
      price: 499,
      author: "WarForge",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "RU",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Симуляция обработки платежа
    await new Promise((resolve) => setTimeout(resolve, 3000));

    alert("Заказ успешно оформлен! Плагины отправлены на вашу почту.");
    setIsProcessing(false);
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
                  RUST ToxicRust
                </h1>
                <p className="text-muted-foreground">Оформление заказа</p>
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
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="ShoppingCart" className="mr-2" size={20} />
                  Ваш заказ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          by {item.author}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{item.price} ₽</span>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Подытог:</span>
                      <span>{getTotalPrice()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>НДС (20%):</span>
                      <span>{Math.round(getTotalPrice() * 0.2)} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span className="text-primary">
                        {Math.round(getTotalPrice() * 1.2)} ₽
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <Icon name="Shield" className="text-green-600" size={16} />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Безопасная оплата SSL
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                  <CardDescription>
                    Куда отправить купленные плагины
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email адрес *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      На этот адрес будут отправлены ссылки для скачивания
                      плагинов
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        placeholder="Иван"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        placeholder="Иванов"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Способ оплаты</CardTitle>
                  <CardDescription>
                    Выберите удобный способ оплаты
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex-1">
                        <Label
                          htmlFor="card"
                          className="flex items-center cursor-pointer"
                        >
                          <Icon name="CreditCard" className="mr-2" size={20} />
                          <span>Банковская карта</span>
                          <div className="ml-auto flex space-x-2">
                            <Badge variant="outline">Visa</Badge>
                            <Badge variant="outline">MasterCard</Badge>
                            <Badge variant="outline">МИР</Badge>
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="yandex" id="yandex" />
                      <Label
                        htmlFor="yandex"
                        className="flex items-center cursor-pointer"
                      >
                        <Icon name="Wallet" className="mr-2" size={20} />
                        <span>ЮMoney</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="qiwi" id="qiwi" />
                      <Label
                        htmlFor="qiwi"
                        className="flex items-center cursor-pointer"
                      >
                        <Icon name="Smartphone" className="mr-2" size={20} />
                        <span>QIWI Кошелек</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details */}
              {paymentMethod === "card" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Данные карты</CardTitle>
                    <CardDescription>
                      Введите данные вашей банковской карты
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Номер карты *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Срок действия *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange("cvv", e.target.value)
                          }
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Адрес плательщика</CardTitle>
                  <CardDescription>
                    Необходимо для выставления чека
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Адрес *</Label>
                    <Input
                      id="billingAddress"
                      placeholder="ул. Пушкина, д. 1, кв. 1"
                      value={formData.billingAddress}
                      onChange={(e) =>
                        handleInputChange("billingAddress", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        placeholder="Москва"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Почтовый индекс *</Label>
                      <Input
                        id="postalCode"
                        placeholder="123456"
                        value={formData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Страна *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleInputChange("country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RU">Россия</SelectItem>
                          <SelectItem value="BY">Беларусь</SelectItem>
                          <SelectItem value="KZ">Казахстан</SelectItem>
                          <SelectItem value="UA">Украина</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Icon
                          name="Loader2"
                          className="mr-2 animate-spin"
                          size={20}
                        />
                        Обработка платежа...
                      </>
                    ) : (
                      <>
                        <Icon name="CreditCard" className="mr-2" size={20} />
                        Оплатить {Math.round(getTotalPrice() * 1.2)} ₽
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="Lock" className="mr-1" size={12} />
                      <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Shield" className="mr-1" size={12} />
                      <span>PCI DSS</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Check" className="mr-1" size={12} />
                      <span>3D Secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
