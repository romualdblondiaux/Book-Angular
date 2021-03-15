import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Dvd } from '../models/dvd.model';

@Injectable({
  providedIn: 'root'
})
export class DvdsService {

  dvds: Dvd[] = [];
  dvdSubject = new Subject<Dvd[]>();

  constructor() {
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
}
