import { DvdsService } from './../services/dvds.service';
import { CdsService } from './../services/cds.service';
import { Cd } from './../models/cd.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Dvd } from '../models/dvd.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  cds: Cd[];
  dvds: Dvd[];
  booksSubscription: Subscription;
  cdsSubscription: Subscription;
  dvdsSubscription: Subscription;

  constructor(private booksService: BooksService, private cdsService: CdsService, private dvdsService: DvdsService, private router: Router) {}

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.cdsSubscription = this.cdsService.cdSubject.subscribe(
      (cds: Cd[]) => {
        this.cds = cds;
      }
    );
    this.dvdsSubscription = this.dvdsService.dvdSubject.subscribe(
      (dvds: Dvd[]) => {
        this.dvds = dvds;
      }
    );
    this.booksService.emitBooks();
    this.cdsService.emitCds();
    this.dvdsService.emitDvds();
    this.booksService.getBooksFromServer();
    this.cdsService.getCdsFromServer();
    this.dvdsService.getDvdsFromServer()
  }

  onNewBook(): void {
    this.router.navigate(['/books', 'new']);
  }
  onNewCd(): void {
    this.router.navigate(['/cds', 'new']);
  }
  onNewDvd(): void {
    this.router.navigate(['/dvds', 'new']);
  }

  onDeleteBook(book: Book): void {
    this.booksService.removeBook(book);
  }
  onDeleteCd(cd: Cd): void {
    this.cdsService.removeCd(cd);
  }
  onDeleteDvd(dvd: Dvd): void {
    this.dvdsService.removeDvd(dvd);
  }

  onViewBook(id: number): void {
    this.router.navigate(['/books', 'view', id]);
  }
  onViewCd(id: number): void {
    this.router.navigate(['/cds', 'view', id]);
  }
  onViewDvd(id: number): void {
    this.router.navigate(['/dvds', 'view', id]);
  }

  onSave(): void {
    this.booksService.saveBooksToServer();
    this.cdsService.saveCdsToServer();
    this.dvdsService.saveDvdsToServer();
  }

  onFetch(): void {
    this.booksService.getBooksFromServer();
    this.cdsService.getCdsFromServer();
    this.dvdsService.getDvdsFromServer();
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.cdsSubscription.unsubscribe();
    this.dvdsSubscription.unsubscribe();
  }
}
