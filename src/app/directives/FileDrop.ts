import { Directive, ElementRef, HostListener, HostBinding, Input, Renderer } from '@angular/core';
import { EmitterService } from './../services/emitter.service';
import { DataService } from './../services/data.service';

declare var alertify: any;

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {

    constructor(public el: ElementRef, private _renderer: Renderer, private _dataService: DataService, private _emitter: EmitterService) { }
    @Input() dealId: number;
    @Input() businessId: number;
    @Input() phoenixDealId: number;
    @Input() package: any;

        @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

        @HostListener('drop', ['$event']) ondrop(event) {
        let dropEvent = <DragEvent>event;
        
        dropEvent.preventDefault();
        let files = <FileList>dropEvent.dataTransfer.files;
        let mode: string = 'temp';
        let id: number = 0;
        id = 0;       

        this.uploadfiles(files);    
    }

        private uploadfiles(files, index = 0) {
        let fileCount = index;
        if (index in files) {
          this.package.Files.push(files[index].name);
          this._emitter.onTempFileAdded.emit({
              file: files[index]
          });

          // Read the next file;
          this.uploadfiles(files, index + 1);
            
        }
        else {
            //alertify.success(`Done uploading ${fileCount} file(s).`);
        }
    }
}
