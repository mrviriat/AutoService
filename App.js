import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import SplashScreen from 'react-native-splash-screen'

import ListOfAuto from './screens/ListOfAuto';
import Details from './screens/Details';
import SignInScreen from './screens/SignInScreen';
import { COLORS } from './materials/colors';
import { store } from './redux/Redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, Provider } from "react-redux";
import { encode as base64Encode } from 'base-64';

const width = Dimensions.get('window').width;

const Stack = createStackNavigator();

const App = () => {

  const userData = useSelector(state => state.userData);
  const currentNumber = useSelector(state => state.currentNumber);
  const zakazi = useSelector(state => state.zakazi);
  const pfotoObject = useSelector(state => state.pfotoObject);

  const dispatch = useDispatch();

  const headerStyles = {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white'
  }

  const reload = async () => {

    const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM");

    const autoList = await fetch(`http://194.158.208.194:47153/${userData.unp}/hs/Zakazi/Querty/Post?Phone=${userData.userPhone}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth,
      },
      body: JSON.stringify({
        // Добавьте данные для запроса
      }),
    });

    const dataOfZakazi = await autoList.json();

    const pfotos = {};

    dataOfZakazi.Array.forEach(item => {
      const { Number, Pfoto } = item;
      pfotos[Number] = Pfoto ? Pfoto : [];
    });

    // console.log("Обновился")
    dispatch({
      type: "SET_ZAKAZI",
      payload: dataOfZakazi.Array,
    });
    dispatch({
      type: "SET_PFOTO_OF_ZAKAZI",
      payload: pfotos,
    });
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const chooseCamera = () => {
    ImagePicker.openCamera({

      cropping: false,
    }).then(image => {
      if (image) {

        const imageUri = image.path;
        const formData = new FormData();

        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM"); //+375293734156  AvtoMax

        fetch(`http://194.158.208.194:47153/${userData.unp}/hs/Picture/Querty/Post?Phone=${userData.userPhone}&Number=${currentNumber}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': basicAuth,
          },
        })
          .then(response => response.json())
          .then(data => {

            // console.log('Ответ от сервера:', data)

            const updatedData = zakazi.map(item => {
              if (item.Number === currentNumber) {
                return {
                  ...item,
                  Pfoto: item.Pfoto ? [...item.Pfoto, { "Url": imageUri }] : [{ "Url": imageUri }]
                };
              }
              return item;
            });

            dispatch({
              type: "SET_ZAKAZI",
              payload: updatedData,
            });

            const obj = {
              "Url": imageUri
            }
            dispatch({
              type: "ADD_PHOTO",
              number: currentNumber,
              payload: obj,
            });
          })
          .catch(error => console.error('Ошибка отправки запроса:', error));
      } else {
        console.log("No image selected");
        // Другие действия, если изображения не выбраны
      }
    }).catch(error => {
      // Обработка ошибки, если что-то пошло не так при выборе изображений
    });
  }

  const chooseGalery = () => {
    ImagePicker.openPicker({
      multiple: false
    }).then(image => {
      if (image) {

        const imageUri = image.path;
        const formData = new FormData();

        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM"); //+375293734156  AvtoMax

        fetch(`http://194.158.208.194:47153/${userData.unp}/hs/Picture/Querty/Post?Phone=${userData.userPhone}&Number=${currentNumber}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': basicAuth,
          },
        })
          .then(response => response.json())
          .then(data => {

            // console.log('Ответ от сервера:', data)

            const updatedData = zakazi.map(item => {
              if (item.Number === currentNumber) {
                return {
                  ...item,
                  Pfoto: item.Pfoto ? [...item.Pfoto, { "Url": imageUri }] : [{ "Url": imageUri }]
                };
              }
              return item;
            });

            dispatch({
              type: "SET_ZAKAZI",
              payload: updatedData,
            });

            const obj = {
              "Url": imageUri
            }
            dispatch({
              type: "ADD_PHOTO",
              number: currentNumber,
              payload: obj,
            });
          })
          .catch(error => console.error('Ошибка отправки запроса:', error));
      } else {
        console.log("No image selected");
        // Другие действия, если изображения не выбраны
      }
    }).catch(error => {
      // Обработка ошибки, если что-то пошло не так при выборе изображений
    });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ header: () => null }} />
          <Stack.Screen name="ListOfAuto" component={ListOfAuto}
            options={({ route }) => ({
              headerStyle: headerStyles,
              title: null,
              headerLeft: () => (
                <Text style={{ fontWeight: 'bold', marginLeft: width * 0.05, color: COLORS.PRIMARY_COLOR, fontSize: 22 }}>Наряд заказы</Text>
              ),
              headerRight: () => (
                <TouchableOpacity
                  activeOpacity={0.65}
                  onPress={reload}
                  style={{ ...styles.btnPrimary, padding: "5%", marginRight: width * 0.05 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Обновить</Text>
                </TouchableOpacity>
              )
            })} />
          <Stack.Screen name="Details" component={Details}
            options={({ route }) => ({
              headerStyle: headerStyles,
              title: null,
              headerLeft: () => (
                <Text style={{ fontWeight: 'bold', marginLeft: width * 0.05, color: COLORS.PRIMARY_COLOR, fontSize: 22 }}>Детали заказа</Text>
              ),
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={chooseGalery}
                    style={{ ...styles.btnPrimary, marginRight: width * 0.02 }}
                  >
                    <Icon
                      name="photo"
                      color={"#fff"}
                      size={width * 0.08}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.65}
                    onPress={chooseCamera}
                    style={{ ...styles.btnPrimary, marginRight: width * 0.05 }}
                  >
                    <Icon
                      name="photo-camera"
                      color={"#fff"}
                      size={width * 0.08}
                    />
                  </TouchableOpacity>
                </View>
              )
            })} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnPrimary: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 5,
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProviderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default ProviderApp;
