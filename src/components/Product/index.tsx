import React from 'react';
import { View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import styleFile from './style';
import ProductType from '../../types/Product.type';
import currencyFormat from '../../utils/currencyFormat';

const Product: React.FC<{product: ProductType, handlePressButton: (product: ProductType) => void}> = ({product, handlePressButton}) => {
  const { image_url, price } = product;
  const styles = styleFile();

  return (
    <>
      <Card mode='elevated' style={styles.container} contentStyle={{width: '100%'}}>
        {image_url && <Card.Cover source={{ uri: image_url }} resizeMethod='resize' style={{borderRadius: 8}}/>}
        <Card.Actions>
          <View>
            <Text>{currencyFormat(price)}</Text>
          </View>
          <IconButton
            icon='cart-plus'
            iconColor='#82DB7E'
            onPress={() => handlePressButton(product)}
            disabled={product.quantity === 0}
          />
        </Card.Actions>
      </Card>
      <View style={styles.textContainer}>
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']} style={styles.textLinearGradient}>
          <Text style={styles.text}>{product.description}</Text>
        </LinearGradient>
      </View>
    </>
  )
}

export default Product;
