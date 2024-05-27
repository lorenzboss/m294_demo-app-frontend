import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {AuthConfig, OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {AppAuthService} from './service/app.auth.service';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {IsInRoleDirective} from './dir/is.in.role.dir';
import {IsInRolesDirective} from './dir/is.in.roles.dir';
import {VehicleListComponent} from './pages/vehicle-list/vehicle-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {DepartmentListComponent} from './pages/department-list/department-list.component';
import {EmployeeListComponent} from './pages/employee-list/employee-list.component';
import {VehicleUsageListComponent} from './pages/vehicle-usage-list/vehicle-usage-list.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NoAccessComponent} from './pages/no-access/no-access.component';
import {AppLoginComponent} from './components/app-login/app-login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {HttpXSRFInterceptor} from './interceptor/http.csrf.interceptor';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {VehicleDetailComponent} from './pages/vehicle-detail/vehicle-detail.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DepartmentDetailComponent} from './pages/department-detail/department-detail.component';
import {EmployeeDetailComponent} from './pages/employee-detail/employee-detail.component';
import {VehicleUsageDetailComponent} from './pages/vehicle-usage-detail/vehicle-usage-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {AutofocusDirective} from './dir/autofocus-dir';
import {BaseComponent} from './components/base/base.component';
import {environment} from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'demoapp',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    VehicleListComponent,
    DepartmentListComponent,
    EmployeeListComponent,
    VehicleUsageListComponent,
    DashboardComponent,
    NoAccessComponent,
    AppLoginComponent,
    AppHeaderComponent,
    VehicleDetailComponent,
    ConfirmDialogComponent,
    DepartmentDetailComponent,
    EmployeeDetailComponent,
    VehicleUsageDetailComponent,
    AutofocusDirective,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    MatSliderModule,
    MatTableModule,
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    MatButtonModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
