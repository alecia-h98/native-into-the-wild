import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

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
        backgroundColor: '#DCE4C9D1',
      }}>
      <Text>Into The Wild</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCE4C9D1',
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});