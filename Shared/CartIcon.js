import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Text } from 'native-base';

import { connect } from 'react-redux';

const CartIcon = (props) => {

    var numberOfItem = 0;
    props.cartItems.forEach(cart => {
        return (numberOfItem += cart.quantity)
    });

    return (
        <>
            {numberOfItem ? (
                <Badge style={styles.badge}>
                    <Text style={styles.text}>{numberOfItem}</Text>
                </Badge>
            ) : null}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: -7,
        right: -15
    },
    text: {
        fontSize: 12,
        width: 100,
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps)(CartIcon);