import React, { FC, memo, useMemo } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import BillDetails from '@features/order/BillDetails';



interface OrderItemType {
  count: number;
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: string;
    image?: string;
  };
}

interface Order {
  orderId: string;
  items: OrderItemType[];
}

interface OrderSummaryProps {
  order: Order;
}

/* ================= HELPERS ================= */

const formatPrice = (value: number) =>
  `₹${value.toLocaleString('en-IN')}`;

/* ================= ITEM ROW ================= */

const OrderItemRow = memo<{ cartItem: OrderItemType }>(
  ({ cartItem }) => {
    const { item, count } = cartItem;

    return (
      <View style={styles.flexRow}>
        {/* Image */}
        <View style={styles.imgContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.img}
              accessibilityLabel={item.name}
            />
          ) : (
            <Icon
              name="image-off-outline"
              size={RFValue(18)}
              color={Colors.disabled}
            />
          )}
        </View>

        {/* Item Info */}
        <View style={styles.itemInfo}>
          <CustomText
            numberOfLines={2}
            variant="h8"
            fontFamily={Fonts.Medium}
          >
            {item.name}
          </CustomText>
          <CustomText variant="h9">
            {item.quantity}
          </CustomText>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            {formatPrice(item.price * count)}
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            {count}x
          </CustomText>
        </View>
      </View>
    );
  }
);

/* ================= MAIN COMPONENT ================= */

const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  const totalPrice = useMemo(() => {
    return order.items.reduce(
      (total, cartItem) =>
        total + cartItem.item.price * cartItem.count,
      0
    );
  }, [order.items]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>

        <View>
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            Order summary
          </CustomText>
          <CustomText variant="h9" fontFamily={Fonts.Medium}>
            Order ID - #{order.orderId}
          </CustomText>
        </View>
      </View>

      {/* Items */}
      {order.items.map(item => (
        <OrderItemRow
          key={item.item._id}
          cartItem={item}
        />
      ))}

      {/* Bill */}
      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

export default memo(OrderSummary);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
  },
  itemInfo: {
    width: '55%',
  },
  priceContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
