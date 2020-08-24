import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() items: Array<SelectItem> = [];
  @Input() selectedItem: SelectItem = null;
  @Output() onSelected = new EventEmitter<SelectItem>();
  open: boolean = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  getClass() {
    let result = {};
    return result;
  }

  getDisplayItems() {
    if (this.open) {
      return 'block';
    } else {
      return 'none';
    }
  }

  getClassIcon() {
    let result = {
      'fa-angle-down': !this.open,
      'fa-angle-up': this.open,
    };
    return result;
  }

  getIconRemoveDisplay() {
    if (this.selectedItem != null && this.selectedItem != undefined) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any) {
    const elementIconRemove = this.eRef.nativeElement.querySelector(
      '.select-icon-remove'
    );
    const clickRemoveItem = elementIconRemove.contains(event.target);

    if (this.eRef.nativeElement.contains(event.target) && !clickRemoveItem) {
      this.open = !this.open;
    } else {
      //clicou fora do componente
      this.open = false;
    }
  }

  handleItemClick(item: SelectItem) {
    this.selectedItem = item;
    this.onSelected.emit(item);
  }
}

export interface SelectItem {
  text: string;
  value: any;
}
