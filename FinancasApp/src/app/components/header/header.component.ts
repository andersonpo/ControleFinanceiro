import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'Nome do Site';
  @Input() user: IUser = null;
  @Input() userItems: Array<UserItem> = [];
  @Output() onUserItemClick = new EventEmitter();
  @Output() onTitleClick = new EventEmitter();
  open: boolean = false;
  profileImageUrl: string = '/assets/images/avatar.png';

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    if (this.user?.ImageUrl?.length > 0) {
      this.profileImageUrl = this.user.ImageUrl;
    }
  }

  getIconName() {
    if (this.open) {
      return 'fa-caret-up';
    } else {
      return 'fa-caret-down';
    }
  }

  getDisplayUserItems() {
    if (this.open) {
      return 'block';
    } else {
      return 'none';
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      //clicou fora do componente
      this.open = false;
    }
  }

  handleUserClick() {
    this.open = !this.open;
  }

  handleUserItemClick(item: UserItem) {
    this.onUserItemClick.emit(item);
  }

  handleTitleClick() {
    this.onTitleClick.emit();
  }
}

export interface UserItem {
  text: string;
  value: any;
  separator?: boolean;
}
