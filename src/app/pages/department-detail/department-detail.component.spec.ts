import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentDetailComponent} from './department-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail.component';

describe('DepartmentDetailComponent', () => {
  let component: DepartmentDetailComponent;
  let fixture: ComponentFixture<DepartmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatSelectModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [EmployeeDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
