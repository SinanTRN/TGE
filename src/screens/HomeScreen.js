import React, {useContext, useEffect, useReducer, useState} from 'react';
import {View, StyleSheet, FlatList, Text, ScrollView, Button} from 'react-native';
import UserInfo from "../components/UserInfo";
import NewsItem from "../components/NewsItem";
import Slider from "../components/Slider";
import CommentsInfo from "../components/CommentsInfo";
import {useNavigation} from '@react-navigation/native';
import {AuthenticationContext} from "../services/authentication/AuthenticationContext";
import{Modal , TouchableOpacity} from 'react-native';
import {getUserProfile} from "../services/firestore/UserService";

const news=[
    {id:'1',title:'news1',image:'https://754933.meb.k12.tr/meb_iys_dosyalar/63/01/669387/resimler/2022_11/k_07085727_yardimlasma.jpg'},
    {id:'2',title:'news2',image:'https://754933.meb.k12.tr/meb_iys_dosyalar/63/01/669387/resimler/2022_11/k_07085727_yardimlasma.jpg'},
    {id:'3',title:'news3',image:'https://754933.meb.k12.tr/meb_iys_dosyalar/63/01/669387/resimler/2022_11/k_07085727_yardimlasma.jpg'},
    {id:'4',title:'news4',image:'https://avatars.githubusercontent.com/u/67331180?v=4'},
    {id:'5',title:'news5',image:'https://avatars.githubusercontent.com/u/67331180?v=4'},

];
const comments = [
    {
        id: "1",
        name: "Elif Kaya",
        date: "20 Mart 2025",
        image: "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        description: "Bu bağış çok işime yaradı, teşekkür ederim!",
    },
    {
        id: "2",
        date: "21 Mart 2025",
        image: "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        description: "Çok teşekkürler! Gerçekten harikaydı.",
    },
    {
        id: "3",
        name: "Mehmet Öz",
        date: "22 Mart 2025",
        image: "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        description: "Bu yardımla hayatım değişti.",
    },
    {
        id: "4",
        name: "Zeynep Demir",
        date: "23 Mart 2025",
        image: "https://image.hurimg.com/i/hurriyet/75/866x494/612cbc914e3fe11b54fd4575.jpg",
        description: "Bağışlarınız için minnettarım!",
    },
];

const reducer=(state,action)=>{
    switch (action.type){
        case 'TOGGLE':
            return state===action.id ? null : action.id;
        default:
            return state;
    }
}

const HomeScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [flippedId, dispatch] = useReducer(reducer, null);
    const navigation = useNavigation();
    const { onLogout } = useContext(AuthenticationContext);

    const { user } = useContext(AuthenticationContext);
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);


    useEffect(() => {
        const fetcProfile = async () => {
            try{
                const data = await getUserProfile(user.uid);
                setProfile(data);
            }
            catch(error){
                console.error("Profil verisi alınamadı", error);
            }
            finally {
                setLoadingProfile(false);
            }
        }
        fetcProfile();
    }, []);

    const isProfileIncomplete = profile && (
        !profile.name || !profile.surname || !profile.phone || !profile.address
    );

    const handleProfile = () => {
        setMenuVisible(false);
        navigation.navigate("Profile");
    };

    const handleLogout = () => {
        setMenuVisible(false);
        onLogout();
    };
    return (
    <View style={styles.container}>
        <View>
        </View>
      <View style={styles.info}>
          <UserInfo
              name={profile?.nickname || "Kullanıcı"}
              email={profile?.email || user.email}
              profileImage={profile?.photoURL || "deneme"}
              onAvatarPress={() => setMenuVisible(prev => !prev)}
          />
      </View>
        {isProfileIncomplete && (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text style={[styles.warningText, { textDecorationLine: "underline" }]}>
                    Lütfen profil bilgilerinizi tamamlayınız
                </Text>
            </TouchableOpacity>
        )}
        {menuVisible && (
            <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={handleProfile} style={styles.dropdownItem}>
                    <Text>👤 Profili Görüntüle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                    <Text>🚪 Çıkış Yap</Text>
                </TouchableOpacity>
            </View>
        )}

        <FlatList
       ListHeaderComponent={
           <View style={styles.content}>
               <View style={styles.newsContainer}>
                   <FlatList data={news} horizontal
                             showsHorizontalScrollIndicator={false}
                             keyExtractor={item => item.id}
                             renderItem={({item}) => <NewsItem news={item}/>}/>
               </View>
               <View style={styles.header}>
                   <Text style={styles.headerText}>HABERLER</Text>
               </View>
               <View>
                   <Slider/>
               </View>
               <View style={styles.leftJustifiedHeader}>
                   <Text style={styles.headerText}> Sizden Gelenler </Text>
               </View>
               <View style={styles.comments}>
                   <FlatList
                       data={comments}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => (
                           <View style={{ width: '48%', marginBottom: 10,  }}>
                               {/*<CommentsInfo comment={item} />*/}
                               <CommentsInfo comment={item}
                                             isFlipped={flippedId === item.id}
                                             onPress={() => dispatch({ type: "TOGGLE", id: item.id })} />
                           </View>
                       )}
                       numColumns={2}
                       contentContainerStyle={styles.list}
                       columnWrapperStyle={{ justifyContent: "space-between" }}
                   />
               </View>
           </View>
       }>
       </FlatList>
    </View>

  );
};
const styles = StyleSheet.create({
    info: {

    },
    newsContainer: {
        paddingLeft: 20,
        paddingTop: 20,
       // backgroundColor: 'black',
    },
    container: {
        //paddingTop: 30,
       backgroundColor: '#f8eced',
    },
    content: {
    },
    header: {
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 30,
        //backgroundColor: '#FFFFF0',
    },
    leftJustifiedHeader: {
        paddingLeft: 5,
        paddingBottom: 10,
        paddingTop: 30,
        //backgroundColor: '#FFFFFte0',
    },
    headerText:{
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 22
    },
    comments: {
        flexGrow:1,
        padding: 10,
        backgroundColor: "#f8eced",
        marginBottom: 250,
    },
    list: {
        paddingBottom:20
    },
    wrapper: {
        justifyContent: "space-between"
    },
    dropdownMenu: {
        position: "absolute",
        top: 70, // ekranın üstünden ne kadar aşağıda
        left: 15, // ekranın solundan konum
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 999,
    },
    dropdownItem: {
        paddingVertical: 10,
    },
    warningBox: {
        backgroundColor: "#fff3cd",
        borderColor: "#ffeeba",
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 8,
    },

    warningText: {
        color: "#856404",
        fontWeight: "bold",
    },

});

export default HomeScreen;
