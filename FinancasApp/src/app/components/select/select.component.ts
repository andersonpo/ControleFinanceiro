import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() items: Array<SelectItem> = [];
  @Input() selectedItem: SelectItem = null;
  @Output() actionSelected = new EventEmitter<SelectItem>();
  open = false;
  widthItems = 300;

  constructor(private eRef: ElementRef, private resizeService: ResizeService) {
    this.resizeService.width.subscribe((value) => {
      this.updateWidth();
    });
  }

  ngOnInit(): void {
    this.updateWidth();
  }

  ngOnDestroy(): void {
    this.resizeService.width.unsubscribe();
  }

  updateWidth(): void {
    this.widthItems = this.eRef.nativeElement.offsetWidth;
  }

  getDisplayItems(): string {
    if (this.open) {
      return 'block';
    } else {
      return 'none';
    }
  }

  getClassIcon(): object {
    const result = {
      'fa-angle-down': !this.open,
      'fa-angle-up': this.open,
    };
    return result;
  }

  getIconRemoveDisplay(): string {
    if (this.selectedItem !== null && this.selectedItem !== undefined) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any): void {
    const elementIconRemove = this.eRef.nativeElement.querySelector(
      '.select-icon-remove'
    );
    const clickRemoveItem = elementIconRemove.contains(event.target);

    if (this.eRef.nativeElement.contains(event.target) && !clickRemoveItem) {
      this.open = !this.open;
    } else {
      // clicou fora do componente
      this.open = false;
    }
  }

  handleItemClick(item: SelectItem): void {
    this.selectedItem = item;
    this.actionSelected.emit(item);
  }
}

export interface SelectItem {
  text: string;
  value: any;
}
