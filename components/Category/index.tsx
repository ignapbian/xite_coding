import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { data, genre, song, Data } from '../../types'

export type CategoryProps={
    data:any;
}

const Category = (props:CategoryProps)=> {
    useEffect(() => {
        console.log("category", props)
    }, [])
    
        return (
            <View style={{borderColor:'red',borderWidth:2}}>
                <Text style={{color:'red'}}>{props.data.item.category_name}</Text>
                <FlatList
                    data={props.data.item.videos}
                    renderItem={({item})=>(<Text style={{color:'white'}}>{item.title}</Text>)}
                />
            </View>
        )
    }
export default Category;
