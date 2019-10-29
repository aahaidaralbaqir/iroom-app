import React from 'react'
import { fetchDataRoom } from '../../config/redux/action'
import { connect } from 'react-redux'
import { Container , Header, Content, Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api, headerOptions } from '../../config/api'
function AddRoom(props) {
    const [name,setName] = React.useState('')
    const { token } = props.currUser
    const handleAddRoom = () => {
        let data = {
            name
        }
        api
         .post('/rooms',data,headerOptions(token))
         .then(result => {
            props.fetchRoom(token)
             alert('room created')
         })
         .catch(error => {
             alert(error)
         })
    }
    return (
        <Container>
        <Header>
            <Body>
                <Title>ADD ROOM</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleAddRoom}>
                <Text>SAVE</Text>
                </Button>
            </Right>
        </Header>
        <Content>
            <Form>
                <Item floatingLabel>
                <Label>Room Name</Label>
                <Input value={name} onChangeText={text => setName(text)} />
                </Item>
            </Form>
        </Content>
      </Container>
    )
}

const mapStateToProps = state => {
    return {
        currUser : state.auth.currUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
         fetchRoom : (token) => dispatch(fetchDataRoom(token))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(AddRoom)