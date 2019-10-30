import React from 'react'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
function Button({width,onButtonPress,isLoading,text}) {
    const handleButtonPress = () => {
        if(isLoading){
            alert('kalem woy')
        }else{
            onButtonPress()
        }
    }
    return (
        <TouchableOpacity style={[styles.button,{width}]} onPress={handleButtonPress}>
            {isLoading ? 
            <ActivityIndicator size="small" color="white" />
                : 
             <Text style={styles.buttonText}>{text}</Text>
            }
            
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    button : {
        backgroundColor:'#38ef7d',
        justifyContent:'center',
        alignItems:'center',
        padding : 10,
        borderRadius:3,
        marginTop:20,
    },
    buttonText : {
        color : 'whitesmoke'
    }
})