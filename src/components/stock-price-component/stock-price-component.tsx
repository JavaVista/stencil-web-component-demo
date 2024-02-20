import { Component, State, h, Prop, Watch, Listen } from '@stencil/core';
//import { AV_KEY } from '../../services/api-service';//
import { ApiService } from '../../services/ApiService';
import { AV_API } from '../../../test_api_services/av-api-service';

@Component({
  tag: 'stock-price-component',
  styleUrl: 'stock-price-component.css',
  shadow: true,
})
export class StockPriceComponent {
  @Prop() apiService?: ApiService;
  @Prop({ mutable: true, reflect: true }) stockSymbol: string;
  @State() stockPrice: number;
  @State() stockUserInput: string;
  stockInput: HTMLInputElement;
  @State() stockInputValid: boolean = false;
  @State() error: string;
  @State() loading = false;

  // Temporary Initialization of apiService for Development Purposes
  // TODO: Remove this when apiService is fully implemented
  // remove the this.effectiveApiService from the calls and add this.apiService instead
  private internalApiService: ApiService = AV_API;
  get effectiveApiService(): ApiService {
    return this.apiService || this.internalApiService;
  }

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
    this.stockUserInput = this.stockSymbol;
    this.stockInputValid = true;
  }

  componentWillLoad() {
    if (!this.apiService) {
      console.warn("Component requires 'apiService' prop to function correctly.");
    }
    this.loading = true;
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  @Listen('stockSelected', { target: 'body' })
  onSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  async fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    try {
      const data = await this.effectiveApiService.fetchStockData(stockSymbol);
      this.error = null;
      this.stockPrice = data.price;
    } catch (error) {
      this.error = error.message;
      this.stockPrice = null;
    } finally {
      this.loading = false;
    }
  }

  hostData() {
    return {
      class: this.error ? 'error' : '',
    };
  }

  render() {
    let dataContent = <p>Enter a Stock symbol</p>;
    if (this.error) {
      dataContent = <p class="error-text">{this.error}</p>;
    }
    if (this.stockPrice) {
      dataContent = (
        <p>
          {this.stockSymbol} - Stock price: ${this.stockPrice}
        </p>
      );
    }
    if (this.loading) {
      dataContent = <spinner-component class="spinner-wrapper"></spinner-component>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input type="text" placeholder="Symbol" id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>
          Get Price
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
