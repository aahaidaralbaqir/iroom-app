import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { fetchRoomBooked } from '../../config/redux/action'
import { connect } from 'react-redux'

function RoomItemIsBooked(props) {
    function RoomBooked() {
        return (
            <TouchableOpacity style={{width:'30%',backgroundColor:'silver',height:100,borderRadius:4,marginRight:10,alignItems:'center',justifyContent:'center'}} onPress={() => props.navigation.navigate('Checkout', {order_id : props.order_id,name : props.name , costumer_id : props.costumer_id,duration : props.duration,created_at : props.created_at})}>
            <View >
            <Text style={{color:'white',fontSize:20}}>{props.name}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    function RoomNotBooked(props) {
        return (
            <TouchableOpacity style={{width:'30%',backgroundColor:'blue',height:100,borderRadius:4,marginRight:10,alignItems:'center',justifyContent:'center'}} onPress={() => props.navigation.navigate('AddCheckin', {id : props.id,name:props.name})}>
            <View >
            <Text style={{color:'white',fontSize:20}}>{props.name}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    if(props.is_booked){
        return <RoomBooked {...props} />
    }else{
        return <RoomNotBooked {...props} />
    }
}

function Checkin(props) {
    let { token } = props.currUser
    React.useEffect(() => {
        props.fetchBooked(token)
    },[])

    return (
        <View style={{padding:20,position:'relative'}}>
            <Text style={{fontSize:30,marginBottom:10}}>Booked Room</Text>
            <Text style={{fontSize:19,marginBottom:10,color:'#666'}}>Lorem ipsum dolor sit atmet</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('AddCheckin')} style={{position:'absolute',right:20,top:20,}}>
            <View>
            <Text style={{fontSize:17,marginTop:10}}>Reservation</Text>
            </View>
            </TouchableOpacity>
            
            <View style={{flex:1,flexDirection:'row'}}>
               {props.room.map((item,index) => {
                 return <RoomItemIsBooked key={index} navigation={props.navigation}  {...item} />
               })}
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        currUser : state.auth.currUser,
        room : state.room.roomIsBooked
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooked : (token) => dispatch(fetchRoomBooked(token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Checkin)