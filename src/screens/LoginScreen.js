import React, {useState, useContext, useCallback} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Button,
} from "react-native";

import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import {useFocusEffect} from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { onLogin, error, isLoading,setError } = useContext(AuthenticationContext);
    useFocusEffect(
        useCallback(() => {
            setError(null);
        }, [])
    );

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen e-posta ve şifre giriniz.");
            return;
        }

        onLogin(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>

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

            {error && <Text style={styles.errorText}>{error}</Text>}

            {isLoading ? (
                <ActivityIndicator size="large" color="tomato" />
            ) : (
                <>
                    <Button
                        title="Giriş Yap"
                        onPress={handleLogin}
                    />
                    <View style={styles.registerContainer}>
                        <Button
                            title="Hesabın yok mu? Kayıt ol"
                            onPress={() => navigation.navigate("Register")}
                        />
                    </View>
                </>
            )}
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
    button: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
    registerContainer: {
        marginTop: 10,
    }
});

export default LoginScreen;
