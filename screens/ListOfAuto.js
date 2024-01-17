import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Order from './Order';
import Modal from './Modal';
import { COLORS } from '../materials/colors';
import { useDispatch, useSelector } from "react-redux";

const ListOfAuto = ({ navigation }) => {

    const orderList = useSelector(state => state.zakazi);

    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState(false);

    const openSelector = useCallback((number) => {
        setNumber(number);
        setVisible(true);
    }, []);

    const closeSelector = useCallback(() => {
        setVisible(false);
    }, []);

    const renderItem = ({ item, index }) => (
        <Order
            navigation={navigation}
            zakaz={item}
            openSelector={openSelector}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={orderList}
                style={{ paddingHorizontal: "5%" }}
                keyExtractor={item => item.Number}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
            <Modal
                visible={visible}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={closeSelector}
                number={number}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.CONTAINER_COLOR,
    },
});

export default ListOfAuto;
