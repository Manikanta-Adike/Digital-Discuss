import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  answerForm = new FormGroup({
    answer: new FormControl()
  });

  public question: any;

  constructor(private appServive: AppService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
  }

  getAnswer() {

  }
}
