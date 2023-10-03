import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ProductType from '../../types/Product.type';
import { Avatar, Card, IconButton, List, Text } from 'react-native-paper';
import currencyFormat from '../../utils/currencyFormat';
import stylesFile from './styles';

interface Props {
  product: ProductType
  increaseButtonHandler: (product: ProductType) => void
  decreaseButtonHandler: (product: ProductType) => void
}

const ProductInCart: React.FC<Props> = ({product, increaseButtonHandler, decreaseButtonHandler}) => {
  const styles = stylesFile();

  const Buttons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <IconButton
          icon={product.quantity > 1 ? 'minus' : 'trash-can-outline'}
          onPress={() => decreaseButtonHandler(product)}
        />
        <Text>{product.quantity}</Text>
        <IconButton
          icon='plus'
          onPress={() => increaseButtonHandler(product)}
        />
      </View>
    )
  }

  return (
    <View>
      <Card>
        <List.Item
          title={product.description}
          description={currencyFormat(product.price)}
          left={props => <Avatar.Image {...props} source={{ uri: product.image_url }} />}
          right={props => <Buttons />}
        />
      </Card>
    </View>
  )
}
export default ProductInCart;
