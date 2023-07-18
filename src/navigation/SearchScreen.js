import SinglePost from '../views/ProfilPost/SinglePost';
import Settings from '../views/Settings/Settings';
import SingleSearch from '../views/ProfilPost/SingleSearch';
import Search from '../views/Search/Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SearchScreen = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
                name="SingleSearch"
                component={SingleSearch}
            />
        </Stack.Navigator>
    );
};

export default SearchScreen;

