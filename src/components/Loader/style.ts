import { StyleSheet } from "react-native";
import { ThemeBase } from 'react-native-paper';

export default (theme:ThemeBase) => StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, .4)'
  },
  indicator: {
    width: 120,
    height: 120,
    backgroundColor: '#e3e3e3',
    borderRadius: theme?.roundness
  }
})
