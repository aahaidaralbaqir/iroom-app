import React from 'react'
import {
    View,
    FlatList,
    Text,
    TextInput,
    Picker,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import Loading from '../Loading'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Box from '../../components/Box'
import CostumModal from '../../components/Modal'
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/AntDesign'
import { fetchRoomBooked,fetchDataCostumer } from '../../config/redux/action'
import { useDispatch,useSelector } from 'react-redux'
import { useModal } from '../../hooks'
import {api,headerOptions} from '../../config/api'
import moment from 'moment'

function Checkin(props) {
    const [isOpen,toggle] = useModal()

    const dispatch = useDispatch()
    const currUser  = useSelector(state => state.auth.currUser)
    const checkin  = useSelector(state => state.room)
    const costumer  = useSelector(state => state.costumer)


    const [roomName,setRoomName] = React.useState('')
    const [roomId,setRoomId] = React.useState(null)
    const [orderId,setOrderId] = React.useState(null)
    const [duration,setDuration] = React.useState(0)
    const [costumerId,setCostumerId]  = React.useState(0)
    const [isEdit,setIsEdit] = React.useState(false)
    const [isLoading,setIsLoading] = React.useState(false)

    const room = useSelector(state => state.room.room)


    const fill = (id,name,order_id,duration) => {
        setRoomName(name)
        setRoomId(id)
        setOrderId(order_id)
        setDuration(duration)
        toggle()
    }



    const handleBoxClick = (id,name,button,is_booked,order_id,costumer_id,duration,created_at) => {
        if(is_booked){
            setIsEdit(true)
            fill(id,name,order_id,duration)
        }else{
            setIsEdit(false)
            fill(id,name,order_id,duration)
        }
    }

    const handleAddCheckin = () => {
        setIsLoading(true)
        let data = {
            costumer_id : costumerId,
            room_id : roomId,
            is_booked : true,
            is_done : false,
            duration : duration,
            order_end_time : Date.now()
        }
        api
         .post('/checkin',data,headerOptions(currUser.token))
         .then(result => {
            dispatch(fetchRoomBooked(currUser.token))
            setIsLoading(false)
            toggle()
         })
         .catch(error => {
            alert('reservation failed')
         })
    }

    const handleUpdateCheckin = (id) => {
      setIsLoading(true)
      api
       .put(`/orders/${id}`,headerOptions(currUser.token))
       .then(result => {
         setIsLoading(false)
         dispatch(fetchRoomBooked(currUser.token))
       })
       .catch(error => alert(JSON.stringify(error,null,2)))
    }

    const handleCheckin = () => {
        if(isEdit){
          handleUpdateCheckin(orderId)
        }else{
            handleAddCheckin()
        }
    }

    const autoCheckout = (active,order_id,order_end_time) => {
      if(active){
        let counter = 0
        let lefTime = moment.duration(moment(order_end_time).diff(moment())).asSeconds() / 60
        let diff = Math.round(lefTime)
        let toSecond = diff * 60
          setInterval(() => {
            counter++
            if(toSecond - counter === 0){
              handleUpdateCheckin(order_id)
             }
          },1000)
      }
    }

    const handleNavigatoToCostumer = () => {
      props.navigation.navigate('Costumer')
      toggle()
    }

    React.useEffect(() => {
        dispatch(fetchRoomBooked(currUser.token))
        dispatch(fetchDataCostumer(currUser.token))
    },[room])

    return (
        <View style={{flex:1}}>
            <Header>
                <Title value="ALL CHECKIN" />
            </Header>
            {checkin.isLoading ?
                <Loading /> :
                null
            }
            <FlatList
               data={checkin.roomIsBooked}
               style={{marginHorizontal:14,marginVertical:14}}
               renderItem={({item,index}) => {
                 const active = item.is_booked ? true : false
                 return  <Box key={index} {...item} active={active}  onBoxPress={handleBoxClick} handleCheckout={autoCheckout(active,item.order_id,item.order_end_time)} />
               }}
               keyExtractor={(item  ,index) => index.toString()}
               numColumns={3}
              />

              <CostumModal
                open={isOpen}
                swipe={toggle}
                height={400}
              >
                 <Text
                    style={{
                        fontSize:18,
                        marginBottom:10,
                        marginTop:2,
                        alignSelf:'center',
                        fontWeight:'bold'
                    }}
                >
                    {isEdit ? 'CHECKOUT' : 'CHECKIN'}
                </Text>
                <Text
                  style={{
                      marginTop:10
                  }}
                 >
                 Room
                 </Text>
                <TextInput
                    style={{
                        backgroundColor:'#f4f4f4',
                        padding : 6
                    }}
                    value={roomName}
                    editable={false}
                    onChangeText={text => setRoomName(text)}
                />
                <Text
                  style={{
                      marginTop:10
                  }}
                 >
                 Costumer
                 </Text>
                 <TouchableOpacity
                    onPress={handleNavigatoToCostumer}
                    style={{
                      position:'absolute',
                      right : 20,
                      top:'38%'
                  }}
                 >
                 <Text style={{
                   color : 'silver',
                   fontWeight:'bold'
                 }}
                 >
                 <Icon name="plus" />
                 Costumer</Text>
                 </TouchableOpacity>
                <Picker
                    selectedValue={costumerId}
                    style={{height: 50, width: '100%',backgroundColor:'#f4f4f4',marginTop:10}}
                    onValueChange={(itemValue, itemIndex) =>
                        setCostumerId(itemValue)
                      }
                >
                {costumer.costumer.map((item,index) => (
                    <Picker.Item label={item.name} value={item.id} />
                ))}
                </Picker>
                <Text
                  style={{
                      marginTop:10
                  }}
                 >
                 Duration
                 </Text>
                <TextInput
                    style={{
                        backgroundColor:'#f4f4f4',
                        padding : 6,
                        marginTop:10
                    }}
                    value={duration.toString()}
                    onChangeText={text => setDuration(text)}
                />
                <Button
                    text={isEdit ? 'SAVE CHANGES' : 'SAVE'}
                    width="100%"
                    isLoading={isLoading}
                    onButtonPress={handleCheckin}
                />
              </CostumModal>
        </View>
    )
}

export default Checkin
