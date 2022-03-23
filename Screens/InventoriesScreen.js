import { Platform, StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DATA = [
  {
    title: 'Main Office',
    data: ['Tisch', 'Sessel', 'Drucker'],
  },
  {
    title: 'Branch Office',
    data: ['Stuhl', 'Drucker', 'Sessel'],
  },
  {
    title: 'Main Office',
    data: ['Tisch', 'Sessel', 'Drucker'],
  },
  {
    title: 'Branch Office',
    data: ['Stuhl', 'Drucker', 'Sessel'],
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export function InventoriesScreen() {
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
              onPress={() => Alert.alert('Simple Button pressed')}
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