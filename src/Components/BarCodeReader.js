import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Overlay from "./Overlay";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [data, setData] = useState("Scaning");

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setData(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (


        <Overlay
            backDropClose={true}
        >
            <View style={{
                // overflow: 'hidden',
                width: 260,
                height: 260,
            }}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={{ flex: 1 }}

                />
                <Text> {data} </Text>
            </View>
        </Overlay>


    );
}

