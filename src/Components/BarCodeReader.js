import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Bar_Code_Scanner = ({ onScan }) => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const delay = (time) => {
        return new Promise(function (resolve, reject) {
            setTimeout(() => resolve(), time);
        });
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        // await delay(1000)
        Vibration.vibrate()
        onScan(data)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{
            // overflow: 'hidden',
            width: 260,
            height: 260,
            flexDirection: "row",
        }}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={{ flex: 1 }}
            />
            {/* <View>
                <Text> {data} </Text>
            </View> */}
        </View>
    );
}

export default Bar_Code_Scanner