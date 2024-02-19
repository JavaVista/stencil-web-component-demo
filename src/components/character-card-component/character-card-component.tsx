import { Component, Method, Prop, State, h } from '@stencil/core';
import store from '../../services/store';
import { Character } from '../../services/Character';

@Component({
  tag: 'character-card-component',
  styleUrl: 'character-card-component.css',
  shadow: true,
})
export class CharacterCardComponent {
  @Prop({ mutable: true }) character?: Character;
  @State() error: string;

  // Set character data and clear previous error
  @Method()
  async setCharacter(data) {
    if (data) {
      this.character = data;
      this.error = null;
    } else {
      this.setError('No character name provided.');
    }
  }

  // Method to set error message
  @Method()
  async setError(message: string) {
    this.error = message;
    this.character = null; // Clear character data if there's an error
  }

  componentWillLoad() {
    store.onChange('characterData', data => {
      this.setCharacter(data);
    });
  }

  render() {
    if (this.error) {
      return <div class="error-message">{this.error}</div>;
    }
    if (!this.character || !this.character.thumbnail) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.error ? (
          <div class="error-message">{this.error}</div>
        ) : (
          <div class="card-container">
            <div class="character-image">
              <img src={`${this.character.thumbnail.path}.${this.character.thumbnail.extension}`} alt={this.character.name} />
            </div>
            <h3 class="character-name">{this.character.name}</h3>
            <div class="character-desc">{this.character.description}</div>
          </div>
        )}
      </div>
    );
  }
}
