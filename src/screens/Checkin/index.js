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
import { fetchRoomBooked,fetchDataCostumer } from '../../config/redux/action'
import { useDispatch,useSelector } from 'react-redux'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Box from '../../components/Box'
import CostumModal from '../../components/Modal'
import { useModal } from '../../hooks'
import Button from '../../components/Button'
import {api,headerOptions} from '../../config/api'
import moment from 'moment'
function Checkin() {
    const [isOpen,toggle] = useModal()

    const dispatch = useDispatch()
    const currUser  = useSelector(state => state.auth.currUser)
    const checkin  = useSelector(state => state.room.roomIsBooked)
    const costumer  = useSelector(state => state.costumer.costumer)

    const [roomName,setRoomName] = React.useState('')
    const [roomId,setRoomId] = React.useState(null)
    const [orderId,setOrderId] = React.useState(null)
    const [duration,setDuration] = React.useState(null)
    const [costumerId,setCostumerId]  = React.useState(0)
    const [isEdit,setIsEdit] = React.useState(false)
    const [isLoading,setIsLoading] = React.useState(false)
    const [count,setCount]  = React.useState(0)

    const fill = (id,name,order_id,duration) => {
        setRoomName(name)
        setRoomId(id)
        setOrderId(order_id)
        setDuration(duration)
        toggle()
    }



    const handleBoxClick = (id,name,button,is_booked,is_done,order_id,costumer_id,duration,created_at) => {
        if(is_booked){
        }else{
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
         })
         .catch(error => {
            alert('reservation failed')
         })
    }

    const handleUpdateCheckin = (id) => {
      api
       .put(`/orders/${id}`,headerOptions(currUser.token))
       .then(result => {
         dispatch(fetchRoomBooked(currUser.token))
       })
       .catch(error => alert(JSON.stringify(error,null,2)))
    }

    const handleCheckin = () => {
        if(isEdit){

        }else{
            handleAddCheckin()
        }
    }

    React.useEffect(() => {
        dispatch(fetchRoomBooked(currUser.token))
        dispatch(fetchDataCostumer(currUser.token))
        setCount(1)
    },[])

    return (
        <View style={{flex:1}}>
            <Header>
                <Title value="ALL CHECKIN" />
            </Header>

            <FlatList
               data={checkin}
               style={{marginHorizontal:20,marginVertical:20}}
               renderItem={({item,index}) => {

                 const active = item.is_booked ? true : false
                 const autoCheckout = () => {
                   if(active){
                     let counter = 0
                     let lefTime = moment.duration(moment(item.order_end_time).diff(moment())).asSeconds() / 60
                     let diff = Math.round(lefTime)
                     let toSecond = diff * 60
                       setInterval(() => {
                         counter++
                         if(toSecond - counter === 0){
                           handleUpdateCheckin(item.order_id)
                         }
                       },1000)
                     }
                 }

                 return  <Box key={index} {...item} active={active} onBoxPress={handleBoxClick} handleCheckout={autoCheckout()} />
               }}
               keyExtractor={(item,index) => index.toString()}
               numColumns={3}
              />

              <CostumModal
                open={isOpen}
                swipe={toggle}
                height={280}
              >
                 <Text
                    style={{
                        fontSize:18,
                        marginBottom:10,
                        marginTop:2
                    }}
                >
                    CHECKIN
                </Text>
                <TextInput
                    style={{
                        backgroundColor:'#f4f4f4',
                        padding : 6
                    }}
                    value={roomName}
                    editable={true}
                    onChangeText={text => setRoomName(text)}
                />
                <Picker
                    selectedValue={costumerId}
                    style={{height: 50, width: '100%',backgroundColor:'#f4f4f4',marginTop:10}}
                    onValueChange={(itemValue, itemIndex) =>
                        setCostumerId(itemValue)
                      }
                >
                {costumer.map((item,index) => (
                    <Picker.Item label={item.name} value={item.id} />
                ))}
                </Picker>

                <TextInput
                    style={{
                        backgroundColor:'#f4f4f4',
                        padding : 6,
                        marginTop:10
                    }}
                    value={duration}
                    keyboardType='number-pad'
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
