import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  // methode pour créer un nouvel utilisateur
  createNewUser(email: string, password: string): any {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve('done');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // methode pour connecter un utilsateur existant
  signInUser(email: string, password: string): any {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve('done');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // methode pour se déconnecter
  signOutUser(): void {
    firebase.auth().signOut();
}

}



