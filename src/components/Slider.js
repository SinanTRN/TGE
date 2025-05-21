import React,{useRef,useState,useEffect} from "react";
import {Image, ScrollView, View, StyleSheet, Dimensions} from "react-native";
import UserInfo from "./UserInfo";

const{width}=Dimensions.get('window');

// const isUriImage = (imageSource) => {
//     return imageSource.match(/\.(jpeg|jpg|gif|png)$/) != null;
// }

const Slider = () => {
    const scrollViewRef = useRef(null); // ScrollView için referans
    const [currentIndex, setCurrentIndex] = useState(0); // Aktif index

    const images = [
        // require("../../assets/Images/deneme.jpg"),
        // require("../../assets/Images/a.png"),
        // require("../../assets/Images/deneme2.jpg"),
        "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {///
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % images.length;
                scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
                return nextIndex;
            });
        }, 3000); // Her 3 saniyede bir kaydır

        return () => clearInterval(interval); // Bellek temizliği
    }, []);

    return (
        <View style={styles.myview}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                {images.map((img, index) => (
                    <Image key={index} style={styles.image} resizeMode="contain" source={typeof img === "string" ? { uri: img } : img} />
                ))}
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    myview:{
        backgroundColor:'#f8eced',
        flexDirection:'row',
        height:250,
    },
    image:{
        width,
        height:250,
        //marginVertical:20,
        //paddingVertical:60,
        borderColor:'gray',
        //borderWidth:2,
    }
});

export default Slider;
