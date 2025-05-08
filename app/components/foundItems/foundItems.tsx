import { Text, View } from "react-native";

export default function FoundItems() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Found Items:</Text>
        {/*Make this into a question mark icon that opens a modal with the following text:*/}
        <Text>Below is a list of all the items you have found. Click on an item to view more details.</Text>
    </View>
  );
}