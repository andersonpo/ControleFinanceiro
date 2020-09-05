import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() name = '';
  @Input() formGroup: FormGroup;
  @Input() type = 'text';
  @Input() value = '';
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() showIconRight = false;
  @Input() error = false;
  @Output() actionPressEnter = new EventEmitter();
  @Output() actionValueChange = new EventEmitter();

  // ControlValueAccessor
  private onChange: Function;
  private onTouched: Function;

  constructor() {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
    this.disabled = false;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  getClass(): object {
    const temIcon = this.icon.length > 0;
    const result = {
      'input-icon': temIcon,
      'input-icon-left': temIcon && this.showIconRight === false,
      'input-icon-right': temIcon && this.showIconRight === true,
      'input-error': this.error === true,
    };

    return result;
  }

  onKeyEnter(event: any): void {
    this.actionPressEnter.emit(event.target.value);
  }

  valueChange(event: any): void {
    const value = event.target.value;
    this.onChange(value); // ControlValueAccessor
    this.actionValueChange.emit(value);
  }
}
