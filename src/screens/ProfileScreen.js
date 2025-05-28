import React, { useEffect, useState, useContext } from "react";
import {
    View, Text, StyleSheet, Image, TextInput, ActivityIndicator,
    ScrollView, TouchableOpacity, Platform
} from "react-native";
import { getUserProfile, updateUserProfile,updateUserPhoto } from "../services/firestore/UserService";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import{Alert} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {uploadToCloudinary} from "../services/cloudinary/CloudinaryService";
import FloatingBackButton from "../ui/FloatingBackButton";


const ProfileScreen = () => {
    const { user } = useContext(AuthenticationContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(user.uid);
                setProfile(data);
                setForm(data || {}); // form verilerini başlat, eğer yoksa boş bir nesne ile başlat
            } catch (e) {
                console.error("Profil alınamadı:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const pickImage = async () => {
            Alert.alert(
                "Fotoğraf Seçimi",
                "Lütfen bir seçenek seçin",
                [
                    { text: "İptal", style: "cancel" },
                    { text: "Galeriden Seç", onPress: pickFromGallery },
                    { text: "Kamera ile Çek", onPress: pickFromCamera },
                ]
            );
    };

    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("İzin gerekiyor", "Galeriye erişim izni gerekiyor");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0];
            await uploadAndSetPhoto(selectedAsset.base64);
        }
    };

    const pickFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("İzin gerekiyor", "Kameraya erişim izni gerekiyor");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled) {
            const capturedAsset = result.assets[0];
            await uploadAndSetPhoto(capturedAsset.base64);
        }
    };

    const uploadAndSetPhoto = async (base64Image) => {
        try {
            setSaving(true);
            const imageUrl = await uploadToCloudinary(base64Image);
            await updateUserPhoto(user.uid, imageUrl);
            setProfile(prev => ({...prev, photoURL: imageUrl}));
            setForm(prev => ({...prev, photoURL: imageUrl}));
        } catch (error) {
            Alert.alert("Hata", "Fotoğraf yüklenirken bir hata oluştu");
        } finally {
            setSaving(false);
        }
    }
    const handleCancelEdit = () => {
        Alert.alert(
            "Düzenleme İptal",
            "Yaptığınız değişiklikler kaydedilmeyebilir. Çıkmak istiyor musunuz?",
            [
                {
                    text: "Vazgeç",
                    style: "cancel",
                },
                {
                    text: "Evet, Çık",
                    onPress: () => {
                        setForm(profile); // Formu eski haline getir
                        setEditing(false); // Düzenleme modunu kapat
                    },
                },
            ]
        );
    }

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateUserProfile(user.uid, form);
            setProfile(form);
            setEditing(false);
        } catch (e) {
            console.error("Güncelleme hatası:", e);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="tomato" />
            </View>
        );
    }

    const renderField = (label, field) => (
        <>
            <Text style={styles.label}>{label}</Text>
            {editing ? (
                <TextInput
                    style={styles.input}
                    value={form[field] ?? ""} // formdan gelen değer başlangıçta undefined olabilir
                    onChangeText={(text) => handleChange(field, text)}
                />
            ) : (
                <Text style={styles.value}>{profile?.[field] || "Belirtilmemiş"}</Text>
            )}
        </>
    );

    return (
        <View style={{flex:1}}>
            <FloatingBackButton />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarWrapper}>
                    {profile?.photoURL ? (
                        <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.initials}>👤</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.editPhoto}>🖼 Fotoğrafı Değiştir</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Kullanıcı Bilgileri</Text>
                </View>
                <View style={styles.userInformationWrapper}>
                    {renderField("Kullanıcı Adı", "nickname")}
                    {renderField("Ad", "name")}
                    {renderField("Soyad", "surname")}
                    {renderField("Telefon", "phone")}
                    {renderField("Adres", "address")}
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                    {!editing ? (
                        <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
                            <Text style={styles.editBtnText}>✏️ Profili Düzenle</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
                                <Text style={styles.saveBtnText}>{saving ? "Kaydediliyor..." : "💾 Kaydet"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelEdit}>
                                <Text style={styles.cancelBtnText}>❌ Geri</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.TotalDonations}>
                    <Text style={styles.title}>Toplam Bağış: </Text>
                    <Text style={styles.DonationsValue}>{profile?.totalDonations || 0} TL</Text>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 35,
        backgroundColor: "#f8eced",
        height: "100%",
    },

    TotalDonations: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    DonationsValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        color: "green",
    },
    avatarWrapper: {
        alignItems: "center",
        marginBottom: 20,
    },
    titleContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },
    userInformationWrapper: {
        width: "100%",
        padding: 20,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        //marginBottom: 5,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
    },
    initials: {
        fontSize: 32,
    },
    editPhoto: {
        color: "#007bff",
        marginTop: 10,
        textDecorationLine: "underline",
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        width: "80%",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        fontSize: 16,
        marginBottom: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    editBtn: {
        backgroundColor: "orange",
        padding: 10,
        borderRadius: 8,
    },
    editBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    saveBtn: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 8,
    },
    saveBtnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    cancelBtn: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 8,
    },
    cancelBtnText: {
        color: "#000",
        fontWeight: "bold",
    },
});

export default ProfileScreen;
