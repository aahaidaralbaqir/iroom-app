import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {fetchDataCostumer} from '../../config/redux/action';

function CostumerItem(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: 'silver',
        borderWidth: 0.3,
        height: 100,
        marginTop: 10,
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View>
          <Icon name="user" style={{fontSize: 100, color: 'silver'}} />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{props.name}</Text>
          <Text>{props.identity_number}</Text>
          <Text>{props.phone_number}</Text>
        </View>
      </View>
    </View>
  );
}

function Costumer(props) {
  let {token} = props.currUser;

  React.useEffect(() => {
    props.fetchCostumer(token);
  }, []);

  return (
    <ScrollView>
      <View style={{padding: 20, position: 'relative'}}>
        <Text style={{fontSize: 30, marginBottom: 10}}>All Costumer</Text>
        <Text style={{fontSize: 19, marginBottom: 10, color: '#666'}}>
          Lorem ipsum dolor sit atmet
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('NewCostumer')}
          style={{position: 'absolute', right: 20, top: 30}}>
          <View>
            <Text>Create Costumer</Text>
          </View>
        </TouchableOpacity>
        {props.costumer.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditCostumer', {
                name: item.name,
                phone: item.phone_number,
                identity: item.identity_number,
                id: item.id,
              })
            }>
            <CostumerItem key={index} {...item} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    costumer: state.costumer.costumer,
    currUser: state.auth.currUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCostumer: token => dispatch(fetchDataCostumer(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Costumer);
