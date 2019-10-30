import React from 'react'
import {
    View,
    FlatList,
    Text,
    TextInput
} from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import { fetchDataRoom } from '../../config/redux/action'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Box  from '../../components/Box'
import CostumModal from '../../components/Modal'
import { useModal } from '../../hooks/'
import Button from '../../components/Button'
import { api , headerOptions } from '../../config/api'

function Room() {
  
    const [isOpen,toggle] = useModal()
    const [isLoading,setIsLoading] = React.useState(false)
    const [roomName,setRoomName] = React.useState('')
    const [roomId,setRoomId] = React.useState(null)
    const [isEdit,setIsEdit] = React.useState(false)

    const dispatch = useDispatch()

    const currUser = useSelector(state => state.auth.currUser)
    const room = useSelector(state => state.room.room)

    React.useEffect(() => {
      dispatch(fetchDataRoom(currUser.token))
    },[])


    const fill = (id,name) => {
      setIsEdit(true)
      setRoomName(name)
      setRoomId(id)
      toggle()
    } 
    
    const blank =  () => {
      setIsLoading(false)
      setIsEdit(false)
      setRoomName('')
      setRoomId(null)
      toggle()
    }

    const handleBoxClick = (id,name,button) => {
      if(typeof button === 'undefined') {
        fill(id,name)
      }else{
        blank()
      }
    }

    const handleSaveRoom = () => {
      setIsLoading(true)
      let dataAdd = {
        name : roomName
      }
      api
       .post('/rooms',dataAdd,headerOptions(currUser.token))
        .then(result => {
          let { data } = result
          let newRoom = [...room,data]
          dispatch({type : 'SET_ROOM' ,  payload : newRoom})
          blank()
        })
        .catch(err => {

        })
    }

    const handleEditRoom =  async () => {
      setIsLoading(true)
      let dataEdit = {
        name : roomName
      }
      api
       .put(`/rooms/${roomId}`,dataEdit,headerOptions(currUser.token))
        .then(result => {
          dispatch(fetchDataRoom(currUser.token))
          setIsLoading(false)
          toggle()
        })
        .catch(err => {
          alert(err)
        })
    }
    
    const handleRoom = () => {
      if(isEdit){
        handleEditRoom()
      }else{
        handleSaveRoom()
      }
    }

    return (
        <View>
        <CostumModal 
          open={isOpen}
          swipe={toggle}
          height={200}
        >
          <View>
            <Text
              style={{
                fontSize:18,
                marginBottom:10,
                marginTop:2
              }}
            >
              {isEdit ? 'EDIT ROOM' : 'ADD ROOM'}
            </Text>
            <TextInput 
              style={{
                backgroundColor:'#f4f4f4',
                padding : 6
              }}
              value={roomName}
              onChangeText={text => setRoomName(text)}
              maxLength={3}
            />
            <Button 
              text={isEdit ? 'SAVE CHANGES' : 'SAVE'}
              width="100%" 
              isLoading={isLoading}  
              onButtonPress={handleRoom}
            />
          </View>
        </CostumModal> 
          
        <Header>
          <Title value="ALL ROOM" />
        </Header>
        <View>
             <FlatList
               data={room}
               style={{marginHorizontal:20,marginVertical:20}}
               renderItem={({item}) => {
                   return <Box {...item} active={true} onBoxPress={handleBoxClick} />
                }}
               keyExtractor={(item,index) => index.toString()}
               numColumns={3}
              />
        </View>
        </View>
    )
}

export default Room