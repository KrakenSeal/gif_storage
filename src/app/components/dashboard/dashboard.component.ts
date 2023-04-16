import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GifMeta } from 'src/app/models/gif-meta.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
import { FinderComponent } from '../finder/finder.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public gifColleciton: Array<GifMeta> = [];

  constructor(public service: GifManagerService, public dialog: MatDialog) {
    this.generateTestData();
  }

  public openFinder() {
    console.log('Open finder action');
    const dialogRef = this.dialog.open(FinderComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ${result}');
    });
  }

  private generateTestData() {
    this.gifColleciton = [];
    const urls = [
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200w_s.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200w_s.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/giphy-preview.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=giphy-preview.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200_d.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200_d.gif&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/100.mp4?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=100.mp4&ct=g',
      'https://media1.giphy.com/media/11RbjV7ikqUFMUK7tI/200w.gif?cid=e0896da60d5a714c8269a7f1b9a24376f16121124a65ef1f&rid=200w.gif&ct=g',
    ];
    const count = 13;
    for (let i = 0; i < count; i++) {
      this.gifColleciton.push({
        id: 'id_' + i,
        name: 'Gif_' + i,
        url: urls[i % urls.length],
      });
    }
  }
}
