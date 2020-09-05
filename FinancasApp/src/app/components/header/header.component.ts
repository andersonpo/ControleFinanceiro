import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() title = 'Nome do Site';
  @Input() user: IUser = null;
  @Input() userItems: Array<UserItem> = [];
  @Output() actionUserItemClick = new EventEmitter();
  @Output() actionTitleClick = new EventEmitter();
  open = false;
  profileImageUrl = '/assets/images/avatar.png';

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user?.Photo?.length > 0) {
      this.profileImageUrl = 'data:' + this.user.PhotoType + ';base64,' + this.user.Photo;
    }
  }

  getIconName(): string {
    if (this.open) {
      return 'fa-caret-up';
    } else {
      return 'fa-caret-down';
    }
  }

  getDisplayUserItems(): string {
    if (this.open) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      // clicou fora do componente
      this.open = false;
    }
  }

  handleUserClick(): void {
    this.open = !this.open;
  }

  handleUserItemClick(item: UserItem): void {
    this.actionUserItemClick.emit(item);
  }

  handleTitleClick(): void {
    this.actionTitleClick.emit();
  }
}

export interface UserItem {
  text: string;
  value: any;
  separator?: boolean;
}
