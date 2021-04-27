import React from 'react'
import { View,Text,StyleSheet,Image, FlatList,TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';


const VideosScreen = () => {
    const route = useRoute();
    const props = route.params.data;
    const navigation = useNavigation();
    const goToInfo = (item:any)=>{
        navigation.navigate('VideoInfoScreen',{data:item})
    }
        return (
        <View style={styles.container}>
            {props.length == 0?
                <Text style={styles.textNoVideos}>No videos available</Text>
            :
                <FlatList
                    data={props}
                    renderItem={({item})=>(
                    <TouchableOpacity onPress={() =>goToInfo(item)} style={styles.songContainer}>
                        <Image style={styles.imageSong} source={{uri: item.image_url}}/>
                        <View style={styles.songTextContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.artist}>{item.artist}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                />
            }
        </View>
        )
}
export default VideosScreen;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'#14213D',
    },
    songContainer:{
        width:300,
        height:'auto',
        flexWrap: 'wrap',
        marginLeft:10,
        borderColor:'#14213D',
        borderWidth:1,
        marginBottom:40,
        marginTop:20
        
    },
    imageSong:{
        width:'100%',
        height:200,
    },
    songTextContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FCA311',
    },
    title:{
        fontSize:16,
        color:'#FFFFFF'
    },
    artist:{
        fontSize:14,
        color:'#E5E5E5'
    },
    textNoVideos:{
        fontSize:24,
        color:'#E5E5E5',
        fontWeight:'bold',
    },
});