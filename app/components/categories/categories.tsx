import { Text, View } from "react-native";

export default function Categories() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Pick a category:</Text>
        {/*Make this into a question mark icon that opens a modal with the following text:*/}
      <Text>By picking a category it will direct you to a list of foragable items related to that category</Text>
    </View>
  );
}