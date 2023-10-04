import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-paper';

import Catalog from '@Screens/Catalog';
import Cart from '@Screens/Cart';
import CartButton from '@Components/CartButton';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor='#000'/>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerRight: () => <CartButton navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name='Catalog'
          component={Catalog}
          options={{
            title: 'Catálogo',
            headerLeftContainerStyle: {
              marginLeft: '2%'
            },
            headerLeft: () => (
              <Avatar.Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/carvac-store.appspot.com/o/CERVAC.jpg?alt=media&token=5b8305c5-3406-4cf2-a618-196c9cb138e6'
                }}
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
