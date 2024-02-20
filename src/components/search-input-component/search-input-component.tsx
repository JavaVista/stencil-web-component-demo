import { Component, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';
//import { MARVEL_API } from '../../services/api-service';
import store from '../../services/store';
import { ApiService } from '../../services/ApiService';
import { MARVEL_API } from '../../../test_api_services/marvel-api-services';

@Component({
  tag: 'search-input-component',
  styleUrl: 'search-input-component.css',
  shadow: true,
})
export class SearchInputComponent {
  // apiService prop allows for dependency injection of a service implementing the ApiService interface
  @Prop() apiService?: ApiService;

  @Prop() value: string = '';
  @State() autocompleteResults: any[] = [];
  @State() showAutocomplete: boolean = false;

  @Event({ bubbles: true, composed: true }) search: EventEmitter<string>;

  private searchInput!: HTMLInputElement;

  // Temporary Initialization of apiService for Development Purposes
  // remove the this.effectiveApiService from the calls
  // TODO: Remove this when apiService is fully implemented
  private internalApiService: ApiService = MARVEL_API;
  get effectiveApiService(): ApiService {
    return this.apiService || this.internalApiService;
  }

  componentWillLoad() {
    if (!this.apiService) {
      console.warn("Component requires 'apiService' prop to function correctly.");
    }
  }

  private async autocomplete() {
    const input = this.searchInput.value.trim();
    if (input.length < 1) {
      this.showAutocomplete = false;
      return;
    }

    try {
      const jsonData = await this.effectiveApiService.fetchCharactersThatStartWith(input);
      if (!jsonData || !jsonData.data || !jsonData.data.results.length) {
        this.autocompleteResults = [{ name: 'No characters found' }];
        this.showAutocomplete = true;
        return;
      }

      this.autocompleteResults = jsonData.data.results;
      this.showAutocomplete = true;
    } catch (error) {
      console.error('Failed to fetch autocomplete suggestions:', error);
    }
  }

  private clearAutocomplete() {
    this.autocompleteResults = [];
    this.showAutocomplete = false;
  }

  private setSearchValue(name: string) {
    this.searchInput.value = name;
    this.clearAutocomplete();
    this.search.emit(name);
  }

  @Listen('search')
  async handleSearch(event: CustomEvent) {
    const response = await this.effectiveApiService.fetchCharacter(event.detail);
    if (response.data && response.data.results && response.data.results.length > 0) {
      store.state.characterData = response.data.results[0];
    } else {
      console.log('No character found for:', event.detail);
      store.state.characterData = null;
    }
  }

  render() {
    return (
      <div class="input-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search character"
          value={this.value}
          onKeyUp={() => this.autocomplete()}
          ref={el => (this.searchInput = el as HTMLInputElement)}
        />
        <button
          id="submit-button"
          onClick={() => {
            this.search.emit(this.searchInput.value);
          }}
        >
          Submit
        </button>
        <div class={{ 'list-container': true, 'show': this.showAutocomplete }}>
          {this.autocompleteResults.map(result => (
            <div
              class="autocomplete-items"
              onClick={() => {
                this.setSearchValue(result.name);
              }}
            >
              {result.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
