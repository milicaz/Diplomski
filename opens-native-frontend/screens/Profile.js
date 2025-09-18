import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Buffer } from "buffer";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import COLORS from "../constants/colors";
import useHttpProtected from "../hooks/useHttpProtected";
import useLogout from "../hooks/useLogout";
import eventEmitter from "../utils/EventEmitter";

const ConfirmModal = ({ visible, onClose, title, message, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.confirmOverlay}>
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>{title}</Text>
          <Text style={styles.confirmMessage}>{message}</Text>

          <View style={styles.confirmActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>{t("profile-page.text.cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.confirmText}>{t("profile-page.text.confirm")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const USER_KEY = "user";

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
  });

  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const httpProtected = useHttpProtected();
  const logOutUser = useLogout();

  //useFocusEffect hook from @react-navigation/native to refetch the data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
      fetchUser(loggedIn.id);
    }, [])
  );

  const fetchUser = async (id) => {
    try {
      const userData = await httpProtected.get(`posetioci/${id}`);
      setUser(userData.data);

      const imageData = await httpProtected.get(`posetioci/${id}/profilna`, {
        responseType: "arraybuffer",
      });

      const contentType = imageData.headers["content-type"] || "image/jpeg";
      const base64Image = Buffer.from(imageData.data, "binary").toString(
        "base64"
      );
      setProfileImage(`data:${contentType};base64,${base64Image}`);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          eventEmitter.emit("LOGOUT");
          Toast.show({
            type: "error",
            text1: t("http-common.error.session.header"),
            text2: t("http-common.error.session.text"),
            duration: 7000,
          });
        } else {
          Toast.show({
            type: "error",
            text1: t("http-common.error.server.header"),
            text2: t("http-common.error.server.text"),
            duration: 7000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: t("http-common.error.network.header"),
          text2: t("http-common.error.network.text"),
          duration: 7000,
        });
      }
    }
  };

  const deleteAccount = async () => {
    try {
      await httpProtected.delete(`posetioci/${user.id}`);
      Toast.show({
        type: 'success',
        text1: t('profile-page.deletation.success.header'),
        text2: t('profile-page.deletation.success.text'),
        duration: 4000,
      });
      logOutUser();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: t('profile-page.deletation.success.header'),
        text2: t('profile-page.deletation.success.text'),
      });
    }
  };

  const openConfirm = (title, message, action) => {
    setConfirmConfig({ title, message, onConfirm: action });
    setConfirmVisible(true);
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer(windowHeight)}>
        <Image
          source={require("../assets/bg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        {/* <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logOutUser()}
        >
          <Text style={styles.logoutButtonText}> Log out </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setMenuVisible(true)}
        >
          <MaterialIcons name="more-vert" size={28} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Modal meni */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Poluprovidna pozadina */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        />
        {/* Kartica sa opcijama */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              openConfirm(
                t("profile-page.text.logout"),
                t("profile-page.text.logout-confirmation"),
                logOutUser
              );
            }}
          >
            <MaterialIcons name="logout" size={20} color={COLORS.black} />
            <Text style={styles.menuItemText}>{t("profile-page.text.logout")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              openConfirm(
                t("profile-page.text.delete-account"),
                t("profile-page.text.delete-account-confirmation"),
                deleteAccount
              );
            }}
          >
            <MaterialIcons name="delete" size={20} color={COLORS.red} />
            <Text style={[styles.menuItemText, { color: COLORS.red }]}>
              {t("profile-page.text.delete-account")}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Confirm modal */}
      <ConfirmModal
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={confirmConfig.onConfirm}
      />

      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <ActivityIndicator size="large" color={COLORS.yellow} />
        )}
        <Text style={styles.profileName}>
          {" "}
          {user && user.ime} {user && user.prezime}{" "}
        </Text>
        <Text style={styles.profileEmail}> {user && user.email} </Text>
      </View>
      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit")}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            {" "}
            {t("profile-page.text.edit-profile")}{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTitleContainer}>
          <Text style={styles.infoTitle}>{t("profile-page.text.info")}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={18} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.mestoBoravista}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="smartphone" size={18} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.brojTelefona}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="date-range" size={18} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.godine}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: (windowHeight) => ({
    width: "100%",
    height: windowHeight * 0.3,
    position: "relative",
  }),
  backgroundImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logoutButton: {
    position: 'absolute',
    top: verticalScale(30), // Isto visina kao za languageSwitcherContainer
    right: scale(10), // Udaljenost od desne ivice ekrana
    width: scale(110), // Širina dugmeta
    height: scale(40), // Visina dugmeta
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    marginHorizontal: scale(20),
  },
  logoutButtonText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Bold",
    color: COLORS.white,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: scale(10),
  },
  profileImage: {
    height: scale(150),
    width: scale(150),
    borderColor: COLORS.yellow,
    borderWidth: 2,
    marginTop: scale(-80),
  },
  profileName: {
    fontSize: RFValue(22),
    fontFamily: "Montserrat-Bold",
    color: COLORS.yellow,
  },
  profileEmail: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Medium",
    color: COLORS.yellow,
  },
  editButtonContainer: {
    alignItems: "center",
    marginBottom: scale(10),
  },
  editButton: {
    width: scale(160),
    height: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    marginHorizontal: scale(20),
  },
  editButtonText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Bold",
    color: COLORS.white,
  },
  infoContainer: {
    marginLeft: scale(20),
  },
  infoTitleContainer: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "90%",
  },
  infoTitle: {
    fontSize: RFValue(22),
    color: COLORS.yellow,
    fontFamily: "Montserrat-Bold",
  },
  infoItem: {
    flexDirection: "row",
    marginVertical: scale(6),
    alignItems: "center",
  },
  infoText: {
    fontSize: RFValue(15),
    color: COLORS.yellow,
    fontFamily: "Montserrat-Medium",
    marginLeft: scale(4),
  },

  moreButton: {
    position: "absolute",
    top: verticalScale(30),
    right: scale(20),
    padding: moderateScale(8),
    borderRadius: scale(20),
    backgroundColor: COLORS.blue,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menuContainer: {
    position: "absolute",
    top: verticalScale(60),
    right: scale(20),
    backgroundColor: COLORS.white,
    //borderRadius: scale(8),
    elevation: 5,
    paddingVertical: verticalScale(8),
    width: scale(180),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
  },
  menuItemText: {
    marginLeft: scale(10),
    fontSize: RFValue(16),
    fontFamily: "Montserrat-Medium",
    color: COLORS.black,
  },

  // Confirm modal
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBox: {
    backgroundColor: COLORS.white,
    padding: moderateScale(20),
    width: "80%",
    alignItems: "center",
  },
  confirmTitle: {
    fontSize: RFValue(18),
    fontFamily: "Montserrat-Bold",
    marginBottom: verticalScale(10),
    color: COLORS.black,
  },
  confirmMessage: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Medium",
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  confirmActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  cancelBtn: {
    padding: moderateScale(10),
    marginRight: scale(15),
  },
  cancelText: {
    fontSize: RFValue(16),
    fontFamily: "Montserrat-Medium",
    color: COLORS.gray,
  },
  confirmBtn: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    // borderRadius: scale(6),
  },
  confirmText: {
    color: COLORS.white,
    fontWeight: "600",
    fontFamily: "Montserrat-Medium",
    fontSize: RFValue(16),
  },
});