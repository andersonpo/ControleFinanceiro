import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotoUploadComponent } from './user-photo-upload.component';

describe('UserPhotoUploadComponent', () => {
  let component: UserPhotoUploadComponent;
  let fixture: ComponentFixture<UserPhotoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhotoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
