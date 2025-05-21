import React from "react";
import {TouchableOpacity,Text,Image,StyleSheet} from "react-native";

const NewsItem = ({news}) => {
    return(
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{uri: news.image}}/>
            <Text style={styles.title}>{news?.title || "Başlık Yok"}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        marginRight:15,
    },
    image:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#ddd',
    },
    title:{
        marginTop:5,
        fontSize:12,
        color:'black',
    }
})

export default NewsItem;
