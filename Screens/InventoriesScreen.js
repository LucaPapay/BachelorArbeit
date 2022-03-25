import { Platform, StyleSheet, Text, View, SectionList, StatusBar, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addEntryToCategory } from '../redux/actions';

const Item = ({ title, key }) => (
  <View style={styles.item}>
    <Text key={key} style={styles.title}>{title}</Text>
  </View>
);

export function InventoriesScreen({ navigation }) {

  const dispatch = useDispatch();
  let DATA = useSelector(state => state.data);
  JSON.stringify(DATA, null, "  ");

  return (
    <View style={styles.container}>
      <Button title='add Category' onPress={() => navigation.navigate('New Category')}></Button>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) => <Item title={item.childrenCategories.name} key={index} />}
        renderSectionHeader={({ section: { name, id } }) =>
          <View style={styles.header}>
            <Text style={styles.headerFont}>
              {name}
            </Text>
            <Ionicons
              onPress={() => dispatch(addEntryToCategory(id, 'newEntry'))}
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