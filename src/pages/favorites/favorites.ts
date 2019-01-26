import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuoteService } from '../../services/quotes.service';
import { SettingsService } from '../../services/settings.service';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];
  quote: boolean;

  constructor(
    private quoteService: QuoteService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) {}

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavoriteQuotes();
    this.quote = this.quotes.length > 0 ? true : false;
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create('QuotePage', quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFromFavorite(quote);
    this.quotes = this.quoteService.getFavoriteQuotes();
    this.quote = this.quotes.length > 0 ? true : false;
  }

  getBackground() {
    return this.settingsService.isAltBackground()
      ? 'altQuoteBackground'
      : 'quoteBackground';
  }
}
