import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styleFile from './styles';
import { getConfig } from '@Store/Config.store';
import { useNavigation } from '@react-navigation/native';

const Start: React.FC = () => {
  const styles = styleFile();
  const { logo } = useSelector(getConfig);
  const navigation = useNavigation();

  const handlePressButtonStart = () => {
    AsyncStorage.setItem('startup', 'true');
    navigation.navigate('Catalog' as never);
  }

  return !logo ? <></> : (
    <View style={styles.container}>
      {logo && <Image source={{uri: logo}} resizeMode='contain' style={styles.logo} />}
      <View>
        <Text style={styles.title}>Bem-vindos à CERVAC!</Text>
        <Text style={styles.text}>
          Somos uma instituição beneficente que há 23 anos
          desenvolve um trabalho junto às crianças,
          adolescentes e jovens com deficiência, e tem
          acumulado uma série de resultados positivos que
          dignificam a sua existência, demonstrando a forma
          compreensiva e eficiente com que vêm atuando na
          prevenção, sensibilização e reabilitação.
        </Text>
      </View>
      <Button
        mode='contained'
        style={styles.button}
        textColor='#FFF'
        onPress={handlePressButtonStart}>
        INICIAR
      </Button>
    </View>
  )
}
export default Start;
