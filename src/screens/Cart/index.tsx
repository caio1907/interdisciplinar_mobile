import React from 'react';
import { View } from 'react-native';

import ProductInCart from '@Components/ProductInCart';
import { addToCart, decreaseCartItem, getCart } from '@Store/Cart.store';
import { useDispatch, useSelector } from 'react-redux';
import ProductType from '../../types/Product.type';
import stylesFile from './styles';

const Cart: React.FC = () => {
  const styles = stylesFile();
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();
  const productsOfCart = Object.keys(cart).map(key => cart[+key]);

  const increaseButtonHandler = (product: ProductType) => {
    dispatch(addToCart(product))
  }

  const decreaseButtonHandler = (product: ProductType) => {
    dispatch(decreaseCartItem(product))
  }

  return (
    <View>
      {productsOfCart.map(product => (
        <View key={product.id} style={styles.cartItem}>
          <ProductInCart
            {...{product, increaseButtonHandler, decreaseButtonHandler}}
            />
        </View>
      ))}
    </View>
  )
}
export default Cart;
