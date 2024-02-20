import { ApiService } from '../src/services/ApiService';

export class AVApiService implements ApiService {
    async fetchStockData(symbol: string): Promise<any> {
        const apiKey = process.env.AV_KEY;
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Information && data.Information.includes('Thank you for using Alpha Vantage!')) {
                throw new Error('API rate limit exceeded');
            }

            if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
                throw new Error('Invalid symbol or no price data available');
            }

            // Convert the price to a number before returning
            return { price: +data['Global Quote']['05. price'] };
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw error; // Rethrow to handle it in the component
        }
    }

    async searchStocksData(keyword: string): Promise<any> {
        const apiKey = process.env.AV_KEY;
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data['Information'] && data.Information.includes('Thank you for using Alpha Vantage!')) {
                throw new Error('API rate limit exceeded');
            }

            if (!data['bestMatches']) {
                throw new Error('No matches found');
            }

            // Transforming the search results to match the expected format
            const matches = data['bestMatches'].map(match => ({
                symbol: match['1. symbol'],
                name: match['2. name']
            }));

            return matches;
        } catch (error) {
            console.error('Error searching stock symbols:', error);
            throw error; // Rethrow to handle it in the component
        }
    }
}

// manually initializing it for testing purposes
export const AV_API = new AVApiService();