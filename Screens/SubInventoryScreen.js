import { Platform, StyleSheet, Text, View, SectionList, StatusBar, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Button from '../Components/Button';

function Item({ entry }) {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <View
        style={{ flex: 8 }}
      >
        <Text onPress={() => navigation.push('Sub Inventory', { parentIds: entry.parentIds.concat(entry.id), name: entry.name })} style={styles.title}>{entry.name}</Text>
      </View>
      <Ionicons
        name="eye"
        style={{ flex: 1 }}
        size={35}
        color="#14213d" />
    </View>
  );
}

const renderItem = ({ item }) => {
  return (
    <Item
      entry={item}
    />
  );
};

export function SubInventoryScreen({ route, navigation }) {
  const { parentIds } = route.params;

  let DATA = getCorrectSubCategory(parentIds)

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button title='add Entry' onPress={() => navigation.navigate('New Entry', { parentIds: parentIds, name: DATA.name })}></Button>
        <Button title='add SubCategory' onPress={() => navigation.navigate('New SubCategory', { parentIds: parentIds, name: DATA.name })}></Button>
      </View>
      <Text style={styles.title} >Sub Categories</Text>
      <FlatList
        data={DATA.subCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.title}>Entrys</Text>
      <FlatList
        data={DATA.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 10 : 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#e5e5e5',
    padding: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    borderRadius: 5
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
    color: '#14213d'
  },
});

function getCorrectSubCategory(parentIds) {
  return useSelector(state => {

    let category = state.data;
    category = state.data.find(entry => entry.id === parentIds[0])

    for (var i = 1; i < parentIds.length; i++) {
      category = category.subCategories.find(entry => entry.id === parentIds[i])
    }

    return category;
  });
}
