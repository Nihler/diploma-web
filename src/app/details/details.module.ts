import { AgmCoreModule } from '@agm/core';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { AuthService } from 'common/auth.service';
import { PathsService } from 'common/paths.service';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    AgmCoreModule,
    DetailsRoutingModule,
    CommonModule
  ],
  providers: [PathsService, AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DetailsModule {}
