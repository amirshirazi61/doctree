import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DocTreeComponent } from './app.component';
import { FileDropDirective } from './directives/FileDrop';
import { FileClickDirective } from './directives/fileClick';

import { EmitterService } from './services/emitter.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    DocTreeComponent,
    FileDropDirective,
    FileClickDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [EmitterService, DataService],
  bootstrap: [DocTreeComponent]
})
export class DocTreeModule { }
