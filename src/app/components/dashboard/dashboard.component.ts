import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GifMeta } from 'src/app/models/gif-meta.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
import { FinderComponent } from '../finder/finder.component';
import { CardEditorComponent } from '../card-editor/card-editor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(public service: GifManagerService, public dialog: MatDialog) {}

  public openFinder() {
    console.log('Open finder action');
    this.dialog.open(FinderComponent, {
      height: '80%',
      width: '80%',
    });
  }

  public openGifDialog() {
    console.log('Open editor action');
    const dialogRef = this.dialog.open(CardEditorComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.service.addGif(result);
      console.log(result);
    });
  }

  public editGif(gif: GifMeta) {
    const dialogRef = this.dialog.open(CardEditorComponent, { data: gif });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.service.update(result);
      // TODO: move it in another place
      else this.service.downloadGif(gif);
    });
  }
}
