import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Order from './Order';
import { COLORS } from '../materials/colors';
import { useDispatch, useSelector } from "react-redux";
import Modal from './Modal';

const ListOfAuto = ({ navigation }) => {

    

    const orderList = useSelector(state => state.zakazi);

    const OrderList = [{
        "Number": "231226173248",
        "Date": "231226173248",
        "Telephone":
            "231226173248",
        "Auto": "231226173248",
        "Mileage": "231226173248",
        "PaymentType": "231226173248",
        "TypeService": "231226173248",
        "Box": "231226173248",
        "Status": "231226173248",
        "Job": [{
            "NameJob": "Приемка автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 0.5
        }],
        "Goods": [{
            "Nomenclature": "Фильтр воздушный",
            "Kol": 2,
            "Unit": "",
            "Kof": 1
        }]
    },
    {
        "Number": "231128203302",
        "Date": "231128203302",
        "Telephone": "231128203302",
        "Auto": "231128203302",
        "Mileage": "231128203302",
        "PaymentType": "231128203302",
        "TypeService": "231128203302",
        "Box": "231128203302",
        "Status": "231128203302",
        "Job": [{
            "NameJob": "ремонт подвески",
            "Kol": 1,
            "StandardHour": "н/ч 100",
            "Kof": 4
        }],
        "Goods": [{
            "Nomenclature": "АМОРТИЗАТОРЫ ПОДВЕСКИ (Китай)",
            "Kol": 1,
            "Unit": "шт",
            "Kof": 1
        }],
        "Materials": [{
            "Nomenclature": "Болтики",
            "Kol": 4,
            "Unit": "шт",
            "Note": true
        }],
        "Pfoto": [{
            "Url": "http://194.158.208.194/Pic_storage/491304958/231128203302-img2.jpg"
        }]
    },
    {
        "Number": "231128165246",
        "Date": "231128165246",
        "Telephone": "231128165246",
        "Auto": "231128165246",
        "Mileage": "231128165246",
        "PaymentType": "231128165246",
        "TypeService": "231128165246",
        "Box": "231128165246",
        "Status": "231128165246",
        "Job": [{
            "NameJob": "ремонт подвески",
            "Kol": 1,
            "StandardHour": "н/ч 100",
            "Kof": 4
        }],
        "Goods": [{
            "Nomenclature": "РУЛЕВЫЕ РЕЙКИ STELLOX (Китай)",
            "Kol": 1,
            "Unit": "шт",
            "Kof": 1
        }]
    },
    {
        "Number": "231128162535",
        "Date": "231128162535",
        "Telephone": "231128162535",
        "Auto": "231128162535",
        "Mileage": "231128162535",
        "PaymentType": "231128162535",
        "TypeService": "231128162535",
        "Box": "231128162535",
        "Status": "231128162535",
        "Job": [{
            "NameJob": "Приемка автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 3
        }]
    },
    {
        "Number": "231128161202",
        "Date": "231128161202",
        "Telephone": "231128161202",
        "Auto": "231128161202",
        "Mileage": "231128161202",
        "PaymentType": "231128161202",
        "TypeService": "231128161202",
        "Box": "231128161202",
        "Status": "231128161202",
        "Job": [{
            "NameJob": "Выдача автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 2
        }],
        "Goods": [{
            "Nomenclature": "510351 Сайлентблок-КИТАЙ",
            "Kol": 2,
            "Unit": "шт",
            "Kof": 1
        }]
    },
    {
        "Number": "231128161208",
        "Date": "231128161202",
        "Telephone": "231128161202",
        "Auto": "231128161202",
        "Mileage": "231128161202",
        "PaymentType": "231128161202",
        "TypeService": "231128161202",
        "Box": "231128161202",
        "Status": "231128161202",
        "Job": [{
            "NameJob": "Выдача автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 2
        }],
        "Goods": [{
            "Nomenclature": "510351 Сайлентблок-КИТАЙ",
            "Kol": 2,
            "Unit": "шт",
            "Kof": 1
        }]
    },
    {
        "Number": "231128161212",
        "Date": "231128161202",
        "Telephone": "231128161202",
        "Auto": "231128161202",
        "Mileage": "231128161202",
        "PaymentType": "231128161202",
        "TypeService": "231128161202",
        "Box": "231128161202",
        "Status": "231128161202",
        "Job": [{
            "NameJob": "Выдача автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 2
        }],
        "Goods": [{
            "Nomenclature": "510351 Сайлентблок-КИТАЙ",
            "Kol": 2,
            "Unit": "шт",
            "Kof": 1
        }]
    },
    {
        "Number": "231128161205",
        "Date": "231128161202",
        "Telephone": "231128161202",
        "Auto": "231128161202",
        "Mileage": "231128161202",
        "PaymentType": "231128161202",
        "TypeService": "231128161202",
        "Box": "231128161202",
        "Status": "231128161202",
        "Job": [{
            "NameJob": "Выдача автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 2
        }],
        "Goods": [{
            "Nomenclature": "510351 Сайлентблок-КИТАЙ",
            "Kol": 2,
            "Unit": "шт",
            "Kof": 1
        }]
    },
    {
        "Number": "231128161201",
        "Date": "231128161202",
        "Telephone": "231128161202",
        "Auto": "231128161202",
        "Mileage": "231128161202",
        "PaymentType": "231128161202",
        "TypeService": "231128161202",
        "Box": "231128161202",
        "Status": "231128161202",
        "Job": [{
            "NameJob": "Выдача автомобиля",
            "Kol": 1,
            "StandardHour": "н/ч 30р",
            "Kof": 2
        }],
        "Goods": [{
            "Nomenclature": "510351 Сайлентблок-КИТАЙ",
            "Kol": 2,
            "Unit": "шт",
            "Kof": 1
        }]
    }]

    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState(false);

    const openSelector = useCallback((number) => {
        setNumber(number);
        setVisible(true);
    }, []);

    const closeSelector = useCallback(() => {
        setVisible(false);
    }, []);

    const renderItem = ({ item, index }) => {

        return (
            <Order
                navigation={navigation}
                zakaz={item}
                openSelector={openSelector}
                
            />
        )
    };

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
        // justifyContent: 'center',
        // alignItems: 'center',

        backgroundColor: COLORS.CONTAINER_COLOR,
    },
});

export default ListOfAuto;
