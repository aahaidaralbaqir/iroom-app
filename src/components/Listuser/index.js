import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import styles from './style'
import ImageBox from '../../components/ImageBox'
function Listuser({id,phone_number,name,identity_number,onPressListUser}) {
    React.useEffect(() => {

    },[])
    return (
      <TouchableOpacity onPress={ () => onPressListUser(id,name,phone_number,identity_number)}>
        <View style={styles.container}>
          <View style={styles.image}>
            <ImageBox name={name} />
          </View>
          <View style={styles.description}>
            <Text style={{fontSize:17,fontWeight:'bold'}}>{name.toUpperCase()}</Text>
            <Text style={{color:'#666'}}>{identity_number}</Text>
            <Text >{phone_number}</Text>
          </View>
      </View>
      </TouchableOpacity>
    )
}

export default Listuser
