import React from 'react'
import { View,Text,Image } from 'react-native';
import styles from './styles';

export type SongProps={
    data:any;
}

const Song = (props:SongProps) =>{
        return (
            <View style={styles.songContainer}>
                 <Image style={styles.imageSong} source={{uri: props.data.item.image_url}}/>
                 <View style={styles.songTextContainer}>
                    <Text style={styles.title}>{props.data.item.title}</Text>
                    <Text style={styles.artist}>{props.data.item.artist}</Text>
                 </View>
            </View>
        )
}
export default Song;