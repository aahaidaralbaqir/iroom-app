import { StyleSheet } from 'react-native'

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

  export default styles