import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Button, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { openDBAsync, init, insertLocation, fetchAllLocations } from "../utils/Places-db";
import { getAddress } from "../utils/Location";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TypeSelector from "../ui/TypeSelector";

const MapScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [address, setAddress] = useState("");
    const [locations, setLocations] = useState([]);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("donation");

    useEffect(() => {
        (async () => {
            await openDBAsync();
            await init();
            await getCurrentLocation();
            const savedLocations = await fetchAllLocations();
            setLocations(savedLocations);
        })();
    }, []);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("İzin reddedildi", "Konum izni verilmedi.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            updateLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            Alert.alert("Hata", "Konum alınamadı");
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

    const saveLocation = async () => {
        if (!title || !selectedLocation) {
            Alert.alert("Eksik Bilgi", "Başlık ve konum gerekli.");
            return;
        }

        const newLocation = {
            title,
            type,
            address,
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
        };

        await insertLocation(newLocation);
        const updatedLocations = await fetchAllLocations();
        setLocations(updatedLocations);
        Alert.alert("Başarılı", "Konum kaydedildi!");
        setTitle("");
    };

    return (
        <View style={{ flex: 1 }}>
            {initialRegion ? (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                        onPress={handleMapPress}
                    >
                        {locations.map((loc) => (
                            <Marker
                                key={loc.id}
                                coordinate={{ latitude: loc.lat, longitude: loc.lng }}
                                title={loc.title}
                                description={loc.address}
                                pinColor={loc.type === "donation" ? "red" : "blue"}
                            />
                        ))}

                        {selectedLocation && (
                            <Marker
                                coordinate={selectedLocation}
                                title="Seçilen Konum"
                                pinColor="green"
                            />
                        )}
                    </MapView>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                        style={{ flex: 1 }}
                    >
                        <KeyboardAwareScrollView
                            contentContainerStyle={styles.infoPanel}
                            enableOnAndroid={true}
                        >
                            <Text style={styles.sectionTitle}>SEÇİLEN KONUM</Text>
                            {selectedLocation && (
                                <>
                                    <Text>Koordinatlar: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}</Text>
                                    <Text>Adres: {address || "Yükleniyor..."}</Text>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Başlık girin"
                                        value={title}
                                        onChangeText={setTitle}
                                    />

                                    {/*<View style={styles.buttonRow}>*/}
                                    {/*    <Button title="Bağış" onPress={() => setType("donation")} />*/}
                                    {/*    <Button title="Gönüllü" onPress={() => setType("volunteer")} />*/}
                                    {/*</View>*/}
                                    <TypeSelector selectedType={type} setType={setType} />
                                    <Button title="Konumu Kaydet" onPress={saveLocation} />
                                </>
                            )}
                        </KeyboardAwareScrollView>
                    </KeyboardAvoidingView>
                </>
            ) : (
                <Text>Harita yükleniyor...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "60%", // Harita ekranın üst yarısında kalır
    },
    infoPanel: {
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderTopWidth: 1,
        borderColor: "#ccc",
        flexGrow: 1,
    },
    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        borderColor: "#aaa",
        borderWidth: 1,
        padding: 8,
        marginVertical: 10,
        backgroundColor: "white",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
});

export default MapScreen;
