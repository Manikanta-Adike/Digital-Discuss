import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { AppService } from '../../services/app.service';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { LoadingDialogDetailComponent } from '../loading-dialog/loading-dialog-detail.component';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  tags = [];
  public form: FormGroup;
  constructor(protected _formBuilder: FormBuilder, public appService: AppService, public dialog: MatDialog) {
    this.form = _formBuilder.group({
      'title': [''],
      'description': [''],
      'tags': [[]],
      'answers': [],
    });
  }

  ngOnInit() {
  }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    this.form.controls.tags.setValue(this.tags);
    console.log(this.form);
    const dialogRef = this.dialog.open(LoadingDialogDetailComponent, {
      hasBackdrop: false,
        panelClass: 'loading-dialog-pane'
    });
    this.appService.postQuestion(this.form.value).subscribe(data => {
          dialogRef.close();
          if (data['status'] < 400 ) {
            console.log('success');
            const elem = <HTMLElement>document.getElementsByClassName('recentQuestion')[0] as HTMLElement;
            elem.click();
          }
            return true;
           },
           error => {
            dialogRef.close();
           console.error('Error saving food!');
             // return Observable.throw(error);
           });
  }
}
