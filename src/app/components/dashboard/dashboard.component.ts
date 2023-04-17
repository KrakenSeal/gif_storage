import { MatGridListModule } from '@angular/material/grid-list';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GifMeta } from 'src/app/models/gif-meta.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
import { FinderComponent } from '../finder/finder.component';
import { CardEditorComponent } from '../card-editor/card-editor.component';
import { MatSelectChange } from '@angular/material/select';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(public service: GifManagerService, public dialog: MatDialog) {}

  public ordering = 'custom';
  public searchText = '';

  public get enableDragAndDrop(): boolean {
    return !this.searchText && this.ordering == 'custom';
  }

  public orderingChanged(newValue: MatSelectChange) {
    if (newValue.value == 'date_asc') {
      this.service.gifs.sort((a, b) => (a.addDate?.getTime() ?? 0) - (b.addDate?.getTime() ?? 0));
    }
    if (newValue.value == 'date_desc') {
      this.service.gifs.sort((b, a) => (a.addDate?.getTime() ?? 0) - (b.addDate?.getTime() ?? 0));
    }
  }

  public orderChanged(newOrder: Array<GifMeta>) {
    this.service.orderChanged(newOrder);
  }

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
      // else this.service.downloadGif(gif);
    });
  }

  public cleanStorage() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        caption: 'Confirmation',
        content: 'Are you sure want clear all gifs?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.service.clean();
    });
  }
}
