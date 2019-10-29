import React,{ useEffect,useState } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'

import LogoScreen from '../../assets/images/logo_Screen.jpg'
import {
  PRIMARY_COLOR
} from '../../config/constant'

import AsyncStorage from '@react-native-community/async-storage';


function Loading({navigation}){
  async function checkIsLogin (){
      const userData = await AsyncStorage.getItem("userData")
      if(userData == null) {
        navigation.navigate('Login')
      }else{
        navigation.navigate('Checkin')
      }
  }
  useEffect(() => {
      checkIsLogin()
  },[])

  return (
    <View style={{flex:1,backgroundColor:PRIMARY_COLOR,justifyContent:'center',alignItems:'center'}}>
      <Text>Check is login</Text>
    </View>
  )
}

export default Loading;
