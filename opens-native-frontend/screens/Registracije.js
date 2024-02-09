import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Fragment, useState } from "react";
import { Button, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-element-dropdown";
import SearchableDropDown from "react-native-searchable-dropdown";
export default function Registracija() {

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Musko', value: '1'},
    {label: 'Zensko', value: '2'},
    {label: 'Drugo', value: '3'}
  ]

  // State variable to hold the password 
  const [password, setPassword] = useState(''); 
  
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  }

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    let mesec = `${tempDate[1]}`
    if(mesec === "Jan"){
      mesec = '01'
    }
    return date !== ''
      ? `${mesec}.${tempDate[2]}.${tempDate[3]}.`
      : '';
  };

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({type}, selectedDate) => {
    if(type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === "android"){
        toogleDatepicker();
        setDate(currentDate);
      }

    } else {
      toogleDatepicker();
    }

    const confirmIOSDate = () => {
      setDate(date);
      toogleDatepicker();
    };

    const renderLabel = () => {
      if(value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        )
      }
    };

  }

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 40 }}>Registracija</Text>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Ime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Prezime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <Dropdown
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Rod' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        {/* <TextInput style = {{height: 50, color: "black"}} placeholder="Rod" /> */}
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Lozinka" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        {showPicker && (
          <RNDateTimePicker mode = "date" display = "default" value={date} onChange={onChange} />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View style = {{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style = {{backgroundColor: "#11182711", paddingHorizontal:20}} onPress={toogleDatepicker}>
              <Text style = {{fontSize: 14, fontWeight: "500", color: "#fff"}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{backgroundColor: "#11182711", paddingHorizontal:20}} onPress={confirmIOSDate}>
              <Text style = {{fontSize: 14, fontWeight: "500", color: "#fff"}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toogleDatepicker}>
          <TextInput style = {{height: 50, color: "black"}} placeholder="Datum rodjenja" editable = {false} value={getDate()} onChangeText={setDate} onPressIn={toogleDatepicker} />
        </Pressable>
        )}
        
      </View>
      <View style={{ width: "80%", borderWidth: 2, borderRadius: 25, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black"}} placeholder="Mesto Boravista" />
      </View>
        <View style = {{flexDirection:"row", width: "80%"}}>
          <View style = {{flex: 1, borderWidth: 2, borderRadius: 25, height: 50, justifyContent: "center", marginBottom: 20, padding: 20}}>
            <TextInput style = {{ height: 50, color:"black", }} keyboardType="numeric" placeholder="+381" />
          </View>
          <View style={{flex: 4, borderWidth: 2, borderRadius: 25, height: 50, justifyContent: "center", marginBottom: 20, padding: 20}}>
            <TextInput style = {{height: 50, color: "black"}} keyboardType="numeric" placeholder="0631234567" />
          </View>
          </View>
      <View style= {{width:"50%", margin:10}}>
        <Button title="Registracija"></Button>
      </View>
    </View>
    </ScrollView>
  );
}

