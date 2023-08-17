import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Question, TriviaCategory } from '../models';
import { QuizService } from '../services/quiz.service';
import { DIFFICULTIES } from '../constants/difficulties.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent implements OnInit {
  categoryForm = this.fb.group({
    category: ['', Validators.required],
    difficulty: ['', Validators.required],
  });

  categories!: TriviaCategory[];
  difficulties = DIFFICULTIES;
  questions!: Question[];
  questionFormArray = this.fb.array([]);

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.getCategories().subscribe({
      next: (res) => (this.categories = res),
    });
  }

  createQuiz(): void {
    this.categoryForm.markAsPristine();
    const { category, difficulty } = this.categoryForm.value;
    this.quizService.getQuestions(category, difficulty).subscribe({
      next: (res) => (this.questions = res),
    });
  }

  submit() {
    const result = this.questions.map((q, i) => {
      return {
        ...q,
        selectedAnswer: this.questionFormArray.value[i],
      } as Question;
    });
    this.quizService.quizResult.next(result);
    this.router.navigate(['quiz-result']);
  }
}
