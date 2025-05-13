// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
// import Homepage from './components/Homepage/Homepage';
// import Categories from './components/categories/categories';

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
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: '#DCE4C9D1',
    //   }}>
    <ScrollView>
      <Text>Into The Wild</Text>
            <Text>Found Date:</Text>
            <TextInput style={styles.textBox}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#888"
            /*value={foundDate}*/
            /*onChangeText={setFoundDate}*/
            ></TextInput>
            <Text>Location Found:</Text>
            <TextInput style={styles.textBox}
             placeholder="Buffalo River State Park, MN"
             placeholderTextColor="#888"
            /*value={foundLocation}*/
            /*onChangeText={setFoundLocation}*/
            ></TextInput>
            <Text>Item Image:</Text>
            {/*Make this into a camera icon that opens the camera and takes a picture of the item*/ }
            <Text>Item Description:</Text>
            <TextInput 
            style={stylesDescription.textBox}
            multiline={true}
            numberOfLines={6}
            placeholder="Description of the item"
            placeholderTextColor="#888"
            /*value={foundDescription}*/
            /*onChangeText={setFoundDescription}*/
            ></TextInput>
      </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textBox: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});

const stylesDescription = StyleSheet.create({
  container: {
    padding: 16,
  },
  textBox: {
    height: 120,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#DCE4C9D1',
//   },
//   text: {
//     fontSize: 20,
//     color: "#333",
//   },
// });

//*******this is the react navigation code

// const Stack = createNativeStackNavigator();


//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Homepage}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Categories" component={Categories} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
