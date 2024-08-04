import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import NFTCard from './NFTCard';
import { fetchNFTMetadata } from '../api/nftApi';
import { NFTData } from '../types/nftTypes';
import { useBookmarks } from '../context/BookmarkContext';

const NFT: React.FC = () => {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const { bookmarks, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const loadNFTData = async () => {
      setLoading(true);
      const data = await fetchNFTMetadata(page);
      setNftData(prevData => [...prevData, ...data.data.items]);
      setLoading(false);
    };
    loadNFTData();
  }, [page]);

  const renderItem = ({ item }: { item: NFTData }) => (
    <NFTCard
      nftData={item}
      isBookmarked={bookmarks.some(bookmark => bookmark.nft_data.token_id === item.nft_data.token_id)}
      onToggleBookmark={() => toggleBookmark(item)}
    />
  );

  const loadMoreNFTs = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && page === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={'#25252d'}/>
      <FlatList
        data={nftData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.nft_data.token_id}-${index}`}
        onEndReached={loadMoreNFTs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        contentContainerStyle={styles.flatListContent}
    />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
    backgroundColor: '#25252d'
  },
});

export default NFT;
