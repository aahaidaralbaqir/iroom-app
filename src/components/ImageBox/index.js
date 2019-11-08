import React from 'react'
import {View,Text} from 'react-native'
import { getRandomColor,getAcronym } from '../../helpers'
import styles from './style'
function ImageBox({name}) {

    return  (
        <View style={[styles.imageBox,{backgroundColor:'#ECECEC'}]}> 
         <Text style={[styles.imageText]}>{getAcronym(name)}</Text>
        </View>               
    )
}

export default ImageBox