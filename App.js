import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {CardStyleInterpolators, createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign'
import * as SplashScreen from 'expo-splash-screen'
import { useState } from "react";

import {
    useFonts as useOswald,
    Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import AuthenticationContextProvider, {
    AuthenticationContext,
} from "./src/services/authentication/AuthenticationContext";
import { CategoryProvider } from "./src/services/category/CategoryContext";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

import {useContext, useEffect} from "react";
import ProfileScreen from "./src/screens/ProfileScreen";
import MapScreen from "./src/screens/MapScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Menu = () => <Text>Menu</Text>;
const Map = () => <Text>Map</Text>;

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") return <AntDesign name="home" size={size} />
                else if (route.name === "Categories") iconName = "file-tray-stacked-sharp";
                else if (route.name === "Map") iconName = "map";
                else if (route.name === "Menu") iconName = "list-sharp";
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoryScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
);

const AppNavigator = () => {
    const { user, isLoading } = useContext(AuthenticationContext);

    if (isLoading) return null;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ScaleFromCenterAndroid,  // Spread ile açıyoruz
            }}
        >
            {user ? (
                <Stack.Screen name="Main" component={MainTabs} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                        }}
                    />
                </>
            )}
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};
export default function App() {
    const [oswaldLoaded] = useOswald({ Oswald_400Regular });
    const [latoLoaded] = useLato({ Lato_400Regular });
    const [appIsReady, setAppIsReady] = useState(false); // ← Koşulun üstüne alındı

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                // await loadFonts(); gibi işlemler buraya
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        if (appIsReady) {
            setTimeout(() => {
                SplashScreen.hideAsync();
            }, 2000);

        }
    }, [appIsReady]);

    // Şimdi bu koşulda herhangi bir hook çağrılmıyor, sadece render'ı durduruyor
    if (!oswaldLoaded || !latoLoaded || !appIsReady) {
        return null;
    }

    return (
        <AuthenticationContextProvider>
            <CategoryProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
                <StatusBar style="auto" />
            </CategoryProvider>
        </AuthenticationContextProvider>
    );
}

