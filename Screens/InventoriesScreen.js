import { Platform, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
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
        <Text onPress={() => navigation.navigate('Sub Inventory', { parentIds: [entry.id], name: entry.name })} style={styles.title}>{entry.name}</Text>
      </View>
      <Ionicons
        onPress={() => navigation.navigate('New Entry', { parentId: entry.id })}
        name="add-circle"
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

export function InventoriesScreen({ navigation }) {
  let DATA = useSelector(state => state.data);

  return (
    <View style={styles.container}>
      <Button title='add Category' onPress={() => navigation.navigate('New Category')}></Button>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#e5e5e5',
    padding: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    color: '#14213d'
  },
});