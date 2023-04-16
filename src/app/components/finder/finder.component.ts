import { Component } from '@angular/core';
import { GifMeta } from 'src/app/models/gif-meta.model';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  public foundedGifs: Array<GifMeta> = [];

  constructor() {
    this.generateTestData();
  }

  private generateTestData() {
    this.foundedGifs = [];
    const urls = [
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200w_s.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200w_s.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/giphy-preview.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=giphy-preview.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200_d.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200_d.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/100.mp4?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=100.mp4&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200w.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200w.gif&ct=g',
    ];
    const count = 13;
    for (let i = 0; i < count; i++) {
      this.foundedGifs.push({
        id: 'id_' + i,
        name: 'Gif_' + i,
        url: urls[i % urls.length],
      });
    }
  }
}
