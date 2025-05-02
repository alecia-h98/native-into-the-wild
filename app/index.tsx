import { Text, View } from "react-native";
import { useEffect } from "react";

export default function Index() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1'); // replace with your IP
        const text = await res.text();
        console.log('Server response:', text);
      } catch (err) {
        console.error('Error fetching:', err);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Into The Wild</Text>
    </View>
  );
}
