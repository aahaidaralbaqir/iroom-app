import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setCurUser } from '../../config/redux/action'
import { View, TextInput, Text,ActivityIndicator,TouchableOpacity,ToastAndroid ,StatusBar} from 'react-native'
import { api } from '../../config/api'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './style'
import Bar from '../../components/Bar'
function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(true)
  const [isLoading,setIsLoading] = useState(false)
  
  const dispatch = useDispatch()

  const checkIsError = () => {
    if (username.length >= 5 && password.length >= 5) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  const handleLoginClick = () => {
    if(username !== "" && password !== ""){
      setIsLoading(true)
      api
      .post('/login', {username, password})
      .then(res => {
        
        let data = {
          token: res.data.access_token,
          username: res.data.username,
        }

        dispatch(setCurUser(data))
        AsyncStorage.setItem('userData',JSON.stringify(data))
        setIsLoading(false)
        props.navigation.navigate('Checkin');
      })
      .catch(err => {
        setIsLoading(false)
        alert(JSON.stringify(err,null,2))
      })
    }else{
      ToastAndroid.showWithGravityAndOffset(
        'Username and password cannot be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }

  };

  useEffect(() => {
    checkIsError();
  }, [username, password]);


  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Bar />
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#11998e', '#38ef7d']}
          style={styles.lead}>
          <View style={styles.logo}>
            <Icon name="home" style={styles.logoIcon} />
          </View>
          <Text
            style={{
              fontSize: 40,
              justifyContent: 'center',
              alignSelf: 'center',
              top: 70,
              color: 'whitesmoke',
            }}>
            iRoom
          </Text>
        </LinearGradient>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <TextInput
               style={styles.formInput}
               placeholder="Username"
               value={username}
               onChangeText={text => setUsername(text)}
            />
            <Icon
              name="user"
              style={styles.formIcon}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
            <Icon
              name="key"
              style={styles.formIcon}
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity onPress={handleLoginClick}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#11998e', '#38ef7d']}
              style={styles.formButton}>
                {
                  isLoading ?
                   <ActivityIndicator size="small" color="white" />
                  :
                  <Text style={styles.formButtonText}>LOGIN</Text>
                }
            </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


export default Login

