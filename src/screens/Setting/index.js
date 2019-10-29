import React from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import { Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage';

function Setting(props) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData',(err) => {
            if (err) throw err
            props.navigation.navigate('Login')
         })
    }
    return (
        <View>
            <View style={{flexDirection:'row',height:100,marginTop:10}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View>
                    <Icon name="user" style={{fontSize:100,color:'silver'}} />
                </View>
                <View style={{flex:2,justifyContent:'center'}}>
                    <Text style={{fontSize:20}}>AHMAD HAIDAR ALBAQIR</Text>
                    <Text>ahmadhdr.22@gmail.com</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={{backgroundColor:'blue',padding:4,width:100,borderRadius:3,marginTop:10,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'whitesmoke'}}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
             </View>
        </View>
    )
}

export default Setting;