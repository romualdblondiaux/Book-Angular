import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Cd } from '../models/cd.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CdsService {

  cds: Cd[] = [];
  cdSubject = new Subject<Cd[]>();


  constructor() {
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

}
