import { Platform, StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addToInventories } from '../redux/actions';
import { store } from '../redux/store';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export function InventoriesScreen() {

  const dispatch = useDispatch();
  //console.log(store.getState());
  let DATA = useSelector(state => state.data);
  //dispatch(addToInventories('test'));

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) =>
          <View style={styles.header}>
            <Text style={styles.headerFont}>
              {title}
            </Text>
            <Ionicons
              onPress={() => dispatch(addToInventories('test'))}
              name="add-circle"
              size={35}
              color="black" />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 10 : 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  headerFont: {
    fontSize: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#efefef',
    paddingBottom: Platform.OS === 'ios' ? StatusBar.currentHeight + 5 : 5,
  },
  title: {
    fontSize: 24,
  },
});