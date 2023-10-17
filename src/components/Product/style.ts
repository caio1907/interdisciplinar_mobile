import { StyleSheet } from "react-native";

export default () => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  textLinearGradient: {
    height: 40,
    width: '100%',
    paddingTop: 4,
    paddingHorizontal: 8
  },
  text: {
    fontWeight: 'bold'
  }
})
