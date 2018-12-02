import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'

import { IPmApiService } from './service/pm-api.service-interface';
import { PmApiService } from './service/pm-api.service';
import { AppModule } from 'src/app/app.module';
import { AppRoutingModule } from 'src/app/route/app.route.module';
import { PmApiServiceFake } from 'src/app/service/pm-api.service.fake';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AppModule
  ],
  providers: [{provide: IPmApiService,useClass:PmApiServiceFake}],
})
export class AppModuleUnitTestFixture { }
