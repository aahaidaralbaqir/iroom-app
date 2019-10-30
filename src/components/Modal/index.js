import React from 'react'
import {
    View
} from 'react-native'
import Modal from 'react-native-modal'
function CostumModal({children,open,swipe,height}) {
    return(
        <Modal
          isVisible={open}
          style={{
            height : 100
          }}
          onSwipeComplete={() => swipe() }
          swipeDirection="left"
        >
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}}>
            <View 
                style={{
                    width: 310,
                    height,
                    backgroundColor : 'white',
                    padding:20,
                    borderRadius:3
                }}
                >
                
            {children}
            </View>
        </View>
        </Modal>
    )
}
export default CostumModal