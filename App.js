import React, {useState, useEffect, useContext, useCallback} from 'react';
import {StatusBar, ActivityIndicator, LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/dist/Feather';

import {WEB_CLIENT_ID} from './app/utils/keys';
import {Provider as CardProvider} from './app/context/cardContext';
import {Provider as LocationProvider} from './app/context/locationContext';
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from './app/context/authContext';

import MapScreen from './app/screens/MapScreen';
import FavouriteScreen from './app/screens/FavouriteScreen';
import JobScreen from './app/screens/JobScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import JobFilterScreen from './app/screens/JobFilterScreen';
import colors from './app/colors';
import JobDetailScreen from './app/screens/JobDetailScreen';

LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();
const JobScreenStack = createStackNavigator();
const FavouriteScreenStack = createStackNavigator();

const FavouriteScreenNavigator = () => {
  return (
    <FavouriteScreenStack.Navigator screenOptions={{headerShown: false}}>
      <FavouriteScreenStack.Screen
        name="FavouritesList"
        component={FavouriteScreen}
      />
      <FavouriteScreenStack.Screen
        name="JobDetail"
        component={JobDetailScreen}
      />
    </FavouriteScreenStack.Navigator>
  );
};

const JobScreenNavigator = () => {
  return (
    <JobScreenStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <JobScreenStack.Screen name="JobsStack" component={JobScreen} />
      <JobScreenStack.Screen
        name="JobFilters"
        component={JobFilterScreen}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 400, delay: 400},
            },
            close: {animation: 'timing', config: {duration: 500}},
          },
          cardStyleInterpolator: ({current}) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
            };
          },
        }}
      />
    </JobScreenStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeTabs.Navigator
      tabBarOptions={{
        style: {height: 60, paddingTop: 10, paddingBottom: 10},
        activeTintColor: 'gray',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}>
      <HomeTabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcon
              name="google-maps"
              color={focused ? 'orange' : color}
              size={size}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Jobs"
        component={JobScreenNavigator}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({focused, color, size}) => (
            <Feather
              name="activity"
              color={focused ? '#334de4' : color}
              size={size}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Favourites"
        component={FavouriteScreenNavigator}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({focused, color, size}) => {
            if (focused)
              return (
                <MaterialCommunityIcon name="heart" color="red" size={size} />
              );
            return (
              <MaterialCommunityIcon
                name="heart-outline"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </HomeTabs.Navigator>
  );
};

const NavigationCenter = () => {
  const [initializing, setInitializing] = useState(true);
  const {state, setUser} = useContext(AuthContext);

  const onAuthStateChanged = (user) => {
    console.log('auth state changed => user => ', user);
    if (user && !state.user) {
      setUser(user);
    }
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });

    // unsubscribe on unmount
    return subscriber;
  }, []);

  console.log(initializing);

  if (initializing && state.loggedIn === null)
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1}}
        color={colors.primary}
      />
    );

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent />
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {state.loggedIn ? (
          <RootStack.Screen name="Home" component={HomeNavigator} />
        ) : (
          <RootStack.Screen name="welcome" component={WelcomeScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <CardProvider>
          <NavigationCenter />
        </CardProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;
