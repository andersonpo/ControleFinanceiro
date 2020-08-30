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
  @Input() title: string = 'Nome do Site';
  @Input() user: IUser = null;
  @Input() userItems: Array<UserItem> = [];
  @Output() onUserItemClick = new EventEmitter();
  @Output() onTitleClick = new EventEmitter();
  open: boolean = false;
  profileImageUrl: string = '/assets/images/avatar.png';

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user?.Photo?.length > 0) {
      console.log('user photo header');
      this.profileImageUrl = 'data:image/jpg;base64,' + this.user.Photo;
      //data:[<media type>][;charset=<character set>][;base64],<data>
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
