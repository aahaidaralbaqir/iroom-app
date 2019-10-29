import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {setCurUser} from '../../config/redux/action'
import {View, StyleSheet, TextInput, Text,ActivityIndicator,TouchableOpacity} from 'react-native'
import {api} from '../../config/api'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign'

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
  };

  const handleLoginClick = () => {
    setIsLoading(true)
    api
      .post('/login', {username, password})
      .then(res => {
        let data = {
          token: res.data.access_token,
          username: res.data.username,
        };
        dispatch(setCurUser(data))
        setIsLoading(false)
        props.navigation.navigate('Checkin');
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err);
      });
  };

  useEffect(() => {
    checkIsError();
  }, [username, password]);


  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  lead: {
    flex: 1.9,
    backgroundColor: 'blue',
    borderBottomLeftRadius: 100,
  },
  logo: {
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    top: 60,
  },
  logoIcon: {
    fontSize: 50,
    color: 'whitesmoke',
  },
  form: {
    flex: 2,
    paddingVertical: 50,
  },
  formGroup: {
    marginHorizontal: 30,
    position: 'relative',
    marginVertical: 10,
  },
  formInput: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingLeft: 40,
  },
  formIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    fontSize: 15,
    color: 'silver',
    fontWeight: 'bold',
  },
  formButton: {
    marginTop: 20,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 100,
  },
  formButtonText: {
    color: 'white',
  },
});
