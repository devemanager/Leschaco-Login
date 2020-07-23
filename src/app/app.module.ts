import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
//Material Design
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule} from '@angular/material/menu';
//Services
import {HttpHelperService} from './services/http-helper.service';
//Microft authentication library
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Configuration } from 'msal';
import { ProfileComponent } from './profile/profile.component';

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

//Set configurations to access ms azure.
function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: 'b0344388-8e9c-45a4-9580-e85d7cfeb565',
      authority: "https://login.microsoftonline.com/common/",
      validateAuthority: true,
      redirectUri: "http://localhost:4201/home",
      postLogoutRedirectUri: "http://localhost:4201/",
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      "api://b0344388-8e9c-45a4-9580-e85d7cfeb565/access_as_user"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap,
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    UserProfileComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule, 
    MsalModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatIconModule, 
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule, 
    MatProgressSpinnerModule,
    MatMenuModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService,
    HttpHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
