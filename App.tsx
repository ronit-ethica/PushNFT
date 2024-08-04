import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import NFTDetailScreen from './src/screens/NFTDetailScreen'; // Import the new screen
import { BookmarkProvider } from './src/context/BookmarkContext';
import { NFTData } from './src/types/nftTypes'; // Make sure to import your NFTData type

export type RootStackParamList = {
  Home: undefined;
  NFTDetail: { nftData: NFTData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <BookmarkProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{animation: 'none'}}>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="NFTDetail" 
            component={NFTDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BookmarkProvider>
  );
};

export default App;