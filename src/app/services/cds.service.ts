import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Cd } from '../models/cd.model';
import firebase from 'firebase';


@Injectable()
export class CdsService {

  cdSubject = new Subject<any[]>();

  private cds = [];

  constructor(private httpClient: HttpClient) {
    this.getCds();
  }

  emitCds(): void {
    this.cdSubject.next(this.cds);
  }

  saveCds(): void {
    firebase.database().ref('/cds').set(this.cds);
  }

  getCds(): void {
    firebase.database().ref('/cds')
      .on('value', (data) => {
          this.cds = data.val() ? data.val() : [];
          this.emitCds();
        }
      );
  }

  getSingleCd(id: number): any {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/cds/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCd(newCd: Cd): void {
    this.cds.push(newCd);
    this.saveCds();
    this.emitCds();
  }

  removeCd(cd: Cd): void {
    if (cd.photo) {
      const storageRef = firebase.storage().refFromURL(cd.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const cdIndexToRemove = this.cds.findIndex(
      (cdEl) => {
        if (cdEl === cd) {
          return true;
        }
      }
    );
    this.cds.splice(cdIndexToRemove, 1);
    this.saveCds();
    this.emitCds();
  }

  uploadFile(file: File): any {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('cd/' + almostUniqueFileName + file.name).put(file);
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

  addCd(titre: string, artiste: string, synopsis: string, image: string): void {
    const cdObject = {
      id: 0,
      titre: '',
      artiste: '',
      synopsis: '',
      image: '',
    };
    cdObject.titre = titre;
    cdObject.artiste = artiste;
    cdObject.synopsis = synopsis;
    cdObject.image = image;
    cdObject.id = this.cds[(this.cds.length - 1)].id + 1;

    this.cds.push(cdObject);
    this.emitCds();
  }

  saveCdsToServer(): void {
    this.httpClient
      .put('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/CD.json', this.cds)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getCdsFromServer(): void {
    this.httpClient
      .get<any[]>('https://book-16178-default-rtdb.europe-west1.firebasedatabase.app/CD.json')
      .subscribe(
        (response) => {
          this.cds = response;
          this.emitCds();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
