import { Injectable } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';

@Injectable({
  providedIn: 'root'
})
export class GifManagerService {
  public savedGifs:Array<GifMeta>;
  constructor() {
    this.savedGifs = [];
  }



}
