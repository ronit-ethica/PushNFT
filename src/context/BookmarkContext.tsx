import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { NFTData } from '../types/nftTypes';
import { getBookmarks, toggleBookmark } from '../utils/storage';

type BookmarkContextType = {
  bookmarks: NFTData[];
  toggleBookmark: (nft: NFTData) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<NFTData[]>([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    };
    loadBookmarks();
  }, []);

  const handleToggleBookmark = async (nft: NFTData) => {
    await toggleBookmark(nft);
    const updatedBookmarks = await getBookmarks();
    setBookmarks(updatedBookmarks);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark: handleToggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = React.useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
