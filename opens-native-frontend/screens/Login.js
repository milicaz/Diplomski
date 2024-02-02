import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 40 }}>Login</Text>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style={{ height: 50, color: "black" }} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style={{ height: 50, color: "black" }} placeholder="Password" />
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
