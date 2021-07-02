import React from 'react'
import {View, Text, Image,StyleSheet,Dimensions} from 'react-native'

var {width}=Dimensions.get('window')

const FoodCard = (props) => {
    return (
        <View style = {styles.Container}> 
            <Image
                source = {{uri : props.item.item.food.image}}
                style={{
                    width : 50,
                    height : 50,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius:10,
                    flex: 1
                }}
            />
            <View style={styles.TextContainer}>
                <Text style={styles.TextStyle}>{props.item.item.food.name}</Text>
                <Text style={styles.TextStyle}>Số lượng : {props.item.item.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#ff6c00",
        marginBottom: 10
    },
    TextContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        backgroundColor: '#FFDEC5',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    TextStyle:{
        fontFamily: 'Comfortaa_Regular',
        fontSize: 14,
        color:'black'
    }
})
export default FoodCard