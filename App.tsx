import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import * as Updates from 'expo-updates';

import store from './src/store';
import Routes from './src/routes';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { setLoading } from './src/utils/loadingState';

export default function App() {
  const theme: ThemeProp = {
    ...MD3DarkTheme,
    animation: {
      scale: 5
    },
    dark: true,
    mode: 'adaptive'
  }

  useEffect(() => {
    const update = async () => {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if(isAvailable){
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
      setLoading(false)
    }
    if(process.env.NODE_ENV !== 'development') update();
    else setLoading(false);
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
