import { Injectable } from '@angular/core';
import { GifMeta } from '../models/gif-meta.model';
import { Observable, from, map, of } from 'rxjs';
import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  // TODO: Change to input api
  private readonly API_KEY: string = 'PcflcV556qx9GFDoj5kqcv35B1CsDl62';
  private readonly DEFAULT_LIMIT: number = 25;
  private giphyService: GiphyFetch;

  constructor() {
    this.giphyService = new GiphyFetch(this.API_KEY);
  }

  public searchByTag(tag: string, limit = this.DEFAULT_LIMIT, offset = 0): Observable<Array<GifMeta>> {
    return from(
      this.giphyService.search(tag, {
        limit: limit,
        offset: offset,
      })
    ).pipe(
      map((response) => {
        return response.data.map((gifInfo) => ({
          id: gifInfo.id.toString(),
          name: gifInfo.title,
          url: gifInfo.bitly_gif_url,
          preview_url: gifInfo.images.preview_gif.url,
        }));
      })
    );
  }

  public getTrending(limit = this.DEFAULT_LIMIT, offset = 0): Observable<Array<GifMeta>> {
    return from(
      this.giphyService.trending({
        limit: limit,
        offset: offset,
      })
    ).pipe(
      map((response) => {
        return response.data.map((gifInfo) => ({
          id: gifInfo.id.toString(),
          name: gifInfo.title,
          url: gifInfo.bitly_url,
          preview_url: gifInfo.images.preview_gif.url,
        }));
      })
    );
  }
}
