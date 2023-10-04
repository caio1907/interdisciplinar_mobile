import React from 'react';
import { View } from "react-native"
import { ActivityIndicator, useTheme } from "react-native-paper"
import styleFile from './style';
import { useSelector } from 'react-redux';
import { getLoader } from '@Store/Loader.store';

const Loader:React.FC = () => {
  const { show } = useSelector(getLoader);
  const style = styleFile(useTheme());
  return show && (
    <View style={style.container}>
      <ActivityIndicator animating style={style.indicator} color='#555555'/>
    </View>
  )
}
export default Loader;
