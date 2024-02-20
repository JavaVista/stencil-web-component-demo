// src/services/api-service.ts
import md5 from 'md5';
import { ApiService } from '../src/services/ApiService';

export class MarvelApiService implements ApiService {
    async fetchCharacter(characterName: string): Promise<any> {
        const ts = new Date().getTime();
        const publicKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;
        const hash = md5(ts + privateKey + publicKey);
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${characterName}`;
        const response = await fetch(url);
        return response.json();
    }

    async fetchCharactersThatStartWith(characterName: string): Promise<any> {
        const ts = new Date().getTime();
        const publicKey = process.env.PUBLIC_KEY;
        const privateKey = process.env.PRIVATE_KEY;
        const hash = md5(ts + privateKey + publicKey);
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${characterName}`;
        const response = await fetch(url);
        return response.json();
    }
}

// manually initializing it for testing purposes
export const MARVEL_API = new MarvelApiService();
