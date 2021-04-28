import * as React from 'react';
import { StyleSheet, FlatList,TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import { song } from '../types';
import { useNavigation } from '@react-navigation/native';
import Select2 from "react-native-select-two";
import RNPickerSelect from 'react-native-picker-select';

const SearchScreen = () =>{
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [genres, setgenres] = useState([]);
  const [search, setsearch] = useState('');
  const [year, setyear] = useState([]);
  const [filterYear, setfilterYear] = useState([]);
  const [filterGenre, setfilterGenre] = useState([]);

  

  useEffect(() => {
    getData();
  }, [])

  const onlyUnique=(value, index, self) =>{ 
    return self.indexOf(value) === index;
}
const extractYears = (res)=>{
    var years = res.videos.map(item=>item.release_year);
    var unique = years.filter( onlyUnique ).sort(); 
    var array= [];
    for (let i = 0; i < unique.length; i++) {
      array.push({"id":unique[i].toString(),"name":unique[i].toString()})
    }
    setyear(array.reverse());
}

  const getData=()=>{
      dataApi.getListData((res)=>{
        setfilterData(res.videos);
        setmasterData(res.videos);
        setgenres(res.genres);
        extractYears(res);
    },(err)=>{/** error handling */console.log(err)})
  }
  const getGenre = (item)=>{
    return genres.map(function(genre){
      if(item.genre_id == genre.id){
        return genre.name;
      }
    })
  }

  const searchFilter = (text:string) =>{
    if(text){
      const newData = masterData.filter(function(item:song){
        const itemTitleData = item.title ? item.title.toString().toUpperCase():''.toUpperCase();
        const itemArtistData = item.artist ? item.artist.toString().toUpperCase():''.toUpperCase();
        const textData = text.toString().toUpperCase();
        return itemTitleData.indexOf(textData) > -1 || itemArtistData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setsearch(text);
    }else{
      setfilterData(masterData);
      setsearch(text);
    }
  }

  const selectFilter = (data) =>{
      
    console.log("genero",filterGenre);
    console.log("año", filterYear);
    if(data.length != 0){
      const dataFilter = filterData.length == masterData.length ? masterData : filterData;
      const newData = dataFilter.filter(function(item:song){
        const itemGenreData = item.genre_id?item.genre_id:'';
        const itemYearData = item.release_year?item.release_year:'';
        const selectData = data.map(String);
        return selectData.includes(itemGenreData.toString()) == true || 
        selectData.includes(itemYearData.toString()) == true;
      });
      setfilterData(newData);
    }else{
      setfilterData(masterData);
    }
  }

  const selectFilterYear = (data) =>{
    if(data.length != 0){
      const newData = masterData.filter(function(item:song){
        const itemYeatData = item.release_year?item.release_year:'';
        return data.includes(itemGenreData.toString()) == true;
      });
      setfilterData(newData);
    }else{
      setfilterData(masterData);
    }
  }

  const navigation = useNavigation();
    const goToInfo = (item:any)=>{
        navigation.navigate('VideoInfoScreen',{data:item})
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
        placeholder="Search Here title or artist"
        placeholderTextColor="#000000"
        underlineColorAndroid='transparent'
        onChangeText={(text) => searchFilter(text)}
      />
      {/** filter genre */}
      <View style={{ flexDirection:'row' }}>
        <Select2 
            style={{ borderRadius: 5,width:'50%' }}
            colorTheme="#FCA311"
            popupTitle="Select Genre"
            title="Select Genre"
            data={genres}
            searchPlaceHolderText="Search Genre"
            selectButtonText="Apply"
            cancelButtonText="Cancel"
            onSelect={(dataGenre) => {
              setfilterGenre(dataGenre);
              selectFilter(dataGenre);
            }}
            onRemoveItem={dataGenre => selectFilter(dataGenre)}
        />
        {/** filter year */}
        <Select2 
            style={{ borderRadius: 5,width:'50%' }}
            isSelectSingle
            colorTheme="#FCA311"
            popupTitle="Select Year"
            title="Select Year"
            data={year}
            searchPlaceHolderText="Search Year"
            selectButtonText="Apply"
            cancelButtonText="Cancel"
            onSelect={(dataYear) =>{
              setfilterYear(dataYear);
              selectFilter(dataYear);
            }}
            onRemoveItem={dataYear => selectFilter(dataYear)}
        />
      </View>
      
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
