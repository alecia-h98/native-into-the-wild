import { Text, View } from "react-native";

export default function Favorites() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Favorites</Text>
      {/*Make this into a question mark icon that opens a modal with the following text:*/}
      <Text>Below is a list of all the items you have saved as favorites. Click on an item to unfavorite it.</Text>
    </View>
  );
}