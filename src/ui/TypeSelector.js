import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const TypeSelector = ({ selectedType, setType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tür:</Text>
            <View style={styles.optionContainer}>
                <Pressable style={styles.option} onPress={() => setType("donation")}>
                    <View style={[styles.circle, selectedType === "donation" && styles.selected]} />
                    <Text style={styles.optionText}>Bağış</Text>
                </Pressable>

                <Pressable style={styles.option} onPress={() => setType("volunteer")}>
                    <View style={[styles.circle, selectedType === "volunteer" && styles.selected]} />
                    <Text style={styles.optionText}>Gönüllü</Text>
                </Pressable>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    optionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#555",
        marginRight: 8,
    },
    selected: {
        backgroundColor: "#555",
    },
    optionText: {
        fontSize: 16,
    },
});

export default TypeSelector;
