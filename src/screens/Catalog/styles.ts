import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default () => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 8
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginVertical: 0
  },
  card: {
    width: (width - 45) / 2,
    marginBottom: 12
  }
});