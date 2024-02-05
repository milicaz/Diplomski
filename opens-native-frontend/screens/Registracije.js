import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
export default function Registracija() {

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
      <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 40 }}>Registracija</Text>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Ime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Prezime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Rod" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Lozinka" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        {/* <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker modal open={open} date={date} onConfirm = {(date) => {
          setOpen(false)
          setDate(date)
        }}
          onCancel = {() => {
            setOpen(false)
          }}
        /> */}
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Mesto Boravista" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Broj telefona" />
      </View>
      <View style= {{width:"50%", margin:10}}>
        <Button title="Registracija"></Button>
      </View>
    </View>
  );
}
