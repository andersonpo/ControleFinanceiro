import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';
import { ITable } from 'src/app/interfaces/itable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: Array<any> = null;
  table: ITable = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.userService.list().subscribe((value) => {
      this.users = value?.result;
      this.updateTable();
    });
  }

  private updateTable() {
    const rows = [];
    const rowsPerPage = 10;

    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      let rowValue = [];
      rowValue.push({ value: user.id, visible: false });
      rowValue.push({ value: user.name, visible: true });
      rowValue.push({ value: user.email, visible: true });

      rows.push({ values: rowValue });
    }

    this.table = {
      rowsPerPage: rowsPerPage,
      showLineNumber: true,
      columns: [
        { name: 'ID', visible: false, size: null },
        { name: 'Nome', visible: true, size: null },
        { name: 'Email', visible: true, size: null },
      ],
      rows: rows,
      actions: {
        size: 420,
        buttons: [
          {
            text: 'Detalhes',
            color: 'verde',
            icon: 'fa-info-circle',
            iconColor: '#FFF',
          },
          {
            text: 'Editar',
            color: 'azul',
            icon: 'fa-edit',
            iconColor: '#FFF',
          },
          {
            text: 'Foto',
            color: 'azul',
            icon: 'fa-image',
            iconColor: '#FFF',
          },
          {
            text: 'Excluir',
            color: 'vermelho',
            icon: 'fa-trash-alt',
            iconColor: '#FFF',
          },
        ],
      },
      footer: [
        {
          colspan: 4,
          pretext: 'Exibindo ' + rowsPerPage + ' de ',
          value: rows?.length,
          postext: 'registro(s)',
        },
      ],
    };
  }

  btnCreateClick() {
    this.router.navigate(['/user/create']);
  }

  actionClick(data) {
    switch (data.action) {
      case 'Detalhes':
        this.router.navigate(['user/details', { id: data.value }]);
        break;
      case 'Editar':
        this.router.navigate(['user/edit', { id: data.value }]);
        break;
      case 'Foto':
        this.router.navigate(['user/photo', { id: data.value }]);
        break;
      case 'Excluir':
        this.router.navigate(['user/delete', { id: data.value }]);
        break;

      default:
        break;
    }
  }
}
