import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useBookmarks} from '../context/BookmarkContext';
import {RootStackParamList} from '../../App';

type NFTDetailScreenRouteProp = RouteProp<RootStackParamList, 'NFTDetail'>;
type NFTDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NFTDetail'
>;

type Props = {
  route: NFTDetailScreenRouteProp;
  navigation: NFTDetailScreenNavigationProp;
};

const NFTDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {nftData} = route.params;
  const {bookmarks, toggleBookmark} = useBookmarks();

  const {
    nft_data: {token_id, current_owner, external_data},
  } = nftData;

  const name = external_data?.name || 'Unnamed NFT';
  const description = external_data?.description || 'No description available';
  const imageUrl =
    external_data?.image_1024 ||
    external_data?.asset_url ||
    'http://via.placeholder.com/1920x1024';

  const isBookmarked = bookmarks.some(
    bookmark => bookmark.nft_data.token_id === token_id,
  );

  const handleToggleBookmark = () => {
    toggleBookmark(nftData);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="chevron-left" size={30} color="#ffffff" />
      </TouchableOpacity>
      <ScrollView>
        <Image
          source={{uri: imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
              onPress={handleToggleBookmark}
              style={styles.bookmarkButton}>
              <Icon
                name={isBookmarked ? 'bookmark' : 'bookmark-border'}
                size={24}
                color={isBookmarked ? '#FFD700' : '#ffffff'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.tokenId}>Token ID: {token_id}</Text>
          <Text style={styles.owner}>Current Owner: {current_owner}</Text>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          {external_data?.attributes && (
            <>
              <Text style={styles.sectionTitle}>Attributes</Text>
              {external_data.attributes.map((attr, index) => (
                <View key={index} style={styles.attributeContainer}>
                  <Text style={styles.attributeType}>
                    {capitalizeFirstLetter(attr.trait_type)}
                  </Text>
                  <Text style={styles.attributeValue}>{attr.value}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25252d',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 24,
    flex: 1,
    color: '#ffffff',
  },
  tokenId: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  owner: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#ffffff',
  },
  description: {
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#ffffff',
  },
  attributeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  attributeType: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 14,
    color: '#cccccc',
  },
  attributeValue: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  bookmarkButton: {
    padding: 10,
  },
});

export default NFTDetailScreen;
