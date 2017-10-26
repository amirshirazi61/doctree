import { Component, ElementRef, Renderer, Output, EventEmitter, ChangeDetectorRef, ViewChildren, QueryList, Input, Inject, OnInit } from '@angular/core'
import { Email, Attachment } from './models/email';
import { DataService } from './services/data.service';
import { EmitterService } from './services/emitter.service';
import { FileDropDirective } from './directives/FileDrop';


@Component({
  selector: 'app-root',
  templateUrl: './doctree.component.html',
  styleUrls: ['./doctree.component.css']
})
export class DocTreeComponent implements OnInit {
  @Input() tempFiles: any[];
  @Input() packageType: string;
  @ViewChildren(FileDropDirective) children: QueryList<FileDropDirective>;
  showContextMenu: string = 'none';
  clientX: number;
  clientY: number;
  newName: any;
  fileToGet: any;
  oldName: any;
  clickedPackage: any;
  enableRenameModal: boolean = false;
  packages: any[] = [];
  loadingLogo: boolean = true;
  roleName: string;

    constructor(private el: ElementRef, private _renderer: Renderer, public _dataService: DataService, public _emitter: EmitterService) { }

    ngOnInit() 
    {
      this._emitter.onFileRightClick.subscribe(data => {
            this.clientX = data.clientX;
            this.clientY = data.clientY;
            this.newName = data.file;
            this.oldName = data.file;
            this.clickedPackage = data.package;
            this.showContextMenu = '';
        });

        this._emitter.onOutsideContextMenuClick.subscribe(data => {
            this.showContextMenu = data.showContextMenu;
        });
            let temporaryPackage =
                {
                    DisplayName: "Temporary Package",
                    Files: Array(0),
                    Name: "temp"
                };

            if (this.tempFiles)
                this.tempFiles.map(file => temporaryPackage.Files.push(file.name));

            this.packages.push(temporaryPackage);
            this.loadingLogo = false;
    }

      setFolderStyleAtIndex(i, event: MouseEvent) {
        /*if a file is clicked don't do anything.*/
        if (event.srcElement.classList.contains('file'))
            return;

        /**
         * elem is the li that holds the folder icon, -/+ icon, files and all their properties.
         * elemClassName contains the class name for that li.
         */
        if (!this.children)
            return;
        let elem = this.children.toArray().find((x, index) => index == i);
        if (elem) {
            let nativeElem = elem.el.nativeElement;
            let elemClassName: string;
            if (nativeElem.className.indexOf('collapsable') < 0)
                elemClassName = 'collapsable';
            else
                elemClassName = 'expandable';

            if (i == this.packages.length - 1)
                elemClassName = elemClassName == 'collapsable' ?
                    'collapsable lastCollapsable' :
                    'expandable lastExpandable';
            /**
             * first child of the li is a div that contains +/- icon.
             * firstChildClassName contains the class name for that div.
             */
            let firstChild = Array.from(nativeElem.children).find((x, index) => index == 0);

            let firstChildClassName: string;
            if (elemClassName.indexOf('collapsable') < 0)
                firstChildClassName = (i == this.packages.length - 1) ?
                    'hitarea expandable-hitarea lastExpandable-hitarea' :
                    'hitarea expandable-hitarea';
            else
                firstChildClassName = (i == this.packages.length - 1) ?
                    'hitarea collapsable-hitarea lastCollapsable-hitarea' :
                    'hitarea collapsable-hitarea';

            this._renderer.setElementAttribute(nativeElem, 'class', elemClassName);
            this._renderer.setElementAttribute(firstChild, 'class', firstChildClassName);

            let files: any = Array.from(nativeElem.children).find((x, index) => index == 2);

            if (elemClassName.indexOf('collapsable') < 0)
                this._renderer.setElementStyle(files, 'display', 'none');
            else
                this._renderer.setElementStyle(files, 'display', 'table-row');
        }
    }

        setFileClass(index, fileCount) {
        return index == fileCount - 1 ? 'last' : '';
    }

}
