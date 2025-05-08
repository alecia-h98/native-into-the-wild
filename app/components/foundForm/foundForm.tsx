import { Text, View } from "react-native";

export default function FoundForm() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>FoundForm</Text>
        {/*Make this into a question mark icon that opens a modal with the following text:*/}
      <Text>Below is a form to fill out if you have found an item. Fill out the when and where you found the item along with a photo and description.</Text>
    </View>
  );
}