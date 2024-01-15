import 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../materials/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { encode as base64Encode } from 'base-64';
import { useDispatch, useSelector } from 'react-redux';

//   +375293734156  AvtoMax


const SignInScreen = ({ navigation }) => {

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
      // Блокируем кнопку "вход"
      setIsLoading(true);

      // const basicAuth = 'Basic ' + btoa("http:jwA9MJH4jM");
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
        body: JSON.stringify({
          // Добавьте данные для запроса
        }),
      });


      const data = await response.json();

      // Проверяем наличие ключа "Array"
      if ('Array' in data) {


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

        const pfotoObject = {};

        dataOfZakazi.Array.forEach(item => {
          const { Number, Pfoto } = item;
          pfotoObject[Number] = Pfoto ? { Pfoto : Pfoto } : { };
        });

        // console.log(pfotoObject);

        const userData = {
          unp: UNP,
          userPhone: phone
        }

        dispatch({
          type: "SET_ZAKAZI",
          payload: dataOfZakazi.Array,
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
        // navigation.navigate('ListOfAuto')
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

  return (
    <View
      style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginTop: 40 }}>
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
          {/* <Button
            style={STYLES.btnPrimary}
            title='Войти'
            onPress={handleLogin}
            disabled={isLoading} // Блокировка кнопки при isLoading=true
          >
            
          </Button> */}
          <Pressable onPress={handleLogin} disabled={isLoading}>
            <View style={STYLES.btnPrimary}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                Войти
              </Text>
            </View>
          </Pressable>

          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={STYLES.line}></View>
            <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>OR</Text>
            <View style={STYLES.line}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={STYLES.btnSecondary}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Войти с помощью
              </Text>
              {/* <Image
                style={STYLES.btnImage}
                source={require('../../assests/facebook.png')}
              /> */}
            </View>
            <View style={{ width: 10 }}></View>
            <View style={STYLES.btnSecondary}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Войти с помощью
              </Text>
              {/* <Image
                style={STYLES.btnImage}
                source={require('../../assests/google.png')}
              /> */}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{ color: COLORS.GREY, fontWeight: 'bold' }}>
            Нету аккаунта?
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              Sign up
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
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
