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
                    numColumns={2}
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
        alignItems:'center',
        backgroundColor:'#000000',
        
    },
    songContainer:{
        width:190,
        height:'auto',
        flexWrap: 'wrap',
        borderColor:'#000000',
        borderWidth:1,
        marginBottom:10,
        marginTop:20,
        
    },
    imageSong:{
        width:'100%',
        height:100,
    },
    songTextContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#14213D',
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