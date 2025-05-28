import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { donationPoints, volunteerPoints } from "../utils/PointsData";
import { getMapPreview, getAddress } from "../utils/Location";

const MapScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Konum izinleri ve başlangıç bölgesi
    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        setIsLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("İzin reddedildi", "Konum izni verilmedi.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            updateLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        } catch (error) {
            Alert.alert("Hata", "Konum alınamadı");
        } finally {
            setIsLoading(false);
        }
    };

    const updateLocation = async (coords) => {
        setSelectedLocation(coords);
        setInitialRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
            const addr = await getAddress(coords.latitude, coords.longitude);
            setAddress(addr);
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        updateLocation({ latitude, longitude });
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Konum bilgisi alınıyor...</Text>
            ) : initialRegion ? (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        onPress={handleMapPress}
                    >
                        {/* Bağış Noktaları */}
                        {donationPoints.map((point) => (
                            <Marker
                                key={`donation-${point.id}`}
                                coordinate={{
                                    latitude: point.lat,
                                    longitude: point.lng,
                                }}
                                title={point.title}
                                description={point.address}
                                pinColor="red"
                            />
                        ))}

                        {/* Gönüllülük Noktaları */}
                        {volunteerPoints.map((point) => (
                            <Marker
                                key={`volunteer-${point.id}`}
                                coordinate={{
                                    latitude: point.lat,
                                    longitude: point.lng,
                                }}
                                title={point.title}
                                description={point.address}
                                pinColor="blue"
                            />
                        ))}

                        {/* Kullanıcı Seçimi */}
                        {selectedLocation && (
                            <Marker
                                coordinate={selectedLocation}
                                title="Seçilen Konum"
                                pinColor="green"
                            />
                        )}
                    </MapView>

                    {/* Bilgi Paneli - Tüm bilgiler tek bir yerde */}
                    <View style={styles.infoPanel}>
                        {selectedLocation && (
                            <>
                                <Text style={styles.sectionTitle}>SEÇİLEN KONUM</Text>
                                <Text>Koordinatlar:
                                    {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
                                </Text>
                                <Text>Adres: {address || "Yükleniyor..."}</Text>
                            </>
                        )}

                        <Text style={styles.sectionTitle}>YAKINDAKİ NOKTALAR</Text>
                        <Text>Bağış Noktaları: {donationPoints.length}</Text>
                        <Text>Gönüllülük Projeleri: {volunteerPoints.length}</Text>
                    </View>
                </>
            ) : (
                <Text>Harita yükleniyor...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    infoPanel: {
        padding: 15,
        backgroundColor: "#f8eced",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
});

export default MapScreen;
