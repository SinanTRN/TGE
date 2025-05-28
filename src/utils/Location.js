import { donationPoints, volunteerPoints } from './PointsData';
import { GOOGLE_API_KEY } from '@env';

// Static Map'e tüm noktaları ekleyen fonksiyon
export function getMapPreview(lat, lng) {
    const donationMarkers = donationPoints.map(p => `markers=color:red%7C${p.lat},${p.lng}`).join('&');
    const volunteerMarkers = volunteerPoints.map(p => `markers=color:blue%7C${p.lat},${p.lng}`).join('&');

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
    &${donationMarkers}&${volunteerMarkers}&markers=color:green%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}&language=tr`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Google sunucusuna ulaşılamadı.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return "Adres bulunamadı.";
        }

        return data.results[0].formatted_address;

    } catch (error) {
        console.error("Adres alınırken hata:", error);
        return "Adres alınamadı.";
    }
}
