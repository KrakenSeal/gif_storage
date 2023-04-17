import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';
import { nanoid } from 'nanoid';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GifManagerService {
  public gifs: Array<GifMeta> = [];

  constructor(private storage: LocalStorageService, private http: HttpClient, private _snackBar: MatSnackBar) {
    this.gifs = this.storage.loadState();
  }

  private saveState() {
    this.storage.saveState(this.gifs);
  }

  private generateId(): string {
    return nanoid(13);
  }

  private showNotification(message: string) {
    this._snackBar.open(message);
  }

  public addGif(gif: GifMeta) {
    if (this.gifs.some((g) => g.url == gif.url)) {
      this.showNotification('Gif was already added. Ignore');
      return false;
    }
    if (gif.id) gif.id = this.generateId();
    gif.addDate = new Date();
    this.gifs.push(gif);
    this.showNotification('Gif added');
    this.saveState();
    return true;
  }

  public removeGif(gif: GifMeta) {
    const index = this.gifs.findIndex((g) => g.id == gif.id || g.url == gif.url);
    if (index == -1) {
      this.showNotification('Cannot found gif. Ignore');
      return false;
    }
    this.gifs.splice(index, 1);
    this.saveState();
    this.showNotification('Gif successfully deleted');
    return true;
  }

  public update(gif: GifMeta) {
    const index = this.gifs.findIndex((g) => g.id == gif.id || g.url == gif.url);
    if (index == -1) {
      this.showNotification('Cannot found gif. Ignore');
      return false;
    }
    this.gifs[index].name = gif.name;
    this.gifs[index].previewUrl = gif.previewUrl;
    this.gifs[index].url = gif.url;
    this.saveState();
    this.showNotification('Gif successfully updated');
    return true;
  }

  public downloadGif(gif: GifMeta) {
    this.downloadImage(gif.url, gif.name ?? 'bestgif.gif');
  }

  public orderChanged(newOrder: Array<GifMeta>) {
    this.gifs = newOrder;
    this.saveState();
  }

  public clean() {
    this.gifs = [];
    this.storage.cleanState();
    this.showNotification('Storage cleaned');
  }

  private downloadImage(url: string, filename: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      // Trigger the download by simulating a click on the anchor element
      link.click();
    });
  }
}
