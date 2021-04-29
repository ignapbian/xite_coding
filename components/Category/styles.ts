import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    categoryContainer:{
        margin:10,
        width:'100%',
        height:310,
        padding:10,
        
    },
    textCategory:{
        fontSize:24,
        color:'#FCA311',
        fontWeight:'bold',
        marginRight:20,
        flex:1
        
    },
    textShowMore:{
        fontSize:16,
        color:'#E5E5E5',
        fontWeight:'bold',
        marginRight:20,
    },
    textNoVideos:{
        fontSize:24,
        color:'#E5E5E5',
        fontWeight:'bold',
    },
    textContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:10
    }
    
})
export default styles;