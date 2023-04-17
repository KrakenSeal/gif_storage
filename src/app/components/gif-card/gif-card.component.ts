import { Component, Input } from '@angular/core';
import { GifMeta } from 'src/app/models/gif-meta.model';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.scss'],
})
export class GifCardComponent {
  @Input() gif?: GifMeta;

  public showHeader = false;
  constructor() {}
}
