import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StyleSheet, View, Dimensions, Animated, Easing, Alert, Text, TouchableOpacity, Pressable, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from 'react-native-paper';
import { COLORS } from '../materials/colors';
import { encode as base64Encode } from 'base-64';

export default function Modal({
    visible,
    options,
    duration,
    onClose,
    number
}) {

    const dispatch = useDispatch();


    const zakazi = useSelector(state => state.zakazi);
    const statusy = useSelector(state => state.statusy);
    const userData = useSelector(state => state.userData);

    const { height } = Dimensions.get('screen');
    const startPointY = options?.from === 'top' ? -height : height;
    const transY = useRef(new Animated.Value(startPointY));

    useEffect(() => {
        if (visible) {
            startAnimation(0);
            setStatus(null)
            // setDescription(item.desc)
        } else {
            startAnimation(startPointY);
        }
    }, [visible]);

    const startAnimation = (toValue) => {
        Animated.timing(transY.current, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start();
    };

    const generateBackgroundOpacity = () => {
        if (startPointY >= 0) {
            return transY.current.interpolate({
                inputRange: [0, startPointY],
                outputRange: [0.8, 0],
                extrapolate: 'clamp'
            })
        } else {
            return transY.current.interpolate({
                inputRange: [startPointY, 0],
                outputRange: [0, 0.8],
                extrapolate: 'clamp'
            })
        }
    };

    // const [Description, setDescription] = useState();
    // const [Changeble, setChangeble] = useState("");

    // const changeDescription = useCallback((text) => {
    //     setChangeble(text);
    // }, []);

    // const addDescriprion = (text) => {
    //     setDescription(text);
    //     console.log("submit Description");
    //     dispatch({
    //         type: "CHANGE_DESCRIPTION",
    //         studentKey: studentId,
    //         name: item.name,
    //         isHere: item.isHere,
    //         desc: text,
    //         flag: item.flag,
    //         lessonKey: lessonKey
    //     });
    //     setTimeout(onClose, 300);
    // };

    const [status, setStatus] = useState(null);

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleSave = async () => {
        console.log(number + " " + status)

        try {


            // const basicAuth = 'Basic ' + btoa("http:jwA9MJH4jM");
            const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM"); //+375293734156  AvtoMax
            // console.log(basicAuth)
            // Выполняем post запрос
            const response = await fetch(`http://194.158.208.194:47153/${userData.unp}/hs/EditStatus/Type/Post?Phone=${userData.userPhone}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth,

                },
                body: JSON.stringify({
                    "Number": number,
                    "Status": status
                }),
            });


            const data = await response.json();

            console.log(data.Msg)

            const updatedData = zakazi.map(item => {
                if (item.Number === number) {
                  return {
                    ...item,
                    Status: status
                  };
                }
                return item;
              });

              dispatch({
                type: "SET_ZAKAZI",
                payload: updatedData,
              });

            // Проверяем наличие ключа "Array"
            // if ('Array' in data) {


            //   const autoList = await fetch(`http://194.158.208.194:47153/${UNP}/hs/Zakazi/Querty/Post?Phone=${phone}`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       'Authorization': basicAuth,
            //       // 'Content-Length' : "0"
            //       // Добавьте другие необходимые заголовки
            //     },
            //     body: JSON.stringify({
            //       // Добавьте данные для запроса
            //     }),
            //   });

            //   const dataOfZakazi = await autoList.json();

            //   const userData = {
            //     unp: UNP,
            //     userPhone: phone
            //   }

            //   dispatch({
            //     type: "SET_ZAKAZI",
            //     payload: dataOfZakazi.Array,
            //   });
            //   dispatch({
            //     type: "SET_STATUSY",
            //     payload: data.Array,
            //   });
            //   dispatch({
            //     type: "SET_USERDATA",
            //     payload: userData,
            //   });

            //   // Переходим на следующую страницу
            //   navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'ListOfAuto' }],
            //   });
            //   // navigation.navigate('ListOfAuto')
            // } else {
            //   // Выводим сообщение об ошибке через Alert
            //   Alert.alert('Ошибка', data.Msg);
            // }
        } catch (error) {
            Alert.alert('Ошибка при выполнении запроса', error.message);
            // console.error('Ошибка при выполнении запроса:', error.message);
        } finally {
            onClose();
        }
        // onClose();
    };

    return (
        <>
            <Animated.View pointerEvents='none' style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]} />
            <Animated.View style={[styles.container, { transform: [{ translateY: transY.current }] }]}>
                <View style={styles.innerContainer}>
                    <Text style={{ fontSize: 22, color: COLORS.PRIMARY_COLOR, fontWeight: 'bold', marginVertical: 5, alignSelf: 'center' }}>Выберите статус</Text>

                    <RadioButton.Group onValueChange={handleStatusChange} value={status}>
                        {statusy.map((option) => (
                            <View key={option.Code} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                <RadioButton value={option.Code} />
                                <Text style={{ color: 'black', fontSize: 18 }}>{option.Name}</Text>
                            </View>
                        ))}
                    </RadioButton.Group>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 20 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={{ fontSize: 22, color: 'red', fontWeight: 'bold' }}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={status ? handleSave : null}>
                            <Text style={{ fontSize: 22, color: 'green', fontWeight: 'bold' }}>Изменить</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b4369'
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        width: '80%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10
    },
    // headContainer: {
    //     flex: 3,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderBottomWidth: 1,
    //     borderColor: "black",
    // },
    // bodyContainer: {
    //     flex: 6,
    //     alignItems: 'center'
    // },
    // rowContainer: {
    //     flexDirection: 'row',
    //     marginTop: responsiveHeight(1)
    // },
    // textInput: {
    //     width: responsiveWidth(70.6),
    //     height: responsiveHeight(5.9),
    //     backgroundColor: 'white',
    //     marginTop: responsiveHeight(1),
    //     borderRadius: responsiveHeight(1.8),
    //     fontSize: responsiveFontSize(2.1),
    //     color: 'black',
    //     fontFamily: 'Inter-Regular'
    // },
    // text: {
    //     fontFamily: 'Inter-Regular',
    //     fontSize: responsiveFontSize(2.67),
    //     color: "black",
    //     alignSelf: 'flex-start',
    //     marginLeft: responsiveWidth(1)
    // },
    // reasonText: {
    //     fontFamily: 'Inter-Regular',
    //     fontSize: responsiveFontSize(2.67),
    //     color: "white"
    // },
})