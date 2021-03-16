import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Dvd } from '../models/dvd.model';


@Injectable()
export class DvdsService {

  dvdSubject = new Subject<any[]>();

  private dvds = [];

  constructor(private httpClient: HttpClient) {
    this.getDvds();
  }

  emitDvds(): void {
    this.dvdSubject.next(this.dvds);
  }

  saveDvds(): void {
    firebase.database().ref('/dvds').set(this.dvds);
  }

  getDvds(): void {
    firebase.database().ref('/dvds')
      .on('value', (data) => {
          this.dvds = data.val() ? data.val() : [];
          this.emitDvds();
        }
      );
  }

  getSingleDvd(id: number): any {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/dvds/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewDvd(newDvd: Dvd): void {
    this.dvds.push(newDvd);
    this.saveDvds();
    this.emitDvds();
  }

  removeDvd(dvd: Dvd): void {
    if (dvd.photo) {
      const storageRef = firebase.storage().refFromURL(dvd.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const dvdIndexToRemove = this.dvds.findIndex(
      (dvdEl) => {
        if (dvdEl === dvd) {
          return true;
        }
      }
    );
    this.dvds.splice(dvdIndexToRemove, 1);
    this.saveDvds();
    this.emitDvds();
  }

  uploadFile(file: File): any {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('dvd/' + almostUniqueFileName + file.name).put(file);
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

  addDvd(titre: string, genre: string, synopsis: string, image: string): void {
    const dvdObject = {
      id: 0,
      titre: '',
      genre: '',
      synopsis: '',
      image: '',
    };
    dvdObject.titre = titre;
    dvdObject.genre = genre;
    dvdObject.synopsis = synopsis;
    dvdObject.image = image;
    dvdObject.id = this.dvds[(this.dvds.length - 1)].id + 1;

    this.dvds.push(dvdObject);
    this.emitDvds();
  }

  saveDvdsToServer(): void {
    this.httpClient
      .put('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/DVD.json', this.dvds)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getDvdsFromServer(): void {
    this.httpClient
      .get<any[]>('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/DVD.json')
      .subscribe(
        (response) => {
          this.dvds = response;
          this.emitDvds();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
