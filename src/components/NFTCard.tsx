import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { NFTData } from '../types/nftTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';

interface NFTCardProps {
  nftData: NFTData;
  isBookmarked: boolean;
  onToggleBookmark: (tokenId: string) => void;
}

type NFTCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const NFTCard: React.FC<NFTCardProps> = ({ nftData, isBookmarked, onToggleBookmark }) => {
  const navigation = useNavigation<NFTCardNavigationProp>();
  const {
    nft_data: {
      token_id,
      current_owner,
      external_data,
    },
  } = nftData;
  
  const name = external_data?.name || 'Unnamed NFT';
  const imageUrl = external_data?.image_1024 || external_data?.asset_url || 'http://via.placeholder.com/1920x1024';

  const handleCardPress = () => {
    navigation.navigate('NFTDetail', { nftData });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image} resizeMode='cover' imageStyle={{ borderRadius: 20 }}>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => onToggleBookmark(token_id)}
          >
            <Icon
              name={isBookmarked ? 'bookmark' : 'bookmark-border'}
              size={24}
              color={isBookmarked ? '#FFD700' : '#ffffff'}
            />
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.owner}>Current Owner: {current_owner}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    maxHeight: 600,
  },
  image: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.4,
    borderRadius: 20,
  },
  detailsContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    margin: 16
  },
  details: {
    padding: 16,
    zIndex: 2,
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
    color: '#fdfdfd',
    fontFamily: 'TitilliumWeb-Bold',
  },
  owner: {
    fontSize: 14,
    color: '#fdfdfd',
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    zIndex: 3,
  },
});

export default NFTCard;
