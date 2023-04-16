import { Injectable } from '@angular/core';
import * as giphyApi from 'giphy-api';
import { Giphy } from 'giphy-api';
import { GifMeta } from '../models/gif-meta.model';
import { Observable, from, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private giphyService:Giphy;
  constructor() {
    // TODO: Change to input api
    this.giphyService = giphyApi('PcflcV556qx9GFDoj5kqcv35B1CsDl62');
  }

  public search(name:string):Observable<Array<GifMeta>>{
    return from(this.giphyService.search(name))
    .pipe(
      map(e => {
        return e.data.map(gif => ({
          id:gif.id,
          url:gif.url,
        }));
      })
    )
  }


}
