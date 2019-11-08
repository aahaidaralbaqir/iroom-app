import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
          height:80,
          marginHorizontal:10,
          marginVertical:10,
          flexDirection:'row'
    },
    description : {
          flex:3,
          justifyContent:'center',
          paddingLeft:10
    },
    image : {
         flex:1,
         justifyContent:'center',
         alignItems:'center',
    },
    imageBox : {
        width : 80,
        height: 80,
        borderRadius: 160 / 2,
        justifyContent : 'center',
        alignItems:'center'
    },
    imageText : {
        fontSize:20,
        color:'whitesmoke'
    }
})

export default styles