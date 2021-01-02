import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  createForm: FormGroup;
  errorMessage = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.createForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      icon: new FormControl('', [Validators.minLength(2)]),
      color: new FormControl('', [Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {}

  btnVoltar(): void {
    this.router.navigate(['/category']);
  }

  btnSalvar(formValue: any): void {
    this.categoryService.create(formValue).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/category']);
      },
      (error) => {
        this.errorMessage = 'Verifique os dados informados e tente novamente.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }
}
