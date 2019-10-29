import React from 'react'
import {
    ActivityIndicator
} from 'react-native'
import { PRIMARY_COLOR } from '../../config/constant'
function Loading() {
    return (
        <ActivityIndicator color={PRIMARY_COLOR} size="large" />
    )
}

export default Loading;