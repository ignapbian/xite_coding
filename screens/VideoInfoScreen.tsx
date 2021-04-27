import React from 'react'
import { View,StyleSheet, Image,Text } from 'react-native'
import { useRoute } from '@react-navigation/native';

const VideoInfoScreen = () =>{
    const route = useRoute();
    const props = route.params.data;
    console.log(props);
        return (
            <View style={style.container}>
                <Image style={style.imageSong} source={{uri: props.image_url}}/>
                    <View style={style.songTextContainer}>
                        <Text style={style.title}>{props.title}</Text>
                        <Text style={style.artist}>Artist: {props.artist}</Text>
                        <Text style={style.release}>Release: {props.release_year}</Text>
                    </View>
            </View>
        )
}
export default VideoInfoScreen;

const style = StyleSheet.create({
    container:{
        width:'100%',
        height:292,
        justifyContent:'center',
        alignItems:'center',
    },
    imageSong:{
        width:'100%',
        height:292,
        borderColor:'#14213D',
        borderWidth:4,
        marginBottom:10,
        marginTop:500
    },
    songTextContainer:{
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'center',
        padding:10
        
    },
    title:{
        color:'#FFFFFF',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20
    },
    artist:{
        color:'#E5E5E5',
        fontSize:20,
        marginBottom:20
    },
    release:{
        color:'#FCA311',
        fontSize:20,
    }




})