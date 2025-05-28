// components/FloatingBackButton.js
import { Pressable, StyleSheet, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";

const FloatingBackButton = () => {
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        // Butona basınca küçülme animasyonu
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => navigation.goBack());
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable onPress={handlePress} style={styles.button}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    button: {
        backgroundColor: "orange",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default FloatingBackButton;
