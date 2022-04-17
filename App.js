import { StatusBar } from "expo-status-bar";
import { MainRouter } from "./Components/MainRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { extendTheme, NativeBaseProvider } from "native-base";

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#eaf0ff",
      100: "#c5d2ec",
      200: "#a0b3dd",
      300: "#7c95cf",
      400: "#5777c1",
      500: "#3e5ea8",
      600: "#304983",
      700: "#21345e",
      800: "#131f3a",
      900: "#040a17",
    },
    background: {
      800: "#1f2937",
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
  },
  config: {
    initialColorMode: "dark",
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRouter></MainRouter>
          <StatusBar style="auto" backgroundColor="#14213d" />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
