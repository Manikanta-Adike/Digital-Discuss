import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  constructor(private appServive: AppService) { }

  answerForm = new FormGroup({
    answer: new FormControl()
  });

  ngOnInit() {
  }

}
