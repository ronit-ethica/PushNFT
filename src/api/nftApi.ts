import { NFTData } from '../types/nftTypes';

const CONTRACT_ADDRESS = '0x8821bee2ba0df28761afff119d66390d594cd280';
const PAGE_SIZE = 10;
const TOKEN = 'cqt_rQ4rjPvbKdDRJCTVHyDWxdhH4hPp';

export const fetchNFTMetadata = async (page: number): Promise<{ data: { items: NFTData[] } }> => {
  const response = await fetch(`https://api.covalenthq.com/v1/eth-mainnet/nft/${CONTRACT_ADDRESS}/metadata/?page-size=${PAGE_SIZE}&page-number=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(TOKEN + ':')}`
    }
  });
  const data = await response.json();
  return data;
};