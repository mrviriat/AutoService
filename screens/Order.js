import React, { useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../materials/colors';
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Order = ({ navigation, zakaz, openSelector }) => {

    const dispatch = useDispatch();

    const statusy = useSelector(state => state.statusy);

    const generateText = (code) => {
        try {
            const foundItem = statusy.find(item => item.Code === code);
            return foundItem ? foundItem.Name : code;
        }
        catch {
            return code;
        }
    };

    function formatTimeString(inputString) {
        const inputDate = new Date(inputString);

        // Получаем компоненты даты
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const year = inputDate.getFullYear().toString().slice(-2);

        // Формируем отформатированную строку
        const formattedString = `${day}.${month}.${year}`;

        return formattedString;
    }

    const openDetails = () => {
        dispatch({
            type: "CURRENT_NUMBER",
            payload: zakaz.Number,
        });
        navigation.navigate('Details', { zakaz })
    };

    return (
        <TouchableOpacity style={styles.square} onLongPress={() => openSelector(zakaz.Number)} onPress={openDetails}>
            <View style={zakaz.Pfoto ? styles.photoBlock : styles.iconBlock}>
                {zakaz.Pfoto ? <Image
                    source={{ uri: `${zakaz.Pfoto[0].Url}` }}
                    style={styles.image}
                    resizeMode="cover"
                /> : <Icon
                    name="car-repair"
                    color={COLORS.PRIMARY_COLOR}
                    size={40}
                />}

            </View>

            <View style={styles.textBlock}>
                <Text style={styles.titleText}>Авто №: {zakaz.Number}</Text>
                <View style={styles.infoBlock}>
                    <View style={styles.statusBlock}>
                        <Text style={styles.infoText}>Телефон: {zakaz.Telephone}</Text>
                        <Text style={styles.infoText}>Стутас: {generateText(zakaz.Status)}</Text>
                    </View>
                    <View style={styles.dateBlock}>
                        <Text style={styles.infoText}>{formatTimeString(zakaz.Date)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    square: {
        // flex: 1,
        width: '100%',
        height: 115,
        backgroundColor: 'white',
        marginTop: "2%",
        marginBottom: "2%",
        borderRadius: 10,
        padding: "2%",
        flexDirection: "row"
    },
    photoBlock: {
        flex: 2,
        backgroundColor: COLORS.GREY,
        borderRadius: 10,
    },
    iconBlock: {
        flex: 2,
        backgroundColor: COLORS.UNFOCUS_BLUE,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBlock: {
        flex: 4,
        paddingLeft: "4%",
        justifyContent: "space-between"
    },
    infoBlock: {
        flexDirection: "row"
    },
    image: {
        flex: 1,
        borderRadius: 10,
    },
    titleText: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        color: COLORS.GREY,
        fontSize: 14,
    },
    statusBlock: {
        flex: 9,
    },
    dateBlock: {
        flex: 4,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },


});

export default memo(Order);
