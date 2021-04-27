import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'
import Song from '../Song'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export type CategoryProps={
    data:any;
}

const Category = (props:CategoryProps)=> {
    const navigation = useNavigation();
    const goToVideos =()=>{
        navigation.navigate('VideosScreen',{data:props.data.item.videos})
    }
    console.log(props.data.item.videos.length)
    
        return (
            <TouchableOpacity onPress={goToVideos} style={styles.categoryContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textCategory}>{props.data.item.category_name}</Text>
                </View>
                {props.data.item.videos.length == 0?
                    <Text style={styles.textNoVideos}>No videos available</Text>
                :
                    <FlatList
                        data={props.data.item.videos.slice(0,5)}
                        renderItem={(item)=><Song data={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </TouchableOpacity>
        )
    }
export default Category;
