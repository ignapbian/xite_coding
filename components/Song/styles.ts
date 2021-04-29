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
    },
    songTextContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    title:{
        fontSize:16,
        color:'#FFFFFF'
    },
    artist:{
        fontSize:14,
        color:'#E5E5E5'
    }
})
export default styles;