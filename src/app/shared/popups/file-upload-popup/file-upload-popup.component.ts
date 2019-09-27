import { Component, OnInit, Inject } from '@angular/core';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as firebase from 'firebase';
import { AngularFirestore, Reference } from '@angular/fire/firestore';

@Component({
  selector: 'app-file-upload-popup',
  templateUrl: './file-upload-popup.component.html',
  styleUrls: ['./file-upload-popup.component.scss']
})
export class FileUploadPopupComponent implements OnInit {

  isCompleted = false;
  storageRef: any;
  file: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  handleUploadFile(e) {
    // Get file
    this.file = e.target.files[0];

    // Create ref
    this.storageRef = firebase.storage().ref(this.data.storageName + this.file.name);
    this.isCompleted = true;

  }

  handleSaveFile() {
    // Upload file
    let task = this.storageRef.put(this.file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        this.afs.collection('players').doc(this.data.playerId).update({ 'logoRef': downloadURL });
        console.log('File was successfully uploaded');
      })
      .catch((err) => {
        console.log(err)
      });

    this.dialogRef.close();
  }
}
