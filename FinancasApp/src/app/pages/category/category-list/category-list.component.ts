import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITable, typeValue } from 'src/app/interfaces/itable';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categorys: Array<any> = null;
  table: ITable = null;
  pageIndex: number = 1;
  pageSize: number = 10;

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.categoryService.list(this.pageIndex, this.pageSize).subscribe((value) => {
      this.categorys = value?.result;
      this.updateTable(value?.pageIndex, value?.pageSize, value?.pageTotal, value?.rowsTotal);
    });
  }

  private updateTable(pageIndex: number, pageSize: number, pageTotal: number, rowsTotal: number): void {
    const rows = [];

    for (const category of this.categorys) {
      const rowValue = [];
      rowValue.push({ value: category.id, visible: false });
      rowValue.push({ value: category.name, visible: true });
      rowValue.push({ type: typeValue.iconText, value: category.icon, visible: true });
      rowValue.push({ type: typeValue.colorHex, value: category.color, visible: true });

      rows.push({ values: rowValue });
    }

    this.table = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      pageTotal: pageTotal,
      rowsTotal: rowsTotal,
      showLineNumber: true,
      columns: [
        { name: 'ID', visible: false, size: null },
        { name: 'Nome', visible: true, size: null },
        { name: 'Icone', visible: true, size: 300 },
        { name: 'Cor', visible: true, size: 200 },
      ],
      rows,
      actions: {
        size: 340,
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
            text: 'Excluir',
            color: 'vermelho',
            icon: 'fa-trash-alt',
            iconColor: '#FFF',
          },
        ],
      },
      footer: [
        {
          colspan: 5,
          value: 'Exibindo até ' + pageSize + ' de ' + rowsTotal + ' registro(s) - Página ' + pageIndex + ' de ' + pageTotal,
        },
      ],
    };
  }

  btnCreateClick(): void {
    this.router.navigate(['/category/create']);
  }

  actionClick(data): void {
    switch (data.action) {
      case 'Detalhes':
        this.router.navigate(['category/details', { id: data.value }]);
        break;
      case 'Editar':
        this.router.navigate(['category/edit', { id: data.value }]);
        break;
      case 'Foto':
        this.router.navigate(['category/photo', { id: data.value }]);
        break;
      case 'Excluir':
        this.router.navigate(['category/delete', { id: data.value }]);
        break;

      default:
        break;
    }
  }

  changePage(page) {
    this.pageIndex = page;
    this.getList();
  }

}
