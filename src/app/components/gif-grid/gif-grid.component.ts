import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GifMeta } from 'src/app/models/gif-meta.model';

@Component({
  selector: 'app-gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.scss'],
})
export class GifGridComponent {
  @Input() gifs: Array<GifMeta> = [];

  @Output() gifAddEmmiter: EventEmitter<GifMeta> = new EventEmitter<GifMeta>();

  constructor() {}

  public containerClick(clickedGif: GifMeta) {
    this.gifAddEmmiter.emit(clickedGif);
  }
}
