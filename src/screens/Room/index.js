import React from 'react'
import {
    View
} from 'react-native'

import { connect } from 'react-redux'
import { fetchDataRoom } from '../../config/redux/action'
import Header from '../../components/Header'
import RoomItem from '../../components/RoomItem'


function Room(props) {
    const {token} = props.currUser
    
    React.useEffect(() => {
      props.fetchRoom(token)
    },[])

    return (
        <View style={{position:'relative'}}>
        <Header />
        <View style={{flex:1,flexDirection:'row'}}>
          {props.room.map((item,index) => {
              return <RoomItem key={index}  {...item} navigation={props.navigation} />
          })}
        </View>

        </View>
    )
}

const mapStateToProps = state => {
    return {
        currUser : state.auth.currUser,
        room : state.room.room
    }
}
const mapDispatchToProps = dispatch => {
  return {
       fetchRoom : (token) => dispatch(fetchDataRoom(token))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Room)