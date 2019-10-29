import React from 'react'
import { Container , Header, Content, Form,Title, Text, Button, Item, Label,Input, Body, Right } from 'native-base'
import { api , headerOptions } from '../../config/api' 
import { connect } from 'react-redux'
import { fetchDataCostumer } from '../../config/redux/action'
function AddCostumer(props) {
    const [name,setName] = React.useState('')
    const [phone,setPhone] = React.useState('')
    const [identity,setIdentity] = React.useState('')
    let  { token } = props.currUser
    const handleAddCostumer = () => {
        let data = {
            name : name,
            identity_number : identity,
            phone_number : phone,
            image : ''
        }
        api
         .post('/costumers',data,headerOptions(token))
         .then(result => {
             props.fetchCostumer(token)
            alert('costumer created')
            setTimeout(() => {
                props.navigation.pop()
            },3000)
         })
         .catch(error => {
             console.log(err)
         })
    }

    return (
        <Container>
        <Header>
            <Body>
                <Title>ADD COSTUMER</Title>
            </Body>
            <Right>
                <Button transparent onPress={handleAddCostumer}>
                <Text>SAVE</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddCostumer)