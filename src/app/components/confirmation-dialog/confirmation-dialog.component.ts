import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  @Input() caption = '';
  @Input() content = '';

  constructor(@Inject(MAT_DIALOG_DATA) private dialogInfo: { caption: string; content: string }) {
    this.caption = dialogInfo.caption;
    this.content = dialogInfo.content;
  }
}
