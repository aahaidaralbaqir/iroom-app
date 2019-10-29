import React from 'react'
import { Container , Header, Content,Picker,Icon ,Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api , headerOptions } from '../../config/api' 
import { connect } from 'react-redux'
import { fetchDataCostumer,fetchRoomBooked } from '../../config/redux/action'
import moment from 'moment'
function Checkout(props) {
    const paramId = props.navigation.getParam('id')
    const paramName = props.navigation.getParam('name')
    const paramCostumerId = props.navigation.getParam('costumer_id')
    const paramCreatedAt = props.navigation.getParam('created_at')
    const paramDuration = props.navigation.getParam('duration')
    const orderId = props.navigation.getParam('order_id')
    const [id,setId] = React.useState(paramId)
    const [userId,setUserId] = React.useState(paramCostumerId)
    const [name,setName] = React.useState(paramName)
    const [duration,setDuration] = React.useState(20)

    let  { token } = props.currUser

    React.useEffect(() => {
        props.fetchCostumer(token)
    },[])

    const handleCheckout = () => {
        api
         .put(`/orders/${orderId}`,headerOptions(token))
         .then(result => {
            alert('checkouted')
            props.fetchBooked(token)
            setInterval(() => {
                props.navigation.pop()
            },3000)
         })
         .catch(error => {
            alert('reservation failed')
         })
    }

    return (
        <Container>
        <Header>
            <Body>
                <Title>CHECKOUT</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleCheckout}>
                <Text>SAVE</Text>
                </Button>
            </Right>
        </Header>
        <Content>
            <Form>
                <Item floatingLabel>
                <Label>Room Name</Label>
                <Input disabled value={name} onChangeText={text => setName(text)} />
                </Item>
                <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={userId}
                >
                    {props.costumer.map((item,index) => (
                        <Picker.Item label={item.name} value={item.id} />
                    ))}
                </Picker>
                </Item>
                <Item floatingLabel>
                <Label>Time Remaining</Label>
                <Input value={duration} onChangeText={text => setDuration(Number(text))} />
                </Item>
            </Form>
        </Content>
      </Container>
    )
}

const mapStateToProps = state => {
    return  {
        currUser : state.auth.currUser,
        costumer : state.costumer.costumer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCostumer : (token) => dispatch(fetchDataCostumer(token)),
        fetchBooked : (token) => dispatch(fetchRoomBooked(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)