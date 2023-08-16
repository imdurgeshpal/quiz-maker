import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Category,
  Question,
  QuestionResponse,
  TriviaCategory,
} from '../models';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'https://opentdb.com';

  quizResult = new BehaviorSubject<Question[]>([]);

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<TriviaCategory[]> {
    return this.httpClient
      .get<Category>(`${this.baseUrl}/api_category.php`)
      .pipe(map((res) => res.trivia_categories));
  }

  getQuestions(
    category: string | null | undefined,
    difficulty: string | null | undefined
  ): Observable<Question[]> {
    return this.httpClient
      .get<QuestionResponse>(
        `${this.baseUrl}/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .pipe(
        map((res) =>
          res.results.map((result) => ({
            ...result,
            options: [...result.incorrect_answers, result.correct_answer].sort(
              () => 0.5 - Math.random()
            ),
          }))
        )
      );
  }
}
