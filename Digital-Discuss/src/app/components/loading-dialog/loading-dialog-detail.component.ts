import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-loading-dialog-detail',
    templateUrl: './loading-dialog-detail.component.html',
    styleUrls: ['./loading-dialog-detail.component.scss']
})
export class LoadingDialogDetailComponent implements OnInit {

    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) {
        // if (this.data.mode === 'loading-dialog') {
        //     let element = document.getElementsByClassName('mat-dialog-container');
        //     element[0].classList.add('loading-dailog');
        // }
        const element = document.getElementsByClassName('mat-dialog-container');
        element[0].classList.add('loading-dailog');
    }
    ngOnInit() {

    }

}
