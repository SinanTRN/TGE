import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CategoryInfo = ({ category, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(category)}>
            <Image source={{ uri: category.icon }} style={styles.icon} />
            <Text style={styles.name}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default CategoryInfo;
