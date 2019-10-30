import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

function Listuser({id,phone_number,name,identity_number,onPressListUser}) {
    return (
      <TouchableOpacity onPress={ () => onPressListUser(id,name,phone_number,identity_number)}>
        <View style={{height:80,marginHorizontal:10,marginVertical:10,flexDirection:'row'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/images/walpaper.jpeg')} style={{width:70,height:70,borderRadius:100}} />
        </View>
        <View style={{flex:3,justifyContent:'center',paddingLeft:10}}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>{name.toUpperCase()}</Text>
          <Text style={{color:'#666'}}>{identity_number}</Text>
          <Text >{phone_number}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
}

export default Listuser