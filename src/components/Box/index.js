import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
function Box({id,name,button,order_end_time,onBoxPress,active,is_booked,is_done,order_id,costumer_id,duration,created_at}) {
    let backgroundColor;
    let color;
    const dispatch = useDispatch()

    if(button){
        backgroundColor = button ? '#f1f1f1' : '#38ef7d'
    }else{
        backgroundColor = active ? '#38ef7d' : '#f1f1f1'
        color = active ? 'whitesmoke' : '#dedede'
    }

    const title = button ? <Icon name="plus" style={{fontSize:30,color:'#dedede'}} /> : name
    return (
        <TouchableOpacity onPress={() => onBoxPress(id,name,button,is_booked,order_id,costumer_id,duration,created_at)}>
            <View style={[styles.box,{backgroundColor}]}>
                <Text style={[styles.boxText,{color}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Box

const styles = StyleSheet.create({
    box : {
        width : 90,
        height : 90,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 4,
        marginVertical:10,
        marginHorizontal:10,
        elevation : 2
    },
    boxText : {
        fontSize: 20,
        color : 'whitesmoke'
    }
})
