import { Question } from './';

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}
