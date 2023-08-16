import { Component, OnInit } from '@angular/core';
import { Question } from '../models';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit {
  questions!: Question[];
  correctAnswers = 0;
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.quizResult.subscribe((res) => {
      this.questions = res;
      if (res.length) {
        res.forEach((r) => {
          if (r.selectedAnswer === r.correct_answer) {
            ++this.correctAnswers;
          }
        });
      } else {
        this.router.navigate(['quiz-maker']);
      }
    });
  }
}
