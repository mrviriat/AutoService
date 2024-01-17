import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, Alert, Pressable, TouchableOpacity } from 'react-native';
import { COLORS } from '../materials/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { encode as base64Encode } from 'base-64';
import { useDispatch, useSelector } from 'react-redux';
// import OrderList from './data';

const SignInScreen = ({ navigation }) => { //   +375293734156  AvtoMax

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [UNP, setUNP] = useState("");
  const [phone, setPhone] = useState("");

  const changeUNP = useCallback((text) => {
    setUNP(text);
  }, []);

  const changePhone = useCallback((text) => {
    setPhone(text);
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);  // Блокируем кнопку "вход"

      const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM");
      // console.log(basicAuth)

      // Выполняем post запрос
      const response = await fetch(`http://194.158.208.194:47153/${UNP}/hs/Status/Type/Post?Phone=${phone}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
          // 'Content-Length' : "0"
          // Добавьте другие необходимые заголовки
        },
        body: JSON.stringify({  // Добавьте данные для запроса
        }),
      });

      const data = await response.json();

      if ('Array' in data) {  // Проверяем наличие ключа "Array"
        // if (true) {

        const autoList = await fetch(`http://194.158.208.194:47153/${UNP}/hs/Zakazi/Querty/Post?Phone=${phone}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth,
            // 'Content-Length' : "0"
            // Добавьте другие необходимые заголовки
          },
          body: JSON.stringify({
            // Добавьте данные для запроса
          }),
        });

        const dataOfZakazi = await autoList.json();

        // const dataOfZakazi = OrderList;

        const pfotoObject = {};

        dataOfZakazi.Array.forEach(item => {
          const { Number, Pfoto } = item;
          pfotoObject[Number] = Pfoto ? Pfoto : [];
        });

        // dataOfZakazi.forEach(item => {
        //   const { Number, Pfoto } = item;
        //   pfotoObject[Number] = Pfoto ? Pfoto : [];
        // });

        // console.log(pfotoObject);

        const userData = {
          unp: UNP,
          userPhone: phone
        }

        dispatch({
          type: "SET_ZAKAZI",
          payload: dataOfZakazi.Array,
          // payload: dataOfZakazi,
        });
        dispatch({
          type: "SET_PFOTO_OF_ZAKAZI",
          payload: pfotoObject,
        });
        dispatch({
          type: "SET_STATUSY",
          payload: data.Array,
        });
        dispatch({
          type: "SET_USERDATA",
          payload: userData,
        });

        // Переходим на следующую страницу
        navigation.reset({
          index: 0,
          routes: [{ name: 'ListOfAuto' }],
        });
      } else {
        // Выводим сообщение об ошибке через Alert
        Alert.alert('Ошибка', data.Msg);
      }
    } catch (error) {
      Alert.alert('Ошибка при выполнении запроса', error.message);
      // console.error('Ошибка при выполнении запроса:', error.message);
    } finally {
      // Разблокируем кнопку "вход" после выполнения запроса
      setIsLoading(false);
    }
  };

  const sendInfoMessage = () => {
    Alert.alert('Информация', "Для решения вашего вопроса свяжитесь с администратором по номеру:\n+375 (44) 56-60-444");
  }

  return (
    <View
      style={{ paddingHorizontal: "7%", flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: 'row', marginTop: "20%" }}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: "black" }}>
          AUTO
        </Text>
        <Text
          style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.FOCUS_BLUE }}>
          SERVICE
        </Text>
      </View>

      <View style={{ marginTop: 70 }}>
        <Text style={{ fontSize: 27, fontWeight: 'bold', color: "black" }}>
          Добро Пожаловать!
        </Text>
        <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.GREY }}>
          Войдите для продолжения
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={STYLES.inputContainer}>
          <Icon
            name="mail-outline"
            color={COLORS.light}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput placeholder="УПН" style={STYLES.input} onChangeText={changeUNP} />
        </View>
        <View style={STYLES.inputContainer}>
          <Icon
            name="local-phone"
            color={COLORS.light}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            placeholder="Телефон"
            style={STYLES.input}
            onChangeText={changePhone}
          />
        </View>
        <TouchableOpacity disabled={isLoading} style={STYLES.btnPrimary} activeOpacity={0.65} onPress={handleLogin}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Войти
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={STYLES.line}></View>
          <Text style={{ marginHorizontal: 5, fontWeight: 'bold', fontSize: 16 }}>OR</Text>
          <View style={STYLES.line}></View>
        </View>
      </View>

      <TouchableOpacity
        onPress={sendInfoMessage}
        activeOpacity={0.65}
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text style={{ color: COLORS.GREY, fontWeight: 'bold', fontSize: 18 }}>
          Нету аккаунта?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const STYLES = StyleSheet.create({
  inputContainer: { flexDirection: 'row', marginTop: 20 },
  input: {
    color: COLORS.GREY,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
  },
  inputIcon: { marginTop: 15, position: 'absolute' },
  btnPrimary: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  btnSecondary: {
    height: 50,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  btnImage: { width: 20, height: 20, marginLeft: 5 },

  line: { height: 1, width: 30, backgroundColor: '#a5a5a5' },
});
