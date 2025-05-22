import React from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import {Platform as platform} from "expo-modules-core/src";

const isUriImage = (imageSource) => {
    return typeof imageSource === "string" && (imageSource.startsWith("http") || imageSource.startsWith("data:image"));
};


const localImages={
    deneme:require('../../assets/Images/deneme.jpg'),
    logo:require('../../assets/Images/Logo.png'),
}

const localImageCreator = (imageName) => localImages[imageName];

const UserInfo=({name,email,profileImage,onAvatarPress})=>{
    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onAvatarPress}>
                    <Image source={isUriImage(profileImage)?{uri:profileImage}:localImageCreator(profileImage)}
                           style={styles.image} resizeMode={"stretch"} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.name}>{name}</Text>
                    {email && <Text style={styles.email}>{email}</Text>}
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:platform.OS==='ios'?15:10,
        backgroundColor:'#ffbb9d',
        borderBottomWidth:1,
        borderStyle:'solid',
    },
    image:{
        width:platform.OS === 'ios' ? 60 : 50,
        height:platform.OS === 'ios' ? 60 : 50,
        borderRadius:25,
        borderWidth:2,
        borderColor:'gray',
        marginRight:10,
    },
    name:{
        fontSize:16,
        color:'black',
    },
    email:{
        fontSize:14,
        color:'black',
    },
})

export default UserInfo;
