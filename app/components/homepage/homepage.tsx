import { Text, View } from "react-native";

export default function Homepage() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        {/*Insert the user's name at the end of the welcome message*/}
      <Text>Welcome back!</Text>
    </View>
  );
}