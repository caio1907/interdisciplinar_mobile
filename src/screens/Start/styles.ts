import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default () => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    width: '100%',
    height: '20%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#219157',
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 16
  },
  text: {
    fontSize: 16,
    color: '#219157',
    marginHorizontal: 16
  },
  button: {
    backgroundColor: '#219157'
  }
});
