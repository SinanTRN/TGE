import React, {useState, useContext} from "react";
import {useCallback} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Button,
} from "react-native";

import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import {useFocusEffect} from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { onRegister, error,setError } = useContext(AuthenticationContext);
    useFocusEffect(
        useCallback(()=>{
            setError(null);
        })
    );
    const handleRegister = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor.");
            return;
        }

        onRegister(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kayıt Ol</Text>

            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Şifre Tekrar"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.buttonContainer}>
                <View>
                    <Button
                            title="Kayıt Ol"
                            onPress={handleRegister}
                    />
                </View>
                <View style={{height:10}}/>
                <Button style={{marginTop:10}}
                    title="Zaten hesabın var mı? Giriş yap"
                    onPress={() => navigation.goBack()}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
});

export default RegisterScreen;
