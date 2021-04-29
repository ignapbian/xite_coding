import * as React from 'react';
import { StyleSheet, Dimensions,Image, FlatList, VirtualizedList, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import Category from '../components/Category';
import { Data, song, genre } from '../types';
import { useNavigation } from '@react-navigation/native';
import useCachedResources from '../hooks/useCachedResources';

const HomeScreen = () => {
  /** initialize states */
  const [images, setimages] = useState([]);
  const [data, setData] = useState([]);
  const [loadImage, setloadImage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
    setloadImage(true);
}, [])

  const listCategories=(res:any)=>{
    var array = [];
    for (let j = 0; j < res.genres.length; j++) {
      var listVideos = res.videos.filter((video: { genre_id: any; })=>video.genre_id == res.genres[j].id);
      array.push({"category_name": res.genres[j].name, "videos": listVideos})
      }
      setData(array);
  }

  const getData=()=>{
    /** get Data API */
      dataApi.getListData((res)=>{
        setimages(res.videos)
        listCategories(res);
    },(err)=>{/** error handling */console.log("Error: ",err)})
  }
  
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
          top:180
        }}
        paginationStyleItem={{
          height:10,
          width:10,
        }}
        renderItem={({ item }) => (
          <View style={styles.imagesContainer}>
              <Image style={styles.images} source={{uri: item.image_url}}/>
                <AntDesign onPress={()=>{goToInfo(item)}} style={{position:'absolute'}} name="infocirlceo" size={50} color="#FCA311" />
          </View>
            
        )}
      />
        <FlatList
          data={data}
        renderItem={(item)=><Category data={item}/>}
        showsVerticalScrollIndicator={false}
      />
      </>
      : <View style={[styles.containerActivity, styles.horizontal]}>
          <ActivityIndicator size="large" color="#E5E5E5" />
        </View>}  
    </ScrollView>
  );
}
export default HomeScreen;

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  containerActivity: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: { 
    backgroundColor:'#000000',
    
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
