import { Order, OrderItem, OrderStatus } from 'types/order';
import { appAxios } from './apiInterceptors';
import { BRANCH_ID } from './config';

import type { LatLng } from 'react-native-maps';


export const createOrder = async (
  items: OrderItem[],
  totalPrice: number,
): Promise<Order | null> => {
  if (!items.length || totalPrice <= 0) return null;

  try {
    const res = await appAxios.post<Order>('/order', {
      items,
      branch: BRANCH_ID,
      totalPrice,
    });

    return res.data;
  } catch (err) {
    console.log('createOrder error', err);
    return null;
  }
};



export const getOrderById = async (
  id: string,
): Promise<Order | null> => {
  if (!id) return null;

  try {
    const res = await appAxios.get<Order>(`/order/${id}`);
    return res.data;
  } catch (err) {
    console.log('getOrderById error', err);
    return null;
  }
};



export const fetchCustomerOrders = async (
  userId: string,
): Promise<Order[]> => {
  if (!userId) return [];

  try {
    const res = await appAxios.get<Order[]>(
      `/order?customerId=${userId}`,
    );
    return res.data;
  } catch (err) {
    console.log('fetchCustomerOrders error', err);
    return [];
  }
};



export const fetchOrders = async (
  status: 'available' | 'delivered',
  userId: string,
  branchId: string,
): Promise<Order[]> => {
  if (!branchId) return [];

  const url =
    status === 'available'
      ? `/order?status=available&branchId=${branchId}`
      : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

  try {
    const res = await appAxios.get<Order[]>(url);
    return res.data;
  } catch (err) {
    console.log('fetchOrders error', err);
    return [];
  }
};



export const sendLiveOrderUpdates = async (
  orderId: string,
  location: LatLng,
  status: OrderStatus,
): Promise<Order | null> => {
  if (!orderId || !location) return null;

  try {
    const res = await appAxios.patch<Order>(
      `/order/${orderId}/status`,
      {
        deliveryPersonLocation: location,
        status,
      },
    );

    return res.data;
  } catch (err) {
    console.log('sendLiveOrderUpdates error', err);
    return null;
  }
};



export const confirmOrder = async (
  orderId: string,
  location: LatLng,
): Promise<Order | null> => {
  if (!orderId || !location) return null;

  try {
    const res = await appAxios.post<Order>(
      `/order/${orderId}/confirm`,
      {
        deliveryPersonLocation: location,
      },
    );

    return res.data;
  } catch (err) {
    console.log('confirmOrder error', err);
    return null;
  }
};
