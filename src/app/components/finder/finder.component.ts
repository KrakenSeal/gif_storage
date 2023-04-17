import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { GifMeta } from 'src/app/models/gif-meta.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  public foundedGifs: Array<GifMeta> = [];

  public query = '';
  public fetchedGifs: Array<GifMeta> = [];
  private queryChanged = new Subject<string>();

  constructor(private gifService: GiphyService, private service: GifManagerService) {
    // TODO: Looks like work fine. But maybe better to refactor
    this.queryChanged.pipe(debounceTime(300)).subscribe((value) => {
      if (value == '')
        gifService.getTrending().subscribe((res) => {
          this.fetchedGifs = res.filter((g) => {
            return !service.gifs.some((gif) => {
              return g.id == gif.id || g.url == gif.url;
            });
          });
        });
      else
        gifService.searchByTag(value).subscribe((res) => {
          this.fetchedGifs = res.filter((g) => {
            return !service.gifs.some((gif) => {
              return g.id == gif.id || g.url == gif.url;
            });
          });
        });
    });
    // TODO: Emmit to
    this.queryChanged.next(this.query);
  }

  public searchInputChanged() {
    this.queryChanged.next(this.query);
  }

  public addGif(gif: GifMeta) {
    this.service.addGif(gif);
  }
}
