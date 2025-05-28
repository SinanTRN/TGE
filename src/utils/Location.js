import { GOOGLE_API_KEY } from '@env';

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
