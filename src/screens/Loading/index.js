import React from 'react'
import {
    ActivityIndicator,
    View
} from 'react-native'
function Loading() {
    return (
        <View style={{flex:1,position:'absolute'}}>
          <ActivityIndicator color='white' size="small" style={{top:20,left:20}} />
        </View>
    )
}

export default Loading;
