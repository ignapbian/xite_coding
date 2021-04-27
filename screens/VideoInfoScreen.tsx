import React from 'react'
import { View,StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native';

const VideoInfoScreen = () =>{
    const route = useRoute();
    const props = route.params.data;
    console.log(props);
        return (
            <View style={style.container}>
                
            </View>
        )
}
export default VideoInfoScreen;

const style = StyleSheet.create({
    container:{

    },


})