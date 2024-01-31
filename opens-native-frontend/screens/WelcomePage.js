import { Button, Image, Pressable, Text, View } from "react-native";

export default function WelcomePage({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={require("../assets/opens.png")}
          style={{
            height: 100,
            width: 400,
            borderRadius: 20,
            position: "absolute",
            top: 100,
            transform: [
              { translateX: 5 },
              { translateY: 50 },
              { rotate: "-15deg" },
            ],
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Registracija" onPress={() => navigation.navigate("Registracija")} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Imate napravljen nalog?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Prijavite se
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
