// Store is a lightweight shared state library by the stencil core team.
import { createStore } from '@stencil/store';
import { Character } from './Character';

interface StoreState {
    characterData: Character | null;
}

const { state, onChange } = createStore<StoreState>({
    characterData: null,
});

export default {
    state,
    onChange,
};