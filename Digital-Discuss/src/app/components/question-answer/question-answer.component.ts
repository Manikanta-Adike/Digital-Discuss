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

  public questionAnswer: any;
  public questionTitle: any;
  public questionDescription: any;
  public questionTags: any[];
  public user: any;

  constructor(private appServive: AppService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.getAnswer();
    this.questionTitle = this.appServive.question.title;
    this.questionDescription = this.appServive.question.description;
    this.questionTags = this.appServive.question.tags;
    this.user = this.appServive.question.user;
  }

  getAnswer() {
    const currentId = this.appServive.question.id;
    const url = 'http://localhost:3000/getAnswers';
    this.appServive.getAnswer(url, currentId).subscribe(response => this.questionAnswer = response['answers']);
  }

  returnBack(){
    this.location.back();
  }

  postAnswer() {
    const data = {};
    data['like'] = [];
    data['dislike'] = [];
    data['username'] = 'ram';
    data['questionid'] = this.appServive.question.id;
    data['description'] = this.answerForm.value['answer'];
    const url = 'http://localhost:3000/addAnswer';
    this.appServive.postAnswer(url, data).subscribe( response => console.log(response) );
  }
}
