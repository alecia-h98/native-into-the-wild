import { Text, View } from "react-native";

export default function Tips_Guidelines() {

  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Tips & Guidelines:</Text>
      <Text>Always be 1000% sure of the plant you're foraging before eating it. Get a foraging book that goes over not only the plant itself but also it's similar imposters.
      {'\n'}
      {/*can I use a b tag in react native?*/}
      <b>Don't over harvest.</b> Take only what you need, leaving enough for the plant to regenerate and allowing other animals to continue hunting for these delectible treats.{'\n'}
      Don't forage in areas that have been sprayed with pesticides or herbicides. These chemicals can be harmful to both you and the environment.
      {'\n'}
      Check that you aren't foraging in a protected area. Although we have been doing it since the cavemen, foraging is illegal in certain areas. Please check into your area's guidelines beforehand.
      </Text>
    </View>
  );
}