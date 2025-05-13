import { Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
// import { useParams } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";

export default function FoundForm() {
    const [foundDate, setFoundDate] = useState("");
    const [foundLocation, setFoundLocation] = useState("");
    const [foundDescription, setFoundDescription] = useState("");

  

  return (
        <ScrollView>
                <Text>FoundForm</Text>
        {/*Make this into a question mark icon that opens a modal with the following text:*/}
      <Text>Below is a form to fill out if you have found an item. Fill out the when and where you found the item along with a photo and description.</Text>
            <Text>Found Date:</Text>
                <TextInput style={styles.textBox}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#888"
                value={foundDate}
                onChangeText={setFoundDate}
                ></TextInput>
                <Text>Location Found:</Text>
                <TextInput style={styles.textBox}
                 placeholder="Buffalo River State Park, MN"
                 placeholderTextColor="#888"
                value={foundLocation}
                onChangeText={setFoundLocation}
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
                value={foundDescription}
                onChangeText={setFoundDescription}
                ></TextInput>
          </ScrollView>
  );
}

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