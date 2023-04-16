import { LocalStorageService } from './local-storage.service';
import { Injectable, OnInit } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';

@Injectable({
  providedIn: 'root',
})
export class GifManagerService {
  public gifs: Array<GifMeta> = [];

  constructor(private storage: LocalStorageService) {
    this.gifs = this.storage.loadState();
  }

  private saveState() {
    this.storage.saveState(this.gifs);
  }

  public addGif(gif: GifMeta) {
    if (this.gifs.some((g) => g.id == gif.id)) return false;
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
    this.gifs[index].preview_url = gif.preview_url;
    this.gifs[index].url = gif.url;
    this.saveState();
    return true;
  }
}
