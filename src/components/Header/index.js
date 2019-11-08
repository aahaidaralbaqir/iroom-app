import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

function Header(props) {
    return (
        <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#11998e', '#38ef7d']}
            style={[styles.header]}
        >
         {props.children}
        </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({
    header : {
        height : 60,
    }
})
