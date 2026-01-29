export interface OrderItem {
  count: number;
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: string;
    image?: string;
  };
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'arriving'
  | 'delivered'
  | 'cancelled';

export interface DeliveryPartner {
  _id: string;
  name: string;
  phone: string;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;

  customer: any;
  deliveryLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  deliveryPersonLocation?: {
    latitude: number;
    longitude: number;
  };

  deliveryPartner?: DeliveryPartner;
}
