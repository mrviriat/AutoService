import React, { useEffect, useRef, useState, useCallback } from 'react'
import { StyleSheet, View, Dimensions, Animated, Easing, Alert, Text, TouchableOpacity, Pressable, TextInput } from 'react-native'
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
                outputRange: [0.65, 0],
                extrapolate: 'clamp'
            })
        } else {
            return transY.current.interpolate({
                inputRange: [startPointY, 0],
                outputRange: [0, 0.65],
                extrapolate: 'clamp'
            })
        }
    };

    const [status, setStatus] = useState(null);

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const handleSave = async () => {
        try {
            const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM"); //+375293734156  AvtoMax

            await fetch(`http://194.158.208.194:47153/${userData.unp}/hs/EditStatus/Type/Post?Phone=${userData.userPhone}`, {
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
        } catch (error) {
            Alert.alert('Ошибка при выполнении запроса', error.message);
        } finally {
            onClose();
        }
    };

    return (
        <>
            <Animated.View pointerEvents='none' style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]} />
            <Animated.View style={[styles.container, { transform: [{ translateY: transY.current }] }]}>
                <View style={styles.innerContainer}>
                    <Text style={{ fontSize: 22, color: COLORS.PRIMARY_COLOR, fontWeight: 'bold', marginVertical: 5, alignSelf: 'center' }}>Выберите статус</Text>

                    <RadioButton.Group onValueChange={handleStatusChange} value={status}>
                        {statusy.map((option) => (
                            <View key={option.Code} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, /* backgroundColor: 'red' */ }}>
                                <RadioButton value={option.Code} />
                                <View style={{flex: 1, /* backgroundColor: 'blue' */ }}>
                                    <Text style={{ color: 'black', fontSize: 18 }}>{option.Name}</Text>
                                </View>

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
})