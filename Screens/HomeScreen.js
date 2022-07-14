import { Box, Button, Center, VStack } from "native-base";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";
import CategoryListEntry from "../Components/CategoryListEntry";

export function HomeScreen({ navigation }) {
  let categories = useSelector((state) => state.categories);

  return (
    <Box height="100%" bg="background.800">
      <Box mx="4">
        <Center>
          <VStack mt={8} width="100%">
            <Box height="5%">
              <Button height={12} onPress={() => navigation.navigate("New Category")}>
                New Category
              </Button>
            </Box>
            <Box mt="6" height="95%">
              <FlatList data={categories} renderItem={renderItem} keyExtractor={(item) => item.id} />
            </Box>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}

const renderItem = ({ item }) => {
  return <CategoryListEntry category={item} />;
};
