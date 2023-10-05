import React, { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, FAB, Portal, Text } from 'react-native-paper';

import ProductInCart from '@Components/ProductInCart';
import { addToCart, decreaseCartItem, getCart } from '@Store/Cart.store';
import ProductType from '../../types/Product.type';
import stylesFile from './styles';
import { useNavigation } from '@react-navigation/native';

const Cart: React.FC = () => {
  const styles = stylesFile();
  const navigation = useNavigation();
  const { cart } = useSelector(getCart);
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const productsOfCart = Object.keys(cart).map(key => cart[+key]);

  useEffect(() => {
    if (productsOfCart.length === 0) {
      navigation.goBack();
    }
  }, [productsOfCart.length]);

  const increaseButtonHandler = (product: ProductType) => {
    dispatch(addToCart(product))
  }

  const decreaseButtonHandler = (product: ProductType) => {
    if (product.quantity === 1) {
      setShowDialog(true);
      return;
    }
    dispatch(decreaseCartItem(product))
  }

  const removeProductCart = (product: ProductType) => {
    dispatch(decreaseCartItem(product));
    setShowDialog(false);
  }

  const redirectToWhatsApp = () => {
    const productsToString = productsOfCart.map(product => `${product.quantity}x - ${product.description}`).join('\n');
    const message = `Olá! Gostaria de realizar o pedido com o(s) seguinte(s) produto(s):\n${productsToString}`;
    Linking.openURL(`https://wa.me/5581986667860?text=${message}`);
  }

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Atenção</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja remover o produto do carrinho?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Não</Button>
            <Button onPress={() => removeProductCart(productsOfCart[0])}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {productsOfCart.map(product => (
        <View key={product.id} style={styles.cartItem}>
          <ProductInCart
            {...{product, increaseButtonHandler, decreaseButtonHandler}}
            />
        </View>
      ))}
      <FAB
        style={styles.FAB}
        icon="whatsapp"
        color='#000'
        onPress={() => redirectToWhatsApp()}
        label='Finalizar pedido'
        />
    </View>
  )
}
export default Cart;
