import React from 'react'
import { fetchDataRoom } from '../../config/redux/action'
import { connect } from 'react-redux'
import { Container , Header, Content, Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api, headerOptions } from '../../config/api'

function EditRoom(props) {
    let paramName = props.navigation.getParam('name')
    let paramId   = props.navigation.getParam('id')
    const [name,setName] = React.useState(paramName)
    const { token } = props.currUser
    const handleEditRoom = () => {
        let data = {
            name
        }
        api
         .put(`/rooms/${paramId}`,data,headerOptions(token))
         .then(result => {
             props.fetchRoom(token)
             alert('Room updated')
         })
         .catch(error => {
             alert(error)
         })
    }
    return (
        <Container>
        <Header>
            <Body>
                <Title>EDIT ROOM</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleEditRoom}>
                <Text>SAVE CHANGES</Text>
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
export default connect(mapStateToProps,mapDispatchToProps)(EditRoom)