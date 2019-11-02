import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header'
import Title from '../../components/Title'
import LinearGradient from 'react-native-linear-gradient'

function Setting(props) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData',(err) => {
            if (err) throw err
            props.navigation.navigate('Login')
         })
    }
    return (
        <View>
            <Header>
              <Title value="SETTING" />
            </Header>
            <View style={{flexDirection:'row',height:100,marginTop:10}}>
            <View style={{flex:1,alignItems:'center'}}>
                  <Image source={{uri : 'https://img.icons8.com/bubbles/2x/user.png'}} style={{width:100,height:100,borderRadius:100,marginTop:20}} />
                    <Text style={{fontSize:20,marginTop:10}}>Ahmad haidar albaqir</Text>
                    <Text style={{color:'#666'}}>ahmadhdr.22@gmail.com</Text>
                    <TouchableOpacity onPress={handleLogout}>
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={['#11998e', '#38ef7d']}
                      style={{paddingHorizontal:30,paddingVertical:7,borderRadius:100,marginTop:10}}
                    >
                    <Text style={{color:'whitesmoke',fontSize:18}}>Logout</Text>
                    </LinearGradient>
                    </TouchableOpacity>
            </View>
             </View>
        </View>
    )
}

export default Setting;
