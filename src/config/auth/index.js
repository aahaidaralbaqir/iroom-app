import AsyncStorage from '@react-native-community/async-storage'

export const getUserToken = async () => {
    try {
        const data = await AsyncStorage.getItem('userData')
        return JSON.parse(data)
    }catch(err) {
        console.log(err)
    }
}

export const getData = async () => {
  try {
    const token = await getUserToken()
    return token
  } catch (e) {
    console.log(e);
  }
}
