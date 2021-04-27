import * as React from 'react';
import { StyleSheet, Dimensions,Image, FlatList, VirtualizedList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import Category from '../components/Category';
import { Data, song, genre } from '../types';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [images, setimages] = useState([]);
  const [data, setData] = useState([]);
  const [loadImage, setloadImage] = useState(false);

  const listCategories=(res:any)=>{
    var array = [];
    for (let j = 0; j < res.genres.length; j++) {
      var listVideos = res.videos.filter(video=>video.genre_id == res.genres[j].id);
      array.push({"category_name": res.genres[j].name, "videos": listVideos})
      }
      setData(array);
      setloadImage(true);
  }

  const getData=()=>{
      dataApi.getListData((res)=>{
        setimages(res.videos)
        listCategories(res);
    },(err)=>{/** error handling */console.log(err)})
  }
  useEffect(() => {
      getData();
      //console.log("genres ",genres )
      //console.log("videos ",videos )
     // console.log("dataJson ",dataJson )
  }, [])
  const navigation = useNavigation();
  const goToInfo = (item:any)=>{
      navigation.navigate('VideoInfoScreen',{data:item})
  }
  
  return (
    
    <ScrollView style={styles.container}>
     {/** slider component*/}
     {loadImage? <>
        <SwiperFlatList
        autoplay
        autoplayDelay={10}
        autoplayLoop
        index={0}
        showPagination
        data={images.slice(0,10)}
        autoplayLoopKeepAnimation
        paginationStyle={{
          position:'absolute',
          top:200
        }}
        paginationStyleItem={{
          height:5,
          width:5,
        }}
        renderItem={({ item }) => (
          <View style={styles.imagesContainer}>
              <Image style={styles.images} source={{uri: item.image_url}}/>
                <AntDesign onPress={()=>{goToInfo(item)}} style={{position:'absolute'}} name="infocirlceo" size={50} color="#FCA311" />
          </View>
            
        )}
      />
      </>
      : ()=>{}}  
        <FlatList
          data={data}
        renderItem={(item)=><Category data={item}/>}
        showsVerticalScrollIndicator={false}
      />

    </ScrollView>
  );
}
export default HomeScreen;

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  
  container: { 
    
  },
  images: { 
    width:'100%',
    height:'100%'
    
  },
  imagesContainer:{
    flex: 1,
    width: deviceWidth,
    height: deviceWidth/2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10
    }
});
