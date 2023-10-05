import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';

import styleFile from './styles';
import ProductType from '../../types/Product.type';
import Product from '@Components/Product';
import { database } from '@Services/firebase';
import { addToCart } from '@Store/Cart.store';
import store from '@Store/index';
import FABIcons from '@Components/FABIcons';

const Catalog: React.FC = () => {
  const styles = styleFile();
  const [catalog, setCatalog] = useState<ProductType[]>([]);

  useEffect(() => {
    const snapshot = onSnapshot(collection(database, 'catalog'), (snapshot) => {
      setCatalog(snapshot.docs.map(doc => ({
        ...(doc.data() as ProductType),
        id: +doc.id,
        quantity: 0
      })));
    });

    return () => {
      snapshot();
    }
  }, []);

  const handlePressButton = (product: ProductType) => {
    store.dispatch(addToCart(product))
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {catalog.map((product, index) => (
            <View key={index} style={styles.card}>
              <Product {...{product, handlePressButton}}/>
            </View>
          ))}
        </View>
      </ScrollView>
      <FABIcons/>
    </View>
  );
}
export default Catalog;
