import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTreeComponent } from './app.component';

describe('AppComponent', () => {
  let component: DocTreeComponent;
  let fixture: ComponentFixture<DocTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
