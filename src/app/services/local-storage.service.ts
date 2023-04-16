import { Injectable } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly KEY: string = 'GifStorage';
  constructor() {}

  public saveState(gifs: Array<GifMeta>) {
    localStorage.setItem(this.KEY, JSON.stringify(gifs));
  }

  public loadState(): Array<GifMeta> {
    const result = localStorage.getItem(this.KEY);
    if (!result) return [];
    const res: Array<GifMeta> = JSON.parse(result);
    res.forEach((e) => {
      e.addDate = new Date(e.addDate ?? 0);
    });
    return res;
  }

  public cleanState() {
    localStorage.removeItem(this.KEY);
  }
}
