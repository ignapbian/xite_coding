import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    songContainer:{
        width:300,
        height:300,
        flexWrap: 'wrap',
        marginLeft:10
    },
    imageSong:{
        width:'100%',
        height:200,
        borderRadius:15
    },
    songTextContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    title:{
        fontSize:16,
        color:'white'
    },
    artist:{
        fontSize:14,
        color:'grey'
    }
})
export default styles;