import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() show: Subject<boolean> = this.loaderService.isLoading;
  @Input() fullscreen = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}
}
