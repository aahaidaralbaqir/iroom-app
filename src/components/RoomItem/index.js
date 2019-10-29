import React from 'react'
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native'
function RoomItem({name,navigation,is_booked,id}) {
    const backgroundIsBooked = is_booked == true ? 'silver' : 'blue' 
    return (
        <TouchableOpacity style={{width:'30%',backgroundColor:backgroundIsBooked,height:100,borderRadius:4,marginRight:10,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate('EditRoom' , {name : name,id:id})}>
        <View >
          <Text style={{color:'white',fontSize:20}}>{name}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default RoomItem