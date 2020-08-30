import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-photo-upload',
  templateUrl: './user-photo-upload.component.html',
  styleUrls: ['./user-photo-upload.component.scss'],
})
export class UserPhotoUploadComponent implements OnInit {
  id: string = '';
  user: any = null;
  uploadForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.uploadForm = new FormGroup({
      photo: new FormControl('', [Validators.required]),
      file: new FormControl(''),
    });

    this.route.params.subscribe((params) => {
      this.id = params.id;

      if (this.id === undefined || this.id.length <= 0) {
        console.log('User ID não informado!');
        this.router.navigate(['/user']);
      }
    });
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(
      (response) => {
        this.user = response.result;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Falha ao recuperar os dados do usuário.';
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        file: file,
      });
      console.log('file', file);
    }
  }

  uploadPhoto(formValue) {
    const formData = new FormData();
    formData.append('photo', formValue.file);

    this.userService.uploadPhoto(this.id, formData).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/user']);
      },
      (error) => {
        this.errorMessage = 'Falha ao atualizar a foto do usuário';
        if (error.status != 401) {
          console.log(error);
        }
      }
    );
  }

  btnBack() {
    this.router.navigate(['/user']);
  }
}
