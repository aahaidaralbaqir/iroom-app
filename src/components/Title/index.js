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
        color:'whitesmoke',
        fontWeight:'bold',
        fontSize:20,
        marginTop:20
    }
})