import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OutlineButton from './UI/OutlineButton'
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, isBackgroundLocationAvailableAsync, PermissionStatus, useBackgroundPermissions, requestForegroundPermissionsAsync, requestBackgroundPermissionsAsync, useForegroundPermissions } from 'expo-location'
import * as Location from 'expo-location';
import { getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

const LocationPicker = ({onLocationPick}) => {
    const [pickedLocation, setPickedLocation] = useState();

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();



    useEffect(() => {
        if (isFocused && route.params) {

            const mapPickedLocation =
                { lat: route.params.pickedLat, lng: route.params.pickedLng };
            setPickedLocation(mapPickedLocation)
        }

    }, [route, isFocused])
    useEffect(()=>{
        onLocationPick(pickedLocation)
    },[pickedLocation,onLocationPick])

    async function verifyPermissions() {
        if (
            locationPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.Image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }
    // const [locationPermissionInformation, requestPermission] = useBackgroundPermissions();
    // const [locations, setLocations] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);
    // const [pickedLocation, setPickedLocation] = useState()
    // useEffect(() => {
    //     Verifypermission()
    //     checkBackgroundLocationSupport()
    // }, []);
    // async function checkBackgroundLocationSupport() {
    //     const isAvailable = await isBackgroundLocationAvailableAsync();
    //     console.log('Background location support:', isAvailable);
    // }
    // async function Verifypermission() {
    //     let foregroundPermission = await requestForegroundPermissionsAsync();
    //     if (foregroundPermission.status !== 'granted') {
    //         setErrorMsg('Foreground permission to access location was denied');
    //         return false;
    //     }
    //     let backgroundPermission = await requestBackgroundPermissionsAsync();
    //     if (backgroundPermission.status !== 'granted') {
    //         setErrorMsg('Background permission to access location was denied');
    //         return false;
    //     }

    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }

    //     let location = await getCurrentPositionAsync({});
    //     setLocations(locations);
    //     return true;
    // };

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (locations) {
    //     text = JSON.stringify(locations);
    //     // console.log(text);
    // }

    // async function getLocationHandler() {
    //     const hasPermission = await Verifypermission();
    //     if (!hasPermission) {
    //         return;
    //     }

    //     const location = await getCurrentPositionAsync();
    //     setPickedLocation({
    //         lat: location.coords.altitude,
    //         lng: location.coords.longitude
    //     });

    // }
    // function pickOnMaphandler() { }
    // let locationPreview = <Text>No location Picked yet.</Text>

    // if (pickedLocation) {
    //     locationPreview = (
    //         <Image style={styles.Image}
    //             source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
    //             // onError={(error) => console.log(error)} 
    //             />
    //     )
    // }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlineButton icon={'location'} onPress={getLocationHandler}>Locate user </OutlineButton>
                <OutlineButton icon={'map'} onPress={pickOnMapHandler}>Pick on map</OutlineButton>
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    Image: {
        width: '100%',
        height: '100%',
        // borderRadius: 4
    }
})