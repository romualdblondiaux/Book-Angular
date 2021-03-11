import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor() {
  const Config = {
    apiKey: 'AIzaSyBK9SQwPE__5c1P5XDSFLllMmX9SOr6Lcc',
    authDomain: 'book-16178.firebaseapp.com',
    projectId: 'book-16178',
    storageBucket: 'book-16178.appspot.com',
    messagingSenderId: '157474381072',
    appId: '1:157474381072:web:c37475b337f1f3349e9995'
  };
  // Initialize Firebase
  firebase.initializeApp(Config);

}

}

