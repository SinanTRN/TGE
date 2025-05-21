import React from 'react';
import {View, StyleSheet, FlatList, Text, ScrollView} from 'react-native';
import UserInfo from "../components/UserInfo";
import NewsItem from "../components/NewsItem";
import Slider from "../components/Slider";
import CommentsInfo from "../components/CommentsInfo";

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
    const [flippedId, dispatch] = React.useReducer(reducer, null);
    return (
    <View style={styles.container}>
        <View>
        </View>
      <View style={styles.info}>
          <UserInfo
              name="SinanTrN"
              email="sinan@example.com"
              profileImage="deneme"/>
      </View>
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
    }
});

export default HomeScreen;
