import React from 'react'
import{
  View,
  TextInput,
  Text,
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/Header'
import { fetchDataCostumer } from '../../config/redux/action'
import Title from '../../components/Title'
import Icon from 'react-native-vector-icons/AntDesign'
import Listuser from '../../components/Listuser'
import CostumModal from '../../components/Modal'
import { useModal } from '../../hooks/'
import Button from '../../components/Button'
import { api , headerOptions } from '../../config/api'

function Costumer() {
  const [isOpen,toggle] = useModal()
  const [name,setName] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [costumerId,setCostumerId] = React.useState(null)
  const [identity,setIdentity] = React.useState('')
  const [isEdit,setIsEdit] = React.useState(false)
  const [isLoading,setIsLoading] = React.useState(false)

  const currUser = useSelector(state => state.auth.currUser)
  const costumer = useSelector(state => state.costumer.costumer)
  const dispatch = useDispatch()


  const handleSaveCostumer = () => {
    setIsLoading(true)
    let data = {
      name : name,
      identity_number : identity,
      phone_number : phone,
      image : ''
    }
    api
    .post('/costumers',data,headerOptions(currUser.token))
    .then(result => {
        blank()
        let newCostumer = [...costumer,data]
        dispatch({type : 'SET_COSTUMER' ,  payload : newCostumer})
    })
    .catch(error => {
      alert(JSON.stringify(error,null,2))
    })
  }

  const handleEditCostumer = () => {
    setIsLoading(true)
    let data = {
      name : name,
      identity_number : identity,
      phone_number : phone,
      image : ''
    }
    api
    .put(`/costumers/${costumerId}`,data,headerOptions(currUser.token))
    .then(result => {
        blank()
        dispatch(fetchDataCostumer(currUser.token))
        setIsLoading(false)
      })
        .catch(error => {
            console.log(err)
      })
    }

  const handleCostumer = () => {
    if(isEdit){
      handleEditCostumer()
    }else{
      handleSaveCostumer()
    }
  }

  const blank =  () => {
    setIsLoading(false)
    setIsEdit(false)
    setName('')
    setPhone('')
    setIdentity(null)
    toggle()
  }

  const fill = (id,name,phone_number,identity_number) => {
    setIsEdit(true)
    setCostumerId(id)
    setName(name)
    setPhone(phone_number)
    setIdentity(identity_number)
    toggle()
  } 

  React.useEffect(() => {
    dispatch(fetchDataCostumer(currUser.token))
  },[])


  return (     
    <View style={{flex:1}}>
       <CostumModal 
          open={isOpen}
          swipe={toggle}
          height={300}
        >
          <View>
            <Text
              style={{
                fontSize:18,
                marginBottom:10,
                marginTop:2
              }}
            >
              {isEdit ? 'EDIT COSTUMER' : 'ADD COSTUMER'}
            </Text>
            <TextInput 
              style={{
                backgroundColor:'#f4f4f4',
                padding : 6,
                marginBottom:10
              }}
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput 
              style={{
                backgroundColor:'#f4f4f4',
                padding : 6,
                marginBottom:10
              }}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            <TextInput 
              style={{
                backgroundColor:'#f4f4f4',
                padding : 6
              }}
              value={identity}
              onChangeText={text => setIdentity(text)}
            />
            <Button 
              text={isEdit ? 'SAVE CHANGES' : 'SAVE'}
              width="100%" 
              isLoading={isLoading}  
              onButtonPress={handleCostumer}
            />
          </View>
        </CostumModal> 
        <View style={{flex:1}}>
          <Header>
            <Title value="COSTUMER" />
            <Icon 
              name="plus" 
              style={{position:'absolute',fontSize:30,color:'white',right:10,top:16}} 
              onPress={() => toggle() } 
            />
          </Header>
        </View>
        <View style={{flex:9,paddingTop:10}}>
            <FlatList
              data={costumer}
              renderItem={({item,index}) => (
                <Listuser key={index} {...item} onPressListUser={fill} />
              )}
              keyExtractor={(item,index) => index.toString()}
            />
        </View>
    </View>
  )
}

export default Costumer