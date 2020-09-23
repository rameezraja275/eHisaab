import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
const { width, height } = Dimensions.get('window');

const Bar_Code_Scanner = ({ onScan, size }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false)
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const delay = (time) => {
        setTimeout(() => setScanned(false), time);
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true)
        delay(1000)
        Vibration.vibrate()
        onScan(data)
    };


    return (
        <View style={{
            alignContent: "flex-start",
            height: size == "sm" ? 250 : height,
            width: size == "sm" ? 250 : width,
        }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ flex: 1 }}
            >
                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>
            {/* <View>
                <Text> {data} </Text>
            </View> */}
        </View>
    );
}

const opacity = 'rgba(0, 0, 0, .3)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    },
});

export default Bar_Code_Scanner