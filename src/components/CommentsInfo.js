import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Dimensions } from "react-native";
import FlipCard from "react-native-flip-card";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const CommentsInfo = ({ comment,isFlipped,onPress }) => {
    //const [isFlipped, setIsFlipped] = useState(false);
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.card}>
                {!isFlipped ? (
                    <>
                        <Card.Cover style={styles.image} resizeMode={"stretch"} source={{ uri: comment.image }} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{comment.name? comment.name:"Anonim"}</Text>
                            <Text style={styles.date}>{comment.date}</Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.backSide}>
                        <Text style={styles.description}>{comment.description}</Text>
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        //smargin: 5,
        backgroundColor: "white"
    },
    image: {
        height: 200,
    },
    infoContainer: {
        padding: 10,
        borderTopWidth: 2,
        borderColor: "black",
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    date: {
        fontSize: 14,
        color: "gray",
    },
    backSide: {
        width: "100%",
        height: 250,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    description: {
        fontSize: 14,
        fontStyle: "italic",
    },
});

export default CommentsInfo;
