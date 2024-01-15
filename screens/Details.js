import React, { useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing, ScrollView, FlatList } from 'react-native';
import { COLORS } from '../materials/colors';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

const contentWidth = Dimensions.get('window').width * 0.9;

const Details = ({ route }) => {

    const { zakaz } = route.params;

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

    const renderItem = ({ item, index }) => {

        const isFirstItem = index === 0;
        const isLastItem = index === zakaz.Pfoto.length - 1;

        return (

            <View style={{ height: 300, width: contentWidth, marginLeft: isFirstItem ? 20 : 0, marginRight: isLastItem ? 20 : 5 }}>
                {/* borderRadius: 10, marginLeft: 10, marginRight: 10, backgroundColor: COLORS.GREY,*/}
                <Image
                    source={{ uri: item.Url }}
                    style={{ flex: 1, borderRadius: 10, backgroundColor: COLORS.UNFOCUS_BLUE}}
                    resizeMode="cover"
                />
            </View>
        );

    };

    const statusy = useSelector(state => state.statusy);
    const pfotoObject = useSelector(state => state.pfotoObject);

    console.log(pfotoObject)
    console.log(pfotoObject[zakaz.Number].Pfoto)

    const generateText = (code) => {
        const foundItem = statusy.find(item => item.Code === code);
        return foundItem ? foundItem.Name : code;
    };

    var date = new Date(parseInt(zakaz.Date, 10));


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <View style={styles.mainBlock}>
                <Text style={styles.titleText}>Авто №: {zakaz.Number}</Text>
                <View style={styles.separator}></View>
                <Text style={styles.basicText}>Дата: {formatTimeString(zakaz.Date)}</Text>
                <Text style={styles.basicText}>Статус: {generateText(zakaz.Status)}</Text>
                <Text style={styles.basicText}>Телефон: {zakaz.Telephone}</Text>
                <Text style={styles.basicText}>Автомобиль: {zakaz.Auto}</Text>
                <Text style={styles.basicText}>Пробег: {zakaz.Mileage}</Text>
                <Text style={styles.basicText}>Бокс: {zakaz.Box}</Text>
            </View>


            {pfotoObject[zakaz.Number].Pfoto ? <View style={styles.photoBlock}>
                <FlatList
                    data={pfotoObject[zakaz.Number].Pfoto}
                    // style={{ borderRadius: 10 }}
                    keyExtractor={item => item.Url}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View> : null}

            

            {zakaz.Job ? <View style={styles.secondBlock}>
                <Text style={styles.titleText}>Работы</Text>
                <View style={styles.separator}></View>
                <Text style={styles.basicText}>Наименование: {zakaz.Job[0].NameJob}</Text>
                <Text style={styles.basicText}>Количество: {zakaz.Job[0].Kol}</Text>
                <Text style={styles.basicText}>Норма час: {zakaz.Job[0].StandardHour}</Text>
                <Text style={styles.basicText}>Коэф-т: {zakaz.Job[0].Kof}</Text>
                {/* <View style={{ flex: 1, backgroundColor: "black" }}>
                            </View> */}
            </View> : null}


            {zakaz.Goods ? <View style={styles.thirdBlock}>
                <Text style={styles.titleText}>Товары</Text>
                <View style={styles.separator}></View>
                <Text style={styles.basicText}>Наименование: {zakaz.Goods[0].Nomenclature}</Text>
                <Text style={styles.basicText}>Количество: {zakaz.Goods[0].Kol}</Text>
                <Text style={styles.basicText}>ЕИ: {zakaz.Goods[0].Unit}</Text>
                {/* <View style={{ flex: 1, backgroundColor: "black" }}>
                            </View> */}
            </View> : null}

            {zakaz.Materials ? <View style={styles.forthBlock}>
                <Text style={styles.titleText}>Материалы</Text>
                <View style={styles.separator}></View>
                <Text style={styles.basicText}>Наименование: {zakaz.Materials[0].Nomenclature}</Text>
                <Text style={styles.basicText}>Количество: {zakaz.Materials[0].Kol}</Text>
                <Text style={styles.basicText}>ЕИ: {zakaz.Materials[0].Unit}</Text>
                <Text style={styles.basicText}>Состояние: {zakaz.Materials[0].Note ? "Новый" : "Старый"}</Text>
            </View> : null}


        </ScrollView>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.CONTAINER_COLOR,
        // padding: 40
        // marginVertical: "5%"

    },
    mainBlock: {
        flex: 1,
        width: contentWidth,
        marginTop: "5%",
        marginBottom: "3%",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        // backgroundColor: COLORS.GREY,
    },
    separator: {
        width: '100%',
        height: "1%",
        marginBottom: "1%",
        backgroundColor: COLORS.GREY,
    },
    titleText: {
        // color: "black",
        color: COLORS.PRIMARY_COLOR,
        fontSize: 22,
        fontWeight: 'bold',
    },
    basicText: {
        color: "black",
        fontSize: 20,
        marginTop: "1%",
    },
    photoBlock: {
        flex: 1,
        // borderRadius: 10,
        marginBottom: "3%",
    },
    secondBlock: {
        flex: 1,
        width: contentWidth,
        marginBottom: "3%",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        // backgroundColor: COLORS.GREY,
    },
    thirdBlock: {
        flex: 1,
        width: contentWidth,
        marginBottom: "3%",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    forthBlock: {
        flex: 1,
        width: contentWidth,
        marginBottom: "3%",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        // marginHorizontal: "5%"
        // backgroundColor: COLORS.GREY,
    },

});


