import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';

import Catalog from '@Screens/Catalog';
import Cart from '@Screens/Cart';
import Start from '@Screens/Start';
import CartButton from '@Components/CartButton';
import Loader from '@Components/Loader';
import { setLoading } from './utils/loadingState';
import { getImageUrl } from './utils/imageUrl';
import { getConfig, setConfig } from '@Store/Config.store';
import { database } from '@Services/firebase';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const [showStartup, setShowStartup] = useState(true);
  const dispatch = useDispatch();
  const { logo } = useSelector(getConfig);

  useEffect(() => {
    setLoading(true);
    getImageUrl('logo.png').then(logo => {
      getDoc(doc(database, 'config', 'contact')).then(collection => {
        dispatch(setConfig({logo, whatsapp_sales: collection.get('whatsapp_sales')}));
      });
    });
    AsyncStorage.getItem('startup').then((value) => {
      if (value) {
        setShowStartup(false);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <StatusBar backgroundColor='#000'/>
      <Loader/>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerRight: () => <CartButton navigation={navigation} />,
          headerTitle: ''
        })}
      >
        {showStartup && (
          <Stack.Screen
            name='Startup'
            component={Start}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name='Catalog'
          component={Catalog}
          options={{
            headerLeftContainerStyle: {
              marginLeft: '2%'
            },
            headerLeft: () => (
              logo && <Avatar.Image
                style={{
                  backgroundColor: '#FFF',
                  marginLeft: 16
                }}
                source={({size}) => (
                  <Image
                    resizeMode='contain'
                    source={{
                      uri: logo,
                      width: size,
                      height: size,
                    }}/>)}
                size={40}
                />
            )
          }}
        />
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{
            title: 'Carrinho',
            headerRight: undefined
          }}
        />
      </Stack.Navigator>
    </>
  )
}
export default Routes;
