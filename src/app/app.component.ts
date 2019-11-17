import { Component, OnInit } from '@angular/core';
import * as firebase from  'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping';

  selectedFeature = 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBjewpFbPncCS72Ys60VvglvTAnNpHAQGg",
      authDomain: "ng-recipe-book-bfa08.firebaseapp.com"
    });
  }

  onNavigate(selectedLink : string){
    this.selectedFeature = selectedLink;
  }
}
