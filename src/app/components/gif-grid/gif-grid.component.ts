import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GifMeta } from 'src/app/models/gif-meta.model';

@Component({
  selector: 'app-gif-grid',
  templateUrl: './gif-grid.component.html',
  styleUrls: ['./gif-grid.component.scss'],
})
export class GifGridComponent {
  @Input() gifs: Array<GifMeta> = [];
  @Input() dragAndDropEnabled = false;
  @Output() orderChanged: EventEmitter<Array<GifMeta>> = new EventEmitter<Array<GifMeta>>();

  @Output() gifAddEmmiter: EventEmitter<GifMeta> = new EventEmitter<GifMeta>();

  constructor() {}

  public containerClick(clickedGif: GifMeta) {
    this.gifAddEmmiter.emit(clickedGif);
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');
    // TODO: Fix nullable elements and maybe fix drag and drop
    phContainer.removeChild(phElement!);
    phContainer.parentElement!.insertBefore(phElement!, phContainer);

    moveItemInArray(this.gifs, dragIndex, dropIndex);
    this.orderChanged.emit(this.gifs);
  }
}
