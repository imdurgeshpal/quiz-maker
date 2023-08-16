import { Component, Input, OnChanges } from '@angular/core';
import { Question } from '../models';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnChanges {
  @Input() questions!: Question[];
  @Input() formArray = this.fb.array([]);
  @Input() isResult!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.initForm();
  }

  getFormArrayControl(index: number): FormControl {
    return this.formArray.controls[index] as FormControl;
  }

  private initForm() {
    this.questions.forEach((q) => {
      this.formArray.push(
        this.fb.control(q.selectedAnswer, Validators.required)
      );
    });
  }
}
