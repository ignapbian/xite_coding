import * as React from 'react';
import { StyleSheet, FlatList,TouchableOpacity, TextInput, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState, useEffect } from 'react';
import dataApi from '../services/dataApi';
import { song } from '../types';
import { useNavigation } from '@react-navigation/native';
import Select2 from "react-native-select-two";
import RNPickerSelect from 'react-native-picker-select';

const SearchScreen = () =>{
   /** initialize states */
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [genres, setgenres] = useState([]);
  const [search, setsearch] = useState('');
  const [year, setyear] = useState([]);
  const [filterYear, setfilterYear] = useState([]);
  const [filterGenre, setfilterGenre] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, [])

  const getData=()=>{
    dataApi.getListData((res)=>{
      setfilterData(res.videos);
      setmasterData(res.videos);
      setgenres(res.genres);
      extractYears(res);
    },(err)=>{/** error handling */console.log("Error: ",err)})
  }

  const extractYears = (res)=>{
    /** Extract all years and delete the duplicate years */
    var years = res.videos.map(item=>item.release_year);
    var unique = years.filter( onlyUnique ).sort(); 
    var array= [];
      for (let i = 0; i < unique.length; i++) {
        array.push({"id":unique[i].toString(),"name":unique[i].toString()})
      }
      setyear(array.reverse());
  }

  const onlyUnique=(value, index, self) =>{ 
    return self.indexOf(value) === index;
  }

  const searchFilter = (text:string) =>{
     /** Function Search title or artist in textInput */
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

  const selectFilter = () =>{
    /** Function select genre or/and year in picker */
      if(filterGenre.length != 0 || filterYear.length != 0){
        const newData = masterData.filter(function(item:song){
          const itemGenreData = item.genre_id?item.genre_id:'';
          const itemYearData = item.release_year?item.release_year:'';
          const selectFilterGenre = filterGenre.map(String);
          const selectFilterYear = filterYear.map(String);
          if(filterGenre.length != 0 && filterYear.length == 0){
            return selectFilterGenre.includes(itemGenreData.toString()) == true
          }else if(filterGenre.length == 0 && filterYear.length != 0){
            return selectFilterYear.includes(itemYearData.toString()) == true
          }else if (filterGenre.length != 0 && filterYear.length != 0){
            return selectFilterGenre.includes(itemGenreData.toString()) == true &&
            selectFilterYear.includes(itemYearData.toString()) == true
          }
        });
        setfilterData(newData);
      }else{
        setfilterData(masterData);
      }
  }
  
  const goToInfo = (item:any)=>{
      navigation.navigate('VideoInfoScreen',{data:item})
  }

  const getGenre = (item)=>{
    return genres.map(function(genre){
      if(item.genre_id == genre.id){
        return genre.name;
      }
    })
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
        placeholder="Search title or artist"
        placeholderTextColor="#000000"
        underlineColorAndroid='transparent'
        onChangeText={(text) => searchFilter(text)}
      />
      {/** filter genre */}
      <View style={{ flexDirection:'row' }}>
        <Select2 
            style={{ borderRadius: 5,width:'50%', backgroundColor:'#FFFFFF',borderColor:'#FCA311' }}
            colorTheme="#FCA311"
            popupTitle="Select Genre"
            title="Select Genre"
            data={genres}
            selectedTitleStyle={{}}
            searchPlaceHolderText="Search Genre"
            selectButtonText="Apply"
            cancelButtonText="Cancel"
            listEmptyTitle="No results"
            onSelect={dataGenre => {
              setfilterGenre(dataGenre);
            }}
            onRemoveItem={data=>{
              setfilterGenre(data);
            }}
        />
        {/** filter year */}
        <Select2 
            style={{ borderRadius: 5,width:'50%', backgroundColor:'#FFFFFF',borderColor:'#FCA311' }}
            colorTheme="#FCA311"
            popupTitle="Select Year"
            title="Select Year"
            data={year}
            searchPlaceHolderText="Search Year"
            selectButtonText="Apply"
            cancelButtonText="Cancel"
            listEmptyTitle="No results"
            onSelect={data =>{
              setfilterYear(data);
            }}
            onRemoveItem={data=>{
              setfilterYear(data);
            }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={selectFilter}>
        <Text style={styles.textButton}>Apply filters</Text>
      </TouchableOpacity>
      {/** results */}
      <FlatList 
        data={filterData}
        keyExtractor={(item:song) => item.id}
        renderItem={ItemView}
        style={styles.listSong}
      />
    </View>
  );
}
export default SearchScreen;
const styles = StyleSheet.create({
  container: {
      width:'100%',
      height:'auto',
      padding:10
  },
  listSong:{
    marginBottom:150
  },
  songContainer:{
    borderWidth:5,
    padding:10,
    marginBottom:20,
    backgroundColor:'#14213D'
  },
  titleArtist:{
    flexDirection:'row',
    
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
    flexDirection:'row',
    backgroundColor:'#14213D'
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
    borderColor:'#FCA311',
    backgroundColor:'#FFFFFF',
    marginBottom:20
  },
  button:{
    width:'100%',
    height:40,
    backgroundColor:'#FCA311',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    marginBottom:20,
    marginTop:5
  },
  textButton:{
    color:'white',
    fontWeight:'bold',
    fontSize:16
  }



});
