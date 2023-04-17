import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GifMeta } from 'src/app/models/gif-meta.model';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.scss'],
})
export class CardEditorComponent {
  public name = '';
  public url = '';
  public preview = '';
  constructor(@Inject(MAT_DIALOG_DATA) public gif?: GifMeta) {
    if (gif) {
      this.name = gif.name ?? '';
      this.url = gif.url;
      this.preview = gif.previewUrl ?? '';
    }
  }

  public genGif(action: string): any {
    return {
      action: action,
      gif: {
        id: this.gif?.id,
        name: this.name,
        url: this.url,
        previewUrl: this.preview ? this.preview : this.url,
        addDate: this.gif?.addDate,
      },
    };
  }
}
