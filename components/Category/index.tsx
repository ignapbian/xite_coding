import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'
import Song from '../Song'

export type CategoryProps={
    data:any;
}

const Category = (props:CategoryProps)=> {
    useEffect(() => {
        console.log("category", props)
    }, [])
    
        return (
            <View style={styles.categoryContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textCategory}>{props.data.item.category_name}</Text>
                    <AntDesign name="right" size={20} color="white" />
                </View>
                <FlatList
                    data={props.data.item.videos.slice(0,5)}
                    renderItem={(item)=><Song data={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }
export default Category;
