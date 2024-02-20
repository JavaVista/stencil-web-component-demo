export interface ApiService {
    fetchCharacter?: (characterName: string) => Promise<any>;
    fetchCharactersThatStartWith?: (characterName: string) => Promise<any>;
    fetchStockData?: (symbol: string) => Promise<any>;
    searchStocksData?: (symbol: string) => Promise<any>;
}