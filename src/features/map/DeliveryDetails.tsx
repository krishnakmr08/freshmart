import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

interface DeliveryDetailsProps {
  details?: {
    name?: string;
    phone?: string;
    address?: string;
  } | null;
}

const DeliveryDetails: FC<DeliveryDetailsProps> = ({ details }) => {
  const name = details?.name ?? 'Anonymous';
  const phone = details?.phone ?? 'XXXXXXXXXX';
  const address = details?.address ?? '-----';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="bike-fast" color={Colors.disabled} size={RFValue(20)} />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Your delivery details
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomText>
        </View>
      </View>

      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon
            name="map-marker-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View style={{ width: '80%' }}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomText>
          <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Regular}>
            {address}
          </CustomText>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon
            name="phone-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View style={{ width: '80%' }}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            {name} • {phone}
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Regular}>
            Receiver&apos;s contact number
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default React.memo(DeliveryDetails);


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
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

