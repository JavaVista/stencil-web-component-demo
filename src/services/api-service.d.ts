declare const AV_KEY: string;

declare const MARVEL_API: {
    fetchCharacter: (characterName: string) => Promise<any>;
    fetchCharactersThatStartWith: (characterName: string) => Promise<any>;
};

export { AV_KEY, MARVEL_API };