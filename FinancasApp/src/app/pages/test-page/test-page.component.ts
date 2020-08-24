import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/components/select/select.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  modalOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  itemsSelect: Array<SelectItem> = [
    { text: '1 Opção X', value: 'X' },
    { text: '2 Opção Y', value: 'Y' },
    { text: '3 Opção Z', value: 'Z' },
    { text: '4 Opção W', value: 'W' },
    { text: '5 Opção A', value: 'A' },
    { text: '6 Opção B', value: 'B' },
    { text: '7 Opção C', value: 'C' },
    { text: '8 Opção D', value: 'D' },
    { text: '9 Opção E', value: 'E' },
    { text: '10 Opção F', value: 'F' },
    { text: '11 Opção G', value: 'G' },
    { text: '12 Opção H', value: 'H' },
    { text: '13 Opção I', value: 'I' },
    { text: '14 Opção J', value: 'J' },
    { text: '15 Opção K', value: 'K' },
  ];
  itemSelected: SelectItem = this.itemsSelect[2];

  btnClick(event) {
    console.log('btn ' + event.target.innerText + ' click');
  }

  selectedItem(item: SelectItem) {
    console.log('select item', item);
  }
  btnAbrirModal(event) {
    this.modalOpen = true;
    console.log('abrir modal', this.modalOpen);
  }
  btnFecharModal(event) {
    this.modalOpen = false;
    console.log('fechar modal', this.modalOpen);
  }

  onCloseModal() {
    this.modalOpen = false;
    console.log('fechou modal');
  }
}
