import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEntityComponent } from './detail-entity.component';

describe('DetailEntityComponent', () => {
  let component: DetailEntityComponent;
  let fixture: ComponentFixture<DetailEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
