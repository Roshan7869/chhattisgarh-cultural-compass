// Google Maps URL utilities

export const getGoogleMapsDirectionsUrl = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): string => {
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=driving`;
};

export const getGoogleMapsLocationUrl = (
  coordinates: { lat: number; lng: number },
  label?: string
): string => {
  const baseUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  return label ? `${baseUrl}&query_place_id=${encodeURIComponent(label)}` : baseUrl;
};

export const openGoogleMapsDirections = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): void => {
  window.open(getGoogleMapsDirectionsUrl(from, to), '_blank');
};

export const openGoogleMapsLocation = (
  coordinates: { lat: number; lng: number },
  label?: string
): void => {
  window.open(getGoogleMapsLocationUrl(coordinates, label), '_blank');
};
