import React from 'react'
import { Container , Header, Content, Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api , headerOptions } from '../../config/api' 
import { connect } from 'react-redux'
import { fetchDataCostumer } from '../../config/redux/action'
function EditCostumer(props) {
    let paramName = props.navigation.getParam('name')
    let paramPhone = props.navigation.getParam('phone')
    let paramIdentity = props.navigation.getParam('identity')
    let id = props.navigation.getParam('id')

    const [name,setName] = React.useState(paramName)
    const [phone,setPhone] = React.useState(paramPhone)
    const [identity,setIdentity] = React.useState(paramIdentity)
    let  { token } = props.currUser
    const handleEditCostumer = () => {
        let data = {
            name : name,
            identity_number : identity,
            phone_number : phone,
            image : ''
        }
        api
         .put(`/costumers/${id}`,data,headerOptions(token))
         .then(result => {
             props.fetchCostumer(token)
            alert('costumer updated')
            setTimeout(() => {
                props.navigation.pop()
            },5000)
         })
         .catch(error => {
             console.log(err)
         })
    }

    return (
        <Container>
        <Header>
            <Body>
                <Title>EDIT COSTUMER</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleEditCostumer}>
                <Text>SAVE CHANGES</Text>
                </Button>
            </Right>
        </Header>
        <Content>
            <Form>
                <Item floatingLabel>
                <Label>Name</Label>
                <Input value={name} onChangeText={text => setName(text)} />
                </Item>
                <Item floatingLabel>
                <Label>Phone</Label>
                <Input value={phone} onChangeText={text => setPhone(text)} />
                </Item>
                <Item floatingLabel>
                <Label>Identity Number</Label>
                <Input value={identity} onChangeText={text => setIdentity(text)} />
                </Item>

            </Form>
        </Content>
      </Container>
    )
}

const mapStateToProps = state => {
    return  {
        currUser : state.auth.currUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCostumer : (token) => dispatch(fetchDataCostumer(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCostumer)