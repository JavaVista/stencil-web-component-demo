import { MARVEL_API } from '../services/api-service';

let searchInitiated = false;


customElements.whenDefined('search-input-component').then(() => {
    const searchInput = document.querySelector('search-input-component');
    const characterCard = document.querySelector('character-card-component');

    searchInput.addEventListener('search', async (event) => {
        if (searchInitiated) {
            return;
        }
        searchInitiated = true;
        const searchTerm = event.detail;
        try {
            const jsonData = await MARVEL_API.fetchCharacter(searchTerm);
            if (!jsonData || !jsonData.data || !jsonData.data.results) {
                throw new Error('Invalid API response');
            }

            // Using setCharacter method to update character data
            characterCard.setCharacter(jsonData.data.results[0]);
        } catch (error) {
            console.error('Error fetching character data:', error);

            // Using setError method to display error message
            characterCard.setError('No characters found or there was an error fetching character data.');
        }
    });
});
