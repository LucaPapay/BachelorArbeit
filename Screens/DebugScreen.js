import { Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initalState, nextId } from '../redux/actions';

export function DebugScreen() {

  const dispatch = useDispatch();
  let counter = useSelector(state => state.idCounter);
  let store = useSelector(state => state);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', marginTop: 100, marginBottom: 100 }}>
      <Button color="tomato" title='RESET STORE' onPress={() => dispatch(initalState())} />
      <Text>Current ID: {counter} <Button color="tomato" title='+' onPress={() => dispatch(nextId())} /></Text>
      <Button color="tomato" title='Store' onPress={() => console.log(store)} />
    </View>
  );
}