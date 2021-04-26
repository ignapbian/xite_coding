import * as React from 'react';
import { StyleSheet, Dimensions,Image, FlatList, VirtualizedList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import Category from '../components/Category';
import { Data, song, genre } from '../types';

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
  }

  const getData=()=>{
      dataApi.getListData((res)=>{
        var listImages =[]
        listImages = res.videos.map(function(index: song){
          return index.image_url;
        })
        setimages(listImages)
        setloadImage(true);
        listCategories(res);
    },(err)=>{/** error handling */console.log(err)})
  }
  useEffect(() => {
      getData();
      //console.log("genres ",genres )
      //console.log("videos ",videos )
     // console.log("dataJson ",dataJson )
  }, [])
  
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
              <Image style={styles.images} source={{uri: item}}/>
                <AntDesign style={{position:'absolute'}} name="infocirlceo" size={50} color="white" />
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
