import React, { useState } from 'react'
import { WebView } from "react-native-webview";
import Loader from "../../Components/Loader";

const Payment = () => {

    return (
        <WebView source={{ uri: 'http://www.pine-technologies.com/ehisaab/payments/' }} renderLoading={() => <Loader size={10} />} />
    )
}

export default Payment