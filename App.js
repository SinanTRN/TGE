import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import{CategoryProvider} from "./src/services/category/CategoryContext";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import {
    useFonts as useOswald,
    Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import CategoryScreen from "./src/screens/CategoryScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AuthenticationContextProvider from "./src/services/authentication/AuthenticationContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Menu = () => {
    return <Text>Menu</Text>;
};
const Map = () => {
    return <Text>Map</Text>;
};

const MainTabs=()=>(
    <Tab.Navigator id={1}
                   screenOptions={({ route }) => ({
                       tabBarIcon: ({ color, size }) => {
                           let iconName;

                           if (route.name === "Home") {
                               iconName = "home";
                           } else if (route.name === "Categories") {
                               iconName ="file-tray-stacked-sharp";
                           } else if (route.name === "Map") {
                               iconName = "map";
                           }
                           else if (route.name === "Menu") {
                               iconName = "list-sharp";
                           }

                           // You can return any component that you like here!
                           return <Ionicons name={iconName} size={size} color={color} />;
                       },
                       tabBarActiveTintColor: "tomato",
                       tabBarInactiveTintColor: "gray",
                   })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoryScreen} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
);

export default function App() {
    const [oswaldLoaded] = useOswald({
        Oswald_400Regular,
    });

    const [latoLoaded] = useLato({
        Lato_400Regular,
    });

    if (!oswaldLoaded || !latoLoaded) {
        return null;
    }
    return (
        <AuthenticationContextProvider>
            <CategoryProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Main" component={MainTabs} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CategoryProvider>
        </AuthenticationContextProvider>
    );
}
