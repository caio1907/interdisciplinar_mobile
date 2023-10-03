import React from 'react';
import { View } from 'react-native';
import { Badge, IconButton, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { getCart } from '@Store/Cart.store';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: any
}

const CartButton: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const { cart } = useSelector(getCart);
  const cartLength = Object.keys(cart).reduce((total, key) => total + cart[+key].quantity, 0);
  return (
    <View style={{margin: 16}}>
      <TouchableOpacity onPress={() => cartLength > 0 && navigation.navigate('Cart')}>
        <IconButton
          icon="cart"
          iconColor='#000'
        />
        {cartLength > 0 && (
          <Badge
            size={18}
            style={{
              position: 'absolute',
              top: 4,
              right: 0,
              backgroundColor: theme.colors.primary,
              color: theme.colors.surface
            }}
          >
            {cartLength}
          </Badge>
        )}
      </TouchableOpacity>
    </View>
  )
}
export default CartButton;
