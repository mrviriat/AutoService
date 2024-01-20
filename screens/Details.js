import React, { useState, useRef, memo, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { COLORS } from '../materials/colors';
import { useDispatch, useSelector } from "react-redux";
import ImageView from "react-native-image-viewing";

const contentWidth = Dimensions.get('window').width * 0.9;
const contentMargin = Dimensions.get('window').width * 0.05

const Details = ({ route }) => {

    const { zakaz } = route.params;

    function formatTimeString(inputString) {
        const inputDate = new Date(inputString);

        // Получаем компоненты даты
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const year = inputDate.getFullYear().toString().slice(-2);

        const formattedString = `${day}.${month}.${year}`;  // Формируем отформатированную строку

        return formattedString;
    }

    const statusy = useSelector(state => state.statusy);
    const pfotoObject = useSelector(state => state.pfotoObject);

    // console.log(pfotoObject)
    // console.log(pfotoObject[zakaz.Number])
    // console.log(pfotoObject[zakaz.Number] == false)

    const generateText = (code) => {
        try {
            const foundItem = statusy.find(item => item.Code === code);
            return foundItem ? foundItem.Name : code;
        }
        catch {
            return code;
        }
    };

    const renderItem = ({ item, index }) => {

        const isFirstItem = index === 0;
        const isLastItem = index === pfotoObject[zakaz.Number].length - 1;

        return (
            <TouchableOpacity onPress={() => handleSetIsVisible(index)} activeOpacity={0.65} style={{ height: 300, width: contentWidth, marginLeft: isFirstItem ? contentMargin : 0, marginRight: isLastItem ? contentMargin : 5 }}>
                {/* borderRadius: 10, marginLeft: 10, marginRight: 10, backgroundColor: COLORS.GREY,*/}
                <Image
                    source={{ uri: item.uri }}
                    style={{ flex: 1, borderRadius: 10, backgroundColor: COLORS.UNFOCUS_BLUE }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        );
    }

    const [currentImageIndex, setImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const handleSetIsVisible = (index) => {
        setImageIndex(index)
        setIsVisible(true)
    }

    // const images = [
    //     {
    //         uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    //     },
    // ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <ImageView
                // images={pfotoObject[zakaz.Number]}
                images={pfotoObject[zakaz.Number]}
                imageIndex={currentImageIndex}
                // presentationStyle="overFullScreen"
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                // onImageIndexChange={(index) => setImageIndex(index)}
                // FooterComponent={() => (
                //     <View style={{ alignItems: 'center' }}>
                //         <Text style={{ color: 'white', fontSize: 16 }}>{`${currentImageIndex + 1}/${pfotoObject[zakaz.Number].length}`}</Text>
                //     </View>
                // )}
            />

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

            {pfotoObject[zakaz.Number][0] ? <View style={styles.photoBlock}>
                <FlatList
                    data={pfotoObject[zakaz.Number]}
                    // style={{ borderRadius: 10 }}
                    keyExtractor={(item, index) => item['uri']}
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
            </View> : null}

            {zakaz.Goods ? <View style={styles.thirdBlock}>
                <Text style={styles.titleText}>Товары</Text>
                <View style={styles.separator}></View>
                <Text style={styles.basicText}>Наименование: {zakaz.Goods[0].Nomenclature}</Text>
                <Text style={styles.basicText}>Количество: {zakaz.Goods[0].Kol}</Text>
                <Text style={styles.basicText}>ЕИ: {zakaz.Goods[0].Unit}</Text>
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
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.CONTAINER_COLOR,
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
    },
    separator: {
        width: '100%',
        height: "1%",
        marginBottom: "1%",
        backgroundColor: COLORS.GREY,
    },
    titleText: {
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
    },
});