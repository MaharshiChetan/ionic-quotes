import { Quote } from '../data/quote.interface';

export class QuoteService {
  private favoritesQuotes: Quote[] = [];

  addQuoteToFavorite(quote: Quote) {
    this.favoritesQuotes.push(quote);
  }

  removeQuoteFromFavorite(quote: Quote) {
    const position = this.favoritesQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.favoritesQuotes.splice(position, 1);
  }

  getFavoriteQuotes() {
    return this.favoritesQuotes.slice();
  }

  isQuoteFavorite(quote: Quote) {
    return this.favoritesQuotes.find((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
  }
}
