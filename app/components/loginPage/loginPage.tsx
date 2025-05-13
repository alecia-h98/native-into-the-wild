import { Text, TextInput, ScrollView, StyleSheet, Button } from "react-native";

export default function LoginPage() {
    
  

  return (
    <ScrollView
      style={styles.textBox}>
      <Text>Login</Text>
        <Text>Email:</Text>
        <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
        >
        </TextInput>
        <Text>Password:</Text>
        <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            returnKeyType="done"
        >
        <Button title="Submit" onPress={() => {}} />
        </TextInput>
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