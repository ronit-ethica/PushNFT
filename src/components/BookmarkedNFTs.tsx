import React from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import NFTCard from './NFTCard';
import { useBookmarks } from '../context/BookmarkContext';

const BookmarkedNFTs: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  const renderContent = () => {
    if (bookmarks.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarked NFTs yet.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <NFTCard
            nftData={item}
            isBookmarked={true}
            onToggleBookmark={() => toggleBookmark(item)}
          />
        )}
        keyExtractor={(item, index) => `${item.nft_data.token_id}-${index}`}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#25252d',
  },
  container: {
    flex: 1,
    backgroundColor: '#25252d',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'TitilliumWeb-Bold'
  },
});

export default BookmarkedNFTs;