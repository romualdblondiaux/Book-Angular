import { DvdsService } from './services/dvds.service';
import { CdsService } from './services/cds.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CdListComponent } from './cd-list/cd-list.component';
import { CdFormComponent } from './cd-list/cd-form/cd-form.component';
import { SingleCdComponent } from './cd-list/single-cd/single-cd.component';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { DvdFormComponent } from './dvd-list/dvd-form/dvd-form.component';
import { SingleDvdComponent } from './dvd-list/single-dvd/single-dvd.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: 'cd', canActivate: [AuthGuardService], component: CdListComponent },
  { path: 'cds/new', canActivate: [AuthGuardService], component: CdFormComponent },
  { path: 'cds/view/:id', canActivate: [AuthGuardService], component: SingleCdComponent },
  { path: 'dvd', canActivate: [AuthGuardService], component: DvdListComponent },
  { path: 'dvds/new', canActivate: [AuthGuardService], component: DvdFormComponent },
  { path: 'dvds/view/:id', canActivate: [AuthGuardService], component: SingleDvdComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    FooterComponent,
    CdListComponent,
    CdFormComponent,
    SingleCdComponent,
    DvdListComponent,
    DvdFormComponent,
    SingleDvdComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BooksService,
    CdsService,
    DvdsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
