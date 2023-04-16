import { LocalStorageService } from './local-storage.service';
import { Injectable, OnInit } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';
import { nanoid } from 'nanoid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GifManagerService {
  public gifs: Array<GifMeta> = [];

  constructor(private storage: LocalStorageService, private http: HttpClient) {
    this.gifs = this.storage.loadState();
  }

  private saveState() {
    this.storage.saveState(this.gifs);
  }

  private generateId(): string {
    return nanoid(13);
  }

  public addGif(gif: GifMeta) {
    if (this.gifs.some((g) => g.id == gif.id)) return false;
    if (gif.id) gif.id = this.generateId();
    gif.addDate = new Date();
    this.gifs.push(gif);

    this.saveState();
    return true;
  }

  public removeGif(gif: GifMeta) {
    const index = this.gifs.findIndex((g) => g.id == gif.id);
    if (index == -1) return false;
    this.gifs.slice(index, 1);
    this.saveState();
    return true;
  }

  public update(gif: GifMeta) {
    const index = this.gifs.findIndex((g) => g.id == gif.id);
    if (index == -1) return false;
    this.gifs[index].name = gif.name;
    this.gifs[index].previewUrl = gif.previewUrl;
    this.gifs[index].url = gif.url;
    this.saveState();
    return true;
  }

  public downloadGif(gif: GifMeta) {
    this.downloadImage(gif.url, gif.name ?? 'bestgif.gif');
  }

  public orderChanged(newOrder: Array<GifMeta>) {
    this.gifs = newOrder;
    this.saveState();
  }

  private downloadImage(url: string, filename: string): void {
    // const blob = new Blob([data], { type: 'text/csv' });
    // const url= window.URL.createObjectURL(blob);
    // window.open(url);
    this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      // Trigger the download by simulating a click on the anchor element
      link.click();
    });
  }
}
