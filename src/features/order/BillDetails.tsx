import { StyleSheet, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const DELIVERY_CHARGE = 29;
const HANDLING_CHARGE = 2;
const SURGE_CHARGE = 3;

const formatPrice = (value: number) => {
  const safeValue = Number(value) || 0;
  return `₹${safeValue}`;
};

const ReportItem: FC<{
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}> = ({ iconName, underline = false, title, price }) => {
  return (
    <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          style={{ opacity: 0.7 }}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomText
          style={{
            textDecorationStyle: 'dashed',
            textDecorationLine: underline ? 'underline' : 'none',
          }}
          variant="h8"
        >
          {title}
        </CustomText>
      </View>
      <CustomText variant="h8">{formatPrice(price)}</CustomText>
    </View>
  );
};

const BillDetails: FC<{ totalItemPrice: number }> = ({ totalItemPrice }) => {
  const safeItemTotal = Number(totalItemPrice) || 0;

  const extraCharges = useMemo(
    () => DELIVERY_CHARGE + HANDLING_CHARGE + SURGE_CHARGE,
    []
  );

  const grandTotal = useMemo(
    () => safeItemTotal + extraCharges,
    [safeItemTotal, extraCharges]
  );

  return (
    <View style={styles.container}>
      <CustomText
        style={styles.text}
        fontFamily={Fonts.SemiBold}
        fontSize={RFValue(10)}
      >
        Bill Details
      </CustomText>

      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Items total"
          price={safeItemTotal}
        />
        <ReportItem
          iconName="pedal-bike"
          title="Delivery charge"
          price={DELIVERY_CHARGE}
        />
        <ReportItem
          iconName="shopping-bag"
          title="Handling charge"
          price={HANDLING_CHARGE}
        />
        <ReportItem
          iconName="cloudy-snowing"
          title="Surge charge"
          price={SURGE_CHARGE}
        />
      </View>

      <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
        <CustomText
          variant="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}
        >
          Grand Total
        </CustomText>
        <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
          {formatPrice(grandTotal)}
        </CustomText>
      </View>
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
