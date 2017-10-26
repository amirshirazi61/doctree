import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
import { DataService } from './../services/data.service';
import { EmitterService } from './../services/emitter.service';

declare var alertify: any;

@Directive({
    selector: '[fileClick]',
})
export class FileClickDirective {
    constructor(private el: ElementRef, private _renderer: Renderer, private _dataService: DataService, private _emitter: EmitterService) { }

    @Input() file: any;
    @Input() package: any;
    @Input() tempFiles: any[];

    @HostListener('contextmenu', ['$event']) oncontextmenu(event: MouseEvent) {
        event.preventDefault();
        this._emitter.onFileRightClick.emit({
            clientX: event.clientX,
            clientY: event.clientY,
            file: this.file,
            package: this.package
        });
    }

    @HostListener('dblclick', ['$event']) ondblclick(event: MouseEvent) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.getfile(this.file, this.package);
    }

    getfile(filename: string, filePackage: any) {
        //temp
        let fileIndex = this.tempFiles.findIndex(file => file.name == filename);
        if (fileIndex < 0) {
            console.error('Cannot find temporary file to download');
            return;
        }
        this.handleFileUpload(this.tempFiles[fileIndex]);
        
    }

    handleFileUpload = function (result: any) {
        var blob;
        if (result.content) {
            var arr = result.content;
            var byteArray = new Uint8Array(arr);
            blob = new Blob([byteArray], { type: result.contentType });
        }
        else {
            blob = result;
            result.fileName = result.name;
        }

        var downloadLink = document.createElement("a");
        (downloadLink as any).download = result.fileName;
        downloadLink.innerHTML = "Download File";

        let windowUrl = window.URL || (window as any).webkitURL;
        downloadLink.href = windowUrl.createObjectURL(blob);

        var iframe = "<iframe width='100%' height='100%' src='" + downloadLink.href + "'></iframe>";

        var win = window.open("", 'Document', 'width=1024,height=768,resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no');
        win.document.open();
        win.document.write(iframe);
        win.document.close();

    }

    destroyClickedElement = function (event) {
        document.body.removeChild(event.target);
    }
}