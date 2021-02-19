import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class GamecrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Game(record) {
    return this.firestore.collection('Games').add(record);
  }
  read_Games() {
    return this.firestore.collection('Games').snapshotChanges();
  }
  update_Game(recordID, record) {
    this.firestore.doc('Games/' + recordID).update(record);
  }
  delete_Game(record_id) {
    this.firestore.doc('Games/' + record_id).delete();
  }
}