import React from 'react'
import { View,Text,Image } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCustomTabsSupportingBrowsersAsync } from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

export type SongProps={
    data:any;
}

const Song = (props:SongProps) =>{
    const navigation = useNavigation();
    const goToInfo = ()=>{
        navigation.navigate('VideoInfoScreen',{data:props.data.item})
    }
        return (
            <TouchableOpacity onPress={goToInfo} style={styles.songContainer}>
                 <Image style={styles.imageSong} source={{uri: props.data.item.image_url}}/>
                 <View style={styles.songTextContainer}>
                    <Text style={styles.title}>{props.data.item.title}</Text>
                    <Text style={styles.artist}>{props.data.item.artist}</Text>
                 </View>
            </TouchableOpacity>
        )
}
export default Song;