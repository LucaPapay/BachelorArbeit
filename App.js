import { StatusBar } from "expo-status-bar";
import { MainRouter } from "./Components/MainRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { persistor } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainRouter></MainRouter>
        <StatusBar style="auto" backgroundColor="tomato" />
      </PersistGate>
    </Provider>
  );
}
