import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Course } from '../model/course';
import { AngularFirestore } from '@angular/fire/firestore';

// var config = {
//   apiKey: "AIzaSyC3eiiogpy_A3OYXC1WYuSnsKWe1ODIiiU",
//   authDomain: "fir-course-fca1f.firebaseapp.com",
//   databaseURL: "https://fir-course-fca1f.firebaseio.com",
//   projectId: "fir-course-fca1f",
//   storageBucket: "fir-course-fca1f.appspot.com",
//   messagingSenderId: "1078628577654",
//   appId: "1:1078628577654:web:64db1349abc5d73cefca57",
//   measurementId: "G-RDHS6E0Z1S"
// };

// firebase.initializeApp(config);
// const db = firebase.firestore();


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    //db.doc('courses/mNqzgyjs7RLDmKQ2XHpP')
    //    .get()
    //    .then(snap => console.log(snap.data()));
    // db.collection('courses').get()
    //     .then(snaps => {
    //       const courses : Course[] =snaps.docs.map(snap => {
    //         return <Course> {
    //           id: snap.id,
    //           ... snap.data()
    //         }});
    //       console.log(courses);
    //     });

    this.db.collection('courses').snapshotChanges()
        .subscribe(snaps => {
          const courses: Course[] = snaps.map(snap => {
            return <Course>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
          })
          console.log(courses);
        });
  }

}
