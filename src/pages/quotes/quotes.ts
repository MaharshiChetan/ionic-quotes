import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuoteService } from '../../services/quotes.service';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quoteGroup: { category: string; quotes: Quote[]; icon: string };

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Favorite Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to favorite the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quoteService.addQuoteToFavorite(selectedQuote);
          },
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          },
        },
      ],
    });
    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFromFavorite(quote);
  }

  isFavorite(quote: Quote) {
    return this.quoteService.isQuoteFavorite(quote);
  }
}
