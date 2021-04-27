import * as React from 'react';
import { StyleSheet, FlatList,TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import { song } from '../types';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () =>{
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [genres, setgenres] = useState([]);
  const [search, setsearch] = useState('')

  useEffect(() => {
    getData();
    return () => {
    }
  }, [])

  const getData=()=>{
      dataApi.getListData((res)=>{
        setfilterData(res.videos);
        setmasterData(res.videos);
        setgenres(res.genres);
    },(err)=>{/** error handling */console.log(err)})
  }
  const getGenre = (item)=>{
    return genres.map(function(genre){
      if(item.genre_id == genre.id){
        return genre.name;
      }
    })
  }
  const navigation = useNavigation();
    const goToInfo = (item:any)=>{
        navigation.navigate('VideoInfoScreen',{data:item})
    }
    const searchFilter = (text:string) =>{
      if(text){
        const newData = masterData.filter((item:song)=>{
          const itemData = item.title ? item.title.toUpperCase():''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilterData(newData);
        setsearch(text);
      }else{
        setfilterData(masterData);
        setsearch(text);
      }
    }

  const ItemView =({item}) =>{
    return(
      <TouchableOpacity onPress={()=>goToInfo(item)} style={styles.songContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        <View style={styles.genreYear}>
          <Text style={styles.release}>{item.release_year}</Text>
          <Text style={styles.genre}>{getGenre(item)}</Text>
          
        </View>
      </TouchableOpacity>
      
    )
  }


  
  return (

    <View style={styles.container}>
      {/** search by title or artist */}
      <TextInput 
        style={styles.textInput}
        value={search}
        placeholder="Search Here"
        underlineColorAndroid='transparent'
        onChangeText={((text) => searchFilter(text))}
        
      />
      {/** filter genre */}

      {/** filter year */}

      {/** results */}
      <FlatList 
        data={filterData}
        keyExtractor={(item:song) => item.id}
        renderItem={ItemView}
      />
    </View>
  );
}
export default SearchScreen;
const styles = StyleSheet.create({
  container: {
      width:'100%',
      height:'auto'
  },
  songContainer:{
    borderColor:'#14213D',
    borderWidth:5,
    padding:10,
    marginBottom:20
  },
  titleArtist:{
    flexDirection:'row'
  },
  title:{
    fontSize:18,
    color:'#FFFFFF',
    marginRight:20
  },
  artist:{
    fontSize:14,
    color:'#E5E5E5'
  },
  genreYear:{
    flexDirection:'row'
  },
  genre:{
    fontSize:18,
    color:'#FFFFFF',
  },
  release:{
    fontSize:16,
    color:'#E5E5E5',
    flex:1
  },
  textInput:{
    height:50,
    borderWidth:2,
    paddingLeft:20,
    margin:5,
    borderColor:'#FCA311',
    backgroundColor:'#FFFFFF'
  }



});
