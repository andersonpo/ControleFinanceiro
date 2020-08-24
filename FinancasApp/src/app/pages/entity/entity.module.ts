import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEntityComponent } from './list-entity/list-entity.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { DeleteEntityComponent } from './delete-entity/delete-entity.component';
import { DetailEntityComponent } from './detail-entity/detail-entity.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    ListEntityComponent,
    CreateEntityComponent,
    EditEntityComponent,
    DeleteEntityComponent,
    DetailEntityComponent,
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [
    ListEntityComponent,
    CreateEntityComponent,
    EditEntityComponent,
    DeleteEntityComponent,
    DetailEntityComponent,
  ],
})
export class EntityModule {}
