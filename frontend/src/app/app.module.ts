import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {LoginFormComponent} from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatInputModule} from '@angular/material/input';
import { MainComponent } from './main/main.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import {DataTablesModule} from 'angular-datatables';
import { RegisterComponent } from './register/register.component';
import {MatSelectModule} from '@angular/material/select';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'main', component: MainComponent},
  { path: 'edit', component: EditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomePageComponent,
    MainComponent,
    EditComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    HttpClientModule,
    DataTablesModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
