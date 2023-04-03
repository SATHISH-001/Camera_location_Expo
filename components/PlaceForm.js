import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../constants/colors'
import ImagePicker from './Places/ImagePicker'
import LocationPicker from './Places/LocationPicker'
import Button from './Places/UI/Button'

const PlaceForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [pickedLocation, setPickedLocation] = useState()
    const [selectedImage, setSelectedImage] = useState()
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }
    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri)
    }
    const PicklocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])
    function savePlaceHandler() {
        console.log(enteredTitle);
        console.log(selectedImage);
        console.log(pickedLocation);
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.lable}>Tilte</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle} />
            </View>
            <ImagePicker onImageTaken={takeImageHandler} />
            <LocationPicker onLocationPick={PicklocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    lable: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
})