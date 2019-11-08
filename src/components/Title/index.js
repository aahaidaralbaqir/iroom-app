import React from 'react'
import {
    Text,
    StyleSheet
} from 'react-native'

export default function Title({value}) {
    return (
        <Text style={styles.text}>{ value ? value : 'TITLE HERE'}</Text>
    )
}

const styles = StyleSheet.create({
    text : {
        alignSelf:'center',
        color:'white',
        fontWeight:'bold',
        fontSize:25,
        marginTop:13,
        fontFamily : 'Poppins-Regular'
    }
})