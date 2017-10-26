import { EventEmitter } from '@angular/core';

export class EmitterService {
    onNotesDestroy = new EventEmitter();
    onFileRightClick = new EventEmitter();
    onOutsideContextMenuClick = new EventEmitter();
    onTempFileAdded = new EventEmitter();
    constructor() { }
}