import React, { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([
        { id: "1", name: "Eğitim", description: "Eğitimle ilgili bağışlar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoCk8JkaLw7UbfYxjhVJ7oQ2zml19opnqUaQ&s" },
        { id: "2", name: "Sağlık", description: "Sağlık alanında destekler", image: "https://www.hayrendis.com/wp-content/uploads/2024/06/saglik-kategori.webp" },
        { id: "3", name: "Gıda", description: "Gıda yardımları", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFkM-u3yPzVu_WepXqO8F0LRc8J8BstJ0y0g&s" },
        { id: "4", name: "Barınma", description: "Barınma yardımları", image: require("../../../assets/Images/barinma-yazisiz.jpg") }
    ]);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
