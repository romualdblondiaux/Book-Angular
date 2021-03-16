import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';


@Injectable()
export class BooksService {

  booksSubject = new Subject<any[]>();

  private books = [];

  constructor(private httpClient: HttpClient) {
    this.getBooks();
  }

  emitBooks(): void {
    this.booksSubject.next(this.books);
  }

  saveBooks(): void {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(): void {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number): any {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book): void {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book): void {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File): any {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('livres/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  addBook(titre: string, auteur: string, synopsis: string, image: string): void {
    const bookObject = {
      id: 0,
      titre: '',
      auteur: '',
      synopsis: '',
      image: '',
    };
    bookObject.titre = titre;
    bookObject.auteur = auteur;
    bookObject.synopsis = synopsis;
    bookObject.image = image;
    bookObject.id = this.books[(this.books.length - 1)].id + 1;

    this.books.push(bookObject);
    this.emitBooks();
  }

  saveBooksToServer(): void {
    this.httpClient
      .put('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/livres.json', this.books)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getBooksFromServer(): void {
    this.httpClient
      .get<any[]>('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/livres.json')
      .subscribe(
        (response) => {
          this.books = response;
          this.emitBooks();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }


}
