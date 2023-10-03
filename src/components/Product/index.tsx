import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { getDownloadURL, ref } from 'firebase/storage';

import styleFile from './style';
import ProductType from '../../types/Product.type';
import currencyFormat from '../../utils/currencyFormat';

const Product: React.FC<{product: ProductType, handlePressButton: (product: ProductType) => void}> = ({product, handlePressButton}) => {
  const { image_url, price } = product;
  const styles = styleFile();

  return (
    <Card mode='elevated' style={styles.container} contentStyle={{width: '100%'}}>
      {image_url && <Card.Cover source={{ uri: image_url }} resizeMethod='resize' style={{borderRadius: 8}}/>}
      <Card.Content>
      </Card.Content>
      <Card.Actions>
        <View>
          <Text>{currencyFormat(price)}</Text>
        </View>
        <IconButton
          icon="cart-plus"
          onPress={() => handlePressButton(product)}
        />
      </Card.Actions>
    </Card>
  )
}

export default Product;
