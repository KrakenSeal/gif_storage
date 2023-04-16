import { Injectable } from '@angular/core';
import * as giphyApi from 'giphy-api';
import { Giphy } from 'giphy-api';
import { GifMeta } from '../models/gif-meta.model';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  // TODO: Change to input api
  private readonly API_KEY: string = 'PcflcV556qx9GFDoj5kqcv35B1CsDl62';
  private readonly DEFAULT_LIMIT: number = 25;
  private giphyService: Giphy;

  constructor() {
    this.giphyService = giphyApi(this.API_KEY);
  }

  public searchByTag(tag: string, limit = this.DEFAULT_LIMIT, offset = 0): Observable<Array<GifMeta>> {
    return from(
      this.giphyService.search({
        q: tag,
        limit: limit,
        offset: offset,
        rating: 'g',
      })
    ).pipe(
      map((response) => {
        return response.data.map((gifInfo) => ({
          id: gifInfo.id,
          name: gifInfo.title,
          url: gifInfo.bitly_url,
          preview_url: gifInfo.images.preview_gif.url,
        }));
      })
    );
  }

  public getTrending(limit = this.DEFAULT_LIMIT): Observable<Array<GifMeta>> {
    return from(
      this.giphyService.trending({
        limit: limit,
        rating: 'g',
      })
    ).pipe(
      map((response) => {
        return response.data.map((gifInfo) => ({
          id: gifInfo.id,
          name: gifInfo.title,
          url: gifInfo.bitly_url,
          preview_url: gifInfo.images.preview_gif.url,
        }));
      })
    );
  }
}
