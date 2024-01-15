import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button, Pressable } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import ListOfAuto from './screens/ListOfAuto';
import Details from './screens/Details';
import SignInScreen from './screens/SignInScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './materials/colors';
import { Dimensions } from 'react-native';
import { store } from './redux/Redux';
import { Provider } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux";
import { encode as base64Encode } from 'base-64';

const Stack = createStackNavigator();

// const AppStack = ({ navigation }) => (
//   <Stack.Navigator >

//     {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
//     <Stack.Screen name="ListOfAuto" component={ListOfAuto} options={{ header: () => null }} />
//     <Stack.Screen name="Details" component={Details}
//       options={{
//         title: "Детали",
//         headerLeft: () => (
//           <Button
//             onPress={() => { navigation.goBack() }}
//             title='Назад'
//           />
//         ),
//         headerTitleAlign: 'center',
//         headerRight: () => (
//           <View style={{ flexDirection: 'row' }}>
//             <Button
//               onPress={() => {
//                 //
//               }}
//               title='Кнопка 1'
//             />
//             <Button
//               onPress={() => {
//                 //
//               }}
//               title='Кнопка 2'
//             />
//           </View>
//         )
//       }} />
//   </Stack.Navigator>
// )

const App = () => {

  // const loaderOpacity = useRef(new Animated.Value(1)).current;
  // const squareOpacity = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   const runAnimations = async () => {
  //     // Создаем последовательность анимаций
  //     Animated.sequence([
  //       // Анимация исчезновения лоадера
  //       Animated.timing(loaderOpacity, {
  //         toValue: 0,
  //         duration: 2000, // 10 секунд в миллисекундах
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),

  //       // Анимация появления квадрата
  //       Animated.timing(squareOpacity, {
  //         toValue: 1,
  //         duration: 1000,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   };

  //   runAnimations();
  // }, []);

  const userData = useSelector(state => state.userData);
  const currentNumber = useSelector(state => state.currentNumber);
  const zakazi = useSelector(state => state.zakazi);
  const pfotoObject = useSelector(state => state.pfotoObject);

  const dispatch = useDispatch();


  const reload = async () => {

    const basicAuth = 'Basic ' + base64Encode("http:jwA9MJH4jM");

    const autoList = await fetch(`http://194.158.208.194:47153/${userData.unp}/hs/Zakazi/Querty/Post?Phone=${userData.userPhone}`, {
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

    console.log("Обновился")
    dispatch({
      type: "SET_ZAKAZI",
      payload: dataOfZakazi.Array,
    });
  }

  const setImages = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      if (images && images.length > 0) {
        images.forEach(image => {

          // Код для обработки каждого изображения
          console.log("Image path:", image.path);

          const imageUri = image.path;

          const formData = new FormData();

          // const binaryImage = {
          //   uri: imageUri,
          //   type: 'image/jpeg', // Устанавливаем тип изображения
          //   name: image.filename || 'image.jpg',
          // };

          // // Создание Blob с бинарными данными
          // const imageBlob = new Blob([binaryImage], { type: 'image/jpeg' });

          // formData.append('image', imageBlob, image.filename || 'image.jpg');

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

              console.log('Ответ от сервера:', data)

              const updatedData = zakazi.map(item => {
                if (item.Number === currentNumber) {
                  return {
                    ...item,
                    Pfoto: item.Pfoto ? [...item.Pfoto, { "Url": imageUri }] : [{ "Url": imageUri }]
                  };
                }
                return item;
              });

              // if (pfotoObject[currentNumber].Pfoto) {
              //   pfotoObject[currentNumber].Pfoto.push({ "Url": imageUri });

              // } else {
              //   pfotoObject[currentNumber] = { Pfoto: [{ "Url": imageUri }] };
              // }



              dispatch({
                type: "SET_ZAKAZI",
                payload: updatedData,
              });

              // dispatch({
              //   type: "SET_PFOTO_OF_ZAKAZI",
              //   payload: pfotoObject,
              // });
            })
            .catch(error => console.error('Ошибка отправки запроса:', error));
        });
      } else {
        console.log("No images selected");
        // Другие действия, если изображения не выбраны
      }
    }).catch(error => {

      // Обработка ошибки, если что-то пошло не так при выборе изображений
    });
  }

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <View style={styles.container}>

    //     <Animated.View style={{ ...styles.loader, opacity: loaderOpacity }}>
    //       {/* Пример компонента Loader */}
    //       <Text style={styles.loaderText}>Loading...</Text>
    //     </Animated.View>
    //     <PanGestureHandler>
    //       <Animated.View style={{ ...styles.square, opacity: squareOpacity }}>
    //         {/* Квадрат для постепенного появления */}
    //       </Animated.View>
    //     </PanGestureHandler>

    //   </View>
    // </GestureHandlerRootView>

    // <ListOfAuto></ListOfAuto>
    // <Details></Details>

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="SignIn" component={SignInScreen} options={{ header: () => null }} />
          <Stack.Screen name="ListOfAuto" component={ListOfAuto}
            options={({ route }) => ({
              headerStyle: {
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowRadius: 10,
                elevation: 5,
                backgroundColor: 'white'
              },
              title: null,
              headerLeft: () => (
                <Text style={{ fontWeight: 'bold', marginLeft: Dimensions.get('window').width * 0.05, color: COLORS.PRIMARY_COLOR, fontSize: 22 }}>Наряд заказы</Text>
              ),
              headerRight: () => (
                <Pressable
                  onPress={reload}
                  style={{ ...styles.btnPrimary, marginRight: Dimensions.get('window').width * 0.05 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Обновить</Text>
                </Pressable>
              )
            })} />
          <Stack.Screen name="Details" component={Details}
            options={({ route }) => ({
              headerStyle: {
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowRadius: 10,
                elevation: 5,
                backgroundColor: 'white'
              },
              title: null,
              headerLeft: () => (
                <Text style={{ fontWeight: 'bold', marginLeft: Dimensions.get('window').width * 0.05, color: COLORS.PRIMARY_COLOR, fontSize: 22 }}>Детали заказа</Text>
              ),
              headerRight: () => (
                <Pressable
                  onPress={setImages}
                  style={{ ...styles.btnPrimary, marginRight: Dimensions.get('window').width * 0.05 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Фото</Text>
                </Pressable>
              )
            })} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <SignInScreen></SignInScreen> */}

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
  loader: {
    // Стили для компонента Loader

  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    // Дополнительные стили для квадрата
  },
  loaderText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  btnPrimary: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    // height: 50,
    borderRadius: 5,
    padding: '5%',
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
