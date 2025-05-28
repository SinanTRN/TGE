import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const DropdownMenu = ({ visible, onProfilePress, onLogoutPress }) => {
    const [expanded, setExpanded] = React.useState(true); // Menü açıldığında direkt açık olsun

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <List.Accordion
                title=""
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                style={styles.accordion}
                left={props => <List.Icon {...props} icon="account" />}
            >
                <List.Item
                    title="Profili Görüntüle"
                    left={props => <List.Icon {...props} icon="account-eye" />}
                    onPress={onProfilePress}
                    style={styles.item}
                />
                <List.Item
                    title="Çıkış Yap"
                    left={props => <List.Icon {...props} icon="logout" />}
                    onPress={onLogoutPress}
                    style={styles.item}
                />
            </List.Accordion>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 70,
        left: 15,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 10,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    accordion: {
        backgroundColor: 'white',
    },
    item: {
        paddingVertical: 5,
    },
});

export default DropdownMenu;
