import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { formatISOToCustom } from '@utils/DateUtils';
import { Order } from 'types/order';



/* ================= PROPS ================= */

interface ProfileOrderItemProps {
  item: Order;
  index: number;
}

/* ================= COMPONENT ================= */

const ProfileOrderItem: FC<ProfileOrderItemProps> = ({
  item,
  index,
}) => {
  return (
    <View
      style={[
        styles.container,
        index === 0 && styles.firstItem,
      ]}
    >
      {/* Header */}
      <View style={styles.flexRowBetween}>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomText>

        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={styles.status}
        >
          {item.status}
        </CustomText>
      </View>

      {/* Items + Price */}
      <View style={styles.flexRowBetween}>
        <View style={styles.itemsContainer}>
          {item.items.map(orderItem => (
            <CustomText
              key={orderItem.item._id}
              variant="h8"
              numberOfLines={1}
            >
              {orderItem.count}x {orderItem.item.name}
            </CustomText>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={styles.price}
          >
            ₹{item.items.reduce(
              (sum, i) => sum + i.count * i.item.price,
              0,
            )}
          </CustomText>

          <CustomText variant="h9">
            {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default memo(ProfileOrderItem);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.9,
  },
  firstItem: {
    borderTopWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemsContainer: {
    width: '50%',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    marginTop: 10,
  },
  status: {
    textTransform: 'capitalize',
  },
});
