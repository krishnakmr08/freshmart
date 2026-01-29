import type MapView from 'react-native-maps';
import type { RefObject } from 'react';
import type { LatLng } from 'react-native-maps';

export const handleFitToPath = (
  mapRef: RefObject<MapView | null> | null,
  deliveryLocation?: LatLng | null,
  pickupLocation?: LatLng | null,
  hasPickedUp?: boolean,
  hasAccepted?: boolean,
  deliveryPersonLocation?: LatLng | null,
) => {
  if (!mapRef?.current || !deliveryLocation || !pickupLocation) return;

  const startPoint = hasAccepted
    ? deliveryPersonLocation
    : deliveryLocation;

  const endPoint = hasPickedUp
    ? deliveryPersonLocation
    : pickupLocation;

  if (!startPoint || !endPoint) return;

  mapRef.current.fitToCoordinates([startPoint, endPoint], {
    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    animated: true,
  });
};
