import React from 'react'
import { Container , Header, Content,Picker,Icon ,Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api , headerOptions } from '../../config/api' 
import { connect } from 'react-redux'
import { fetchDataCostumer,fetchRoomBooked } from '../../config/redux/action'
function AddCheckin(props) {
    
    const paramId = props.navigation.getParam('id')
    const paramName = props.navigation.getParam('name')
    const [id,setId] = React.useState(paramId)

    const [userId,setUserId] = React.useState(0)
    const [name,setName] = React.useState(paramName)
    const [duration,setDuration] = React.useState(0)

    let  { token } = props.currUser

    React.useEffect(() => {
        props.fetchCostumer(token)
    },[])

    const handleAddCheckin = () => {
        let data = {
            costumer_id : userId,
            room_id : id,
            is_booked : true,
            is_done : false,
            duration : duration,
            order_end_time : 0
        }
        api
         .post('/checkin',data,headerOptions(token))
         .then(result => {
            alert('reservation created')
            props.fetchBooked(token)
         })
         .catch(error => {
            alert('reservation failed')
         })
    }

    return (
        <Container>
        <Header>
            <Body>
                <Title>ADD CHECKIN</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleAddCheckin}>
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
                    onValueChange={(value) => setUserId(value)}
                >
                    {props.costumer.map((item,index) => (
                        <Picker.Item label={item.name} value={item.id} />
                    ))}
                </Picker>
                </Item>
                <Item floatingLabel>
                <Label>Duration</Label>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddCheckin)