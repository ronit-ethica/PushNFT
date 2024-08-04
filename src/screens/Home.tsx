import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NFT from '../components/NFT';
import BookmarkedNFTs from '../components/BookmarkedNFTs';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen 
        name="NFTs"
        component={NFT}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarkedNFTs}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Home;