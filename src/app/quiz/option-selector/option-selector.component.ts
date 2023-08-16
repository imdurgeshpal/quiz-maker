import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionSelectorComponent),
      multi: true,
    },
  ],
})
export class OptionSelectorComponent implements ControlValueAccessor {
  @Input() options!: string[];
  @Input() isResult!: boolean;
  @Input() correctAnswer!: string;
  value!: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  selectOption(option: string): void {
    this.value = option;
    this.onChange(option);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
