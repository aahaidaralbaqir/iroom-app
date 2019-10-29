import React from 'react'
import { 
    View,
    Text,
    StyleSheet
} from 'react-native'

function Header(props) {
    return (
        <View style={styles.header}>
            <Text>WKWKW</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({  
    header : {
        height : 50,
        backgroundColor : 'red'
    }
})