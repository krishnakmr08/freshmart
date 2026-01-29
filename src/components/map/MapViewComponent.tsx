import React, { FC, useEffect, useRef } from 'react';
import MapView, { Marker, LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import type { RefObject } from 'react';
import { customMapStyle } from '@utils/CustomMap';

interface MapViewComponentProps {
  mapRef: RefObject<MapView | null> | null;
  setMapRef: (ref: RefObject<MapView | null>) => void;
  deliveryLocation?: LatLng | null;
  pickupLocation?: LatLng | null;
  deliveryPersonLocation?: LatLng | null;
  hasAccepted: boolean;
  hasPickedUp: boolean;
}

const MapViewComponent: FC<MapViewComponentProps> = ({
  setMapRef,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
}) => {
  const localMapRef = useRef<MapView | null>(null);

  useEffect(() => {
    setMapRef(localMapRef);
  }, [setMapRef]);

  return (
    <MapView
      ref={localMapRef}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      showsUserLocation
      showsMyLocationButton={false}
      toolbarEnabled={false}
      showsCompass={false}
      rotateEnabled={false}
      pitchEnabled={false}
      customMapStyle={customMapStyle}
      initialRegion={{
        latitude: deliveryLocation?.latitude ?? 28.6139,
        longitude: deliveryLocation?.longitude ?? 77.209,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {deliveryLocation && <Marker coordinate={deliveryLocation} />}
      {pickupLocation && <Marker coordinate={pickupLocation} />}
      {deliveryPersonLocation && <Marker coordinate={deliveryPersonLocation} />}
    </MapView>
  );
};

export default MapViewComponent;
