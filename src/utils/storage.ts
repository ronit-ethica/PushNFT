import AsyncStorage from '@react-native-async-storage/async-storage';
import { NFTData } from '../types/nftTypes';

const BOOKMARKS_KEY = 'nft_bookmarks';

export const getBookmarks = async (): Promise<NFTData[]> => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const setBookmarks = async (bookmarks: NFTData[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error setting bookmarks:', error);
  }
};

export const toggleBookmark = async (nft: NFTData): Promise<void> => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.some(item => item.nft_data.token_id === nft.nft_data.token_id)
    ? bookmarks.filter(item => item.nft_data.token_id !== nft.nft_data.token_id)
    : [...bookmarks, nft];
  await setBookmarks(updatedBookmarks);
};
