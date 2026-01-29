import React, { FC, memo } from 'react';
import { Marker, LatLng } from 'react-native-maps';

interface MarkersProps {
  deliveryLocation?: LatLng | null;
  pickupLocation?: LatLng | null;
  deliveryPersonLocation?: LatLng | null;
}

const Markers: FC<MarkersProps> = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
}) => {
  return (
    <>
      {deliveryLocation && (
        <Marker
          coordinate={deliveryLocation}
          image={require('@assets/icons/my_pin.png')}
          style={markerStyles.default}
        />
      )}

      {pickupLocation && (
        <Marker
          coordinate={pickupLocation}
          image={require('@assets/icons/store.png')}
          style={markerStyles.default}
        />
      )}

      {deliveryPersonLocation && (
        <Marker
          coordinate={deliveryPersonLocation}
          image={require('@assets/icons/delivery.png')}
          style={markerStyles.delivery}
        />
      )}
    </>
  );
};

export default memo(Markers);

const markerStyles = {
  default: {
    width: 20,
    height: 20,
  },
  delivery: {
    width: 20,
    height: 20,
    zIndex: 99,
  },
};
