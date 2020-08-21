import React, { useState } from 'react'
import { WebView } from "react-native-webview";
import Loader from "../../Components/Loader";
import constants from '../../utils/constants'
const Payment = () => {

    return (
        <WebView source={{ uri: constants.PAYMENT_URL }} renderLoading={() => <Loader size={10} />} />
    )
}

export default Payment