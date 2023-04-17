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
    this.dialog.open(FinderComponent, {
      minWidth: '500px',
      minHeight: '500px',
      maxWidth: '1000px',
      maxHeight: '1000px',
    });
  }

  public openGifDialog() {
    const dialogRef = this.dialog.open(CardEditorComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'save':
            this.service.addGif(result.gif);
            break;
        }
      }
    });
  }

  public editGif(gif: GifMeta) {
    const dialogRef = this.dialog.open(CardEditorComponent, { data: gif });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (result.action) {
          case 'save':
            this.service.update(result.gif);
            break;
          case 'download':
            this.service.update(result.gif);
            this.service.downloadGif(result.gif);
            break;
          case 'delete':
            this.service.removeGif(result.gif);
            break;
        }
      }
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
