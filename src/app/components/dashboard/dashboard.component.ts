import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GifMeta } from 'src/app/models/gif-meta.model';
import { GifManagerService } from 'src/app/services/gif-manager.service';
import { FinderComponent } from '../finder/finder.component';

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
}
