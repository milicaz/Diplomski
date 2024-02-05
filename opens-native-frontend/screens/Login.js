import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {

  // State variable to hold the password 
  const [password, setPassword] = useState(''); 
  
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 40 }}>Login</Text>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style={{ height: 50, color: "black" }} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ height: 50, color: "black" }} placeholder="Password" />
      </View>
      <TouchableOpacity>
        <Text style={{ fontSize: 18 }}>Zaboravili ste lozinku?</Text>
      </TouchableOpacity>
      <View style = {{ width:"50%", margin: 10 }}>
        <Button title="Login"></Button>
      </View>
    </View>
  );
}
