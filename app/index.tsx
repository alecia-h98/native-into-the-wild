// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
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
