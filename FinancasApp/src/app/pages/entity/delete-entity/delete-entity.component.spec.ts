import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntityComponent } from './delete-entity.component';

describe('DeleteEntityComponent', () => {
  let component: DeleteEntityComponent;
  let fixture: ComponentFixture<DeleteEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
