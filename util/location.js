const GOOGLE_API_KEY = 'AIzaSyA12XAR0tLXBdOX_PP0XROgx1go3UP3oaA'
export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat}.70${lng}
    &key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
  } 