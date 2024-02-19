import { Component, State, h, Event, EventEmitter } from '@stencil/core';
import { AV_KEY } from '../../services/api-service';

type Search = {
  symbol: string;
  name: string;
};

@Component({
  tag: 'stock-finder-component',
  styleUrl: 'stock-finder-component.css',
  shadow: true,
})
export class StockFinderComponent {
  @Event({ bubbles: true, composed: true }) stockSelected: EventEmitter<string>;
  @State() searchResults: Search[] = [];
  @State() error: string;
  @State() loading = false;
  @State() searchQuery: string = '';

  handleInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.searchQuery;
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data['Information'] && data['Information'].includes('Thank you for using Alpha Vantage!')) {
          throw new Error('API rate limit exceeded');
        }
        if (!data['bestMatches']) {
          throw new Error('No matches found');
        }
        this.searchResults = data['bestMatches'].map(match => ({ symbol: match['1. symbol'], name: match['2. name'] }));
        this.error = null;
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.searchResults = [];
        this.loading = false;
      });
  }

  onSelectStock(symbol: string) {
    this.stockSelected.emit(symbol);
  }

  hostData() {
    return {
      class: this.error ? 'error' : '',
    };
  }

  render() {
    let dataContent = <p>Search for a Stock symbol</p>;
    if (this.error) {
      dataContent = <p class="error-text">{this.error}</p>;
    }
    if (this.searchResults?.length > 0) {
      dataContent = <p class="success-text">Here are your search results</p>;
    }
    if (this.loading) {
      dataContent = <spinner-component class="spinner-wrapper"></spinner-component>;
    }
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input type="text" value={this.searchQuery} onInput={this.handleInput.bind(this)} />
        <button disabled={!this.searchQuery || this.loading} type="submit">
          Find Stock
        </button>
      </form>,
      <ul>
        {this.searchResults?.map(result => (
          <li onClick={this.onSelectStock.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>,
      ,
      <div>{dataContent}</div>,
    ];
  }
}
