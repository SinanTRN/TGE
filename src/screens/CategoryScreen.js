import React, { useState } from 'react';
import {View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useCategory} from "../services/category/CategoryContext";


const CategoriesScreen = () => {
    const {categories} = useCategory();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );
    const handleSearch = (text) => {
        setLoading(true);
        setSearch(text);
        setTimeout(()=>setLoading(false),1000);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Kategori Ara..."
                value={search}
                onChangeText={handleSearch}
            />
            {loading ? <ActivityIndicator size="large" color="blue" style={styles.loading} />:
            <FlatList
                data={filteredCategories}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={typeof item.image === "string" ? { uri: item.image } : item.image } resizeMode={"cover"} style={styles.image} />
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#f8eced',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 175,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    loading: {
        marginTop: 20,
    },
});

export default CategoriesScreen;
