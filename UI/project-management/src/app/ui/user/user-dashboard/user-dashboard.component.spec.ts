import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";

import { Router } from "@angular/router";
import { Location, APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { RoteConfiguration } from "src/app/route/app.route.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { tick } from "@angular/core/testing";
import { IPmApiService } from "src/app/Service/pm-api.service-interface";
import { PMApiServiceMockData } from "src/app/Service/pm-api.service.mock";
//import { TaskrowComponent } from "src/app/taskrow/taskrow.component";
import { AppModule } from "src/app/app.module";
import { inject } from "@angular/core/testing";
import { expand } from "rxjs/internal/operators/expand";
import { fail } from "assert";
import {
  DatepickerModule,
  BsDatepickerModule,
  ModalModule
} from "ngx-bootstrap";
import { priorityMin, priorityMax } from "src/app/Const/const";

import { UserDashboardComponent } from './user-dashboard.component';
import { PmServiceBus } from "src/app/service/service_bus";
import { AppModuleUnitTestFixture } from "src/app/app.module.unittest.fixture";
import { PmApiServiceFake } from "src/app/service/pm-api.service.fake";

describe('UserDashboardComponent', () => {
  let routerMock: any;
  let location: Location;
  let routerSpy: Router;
  let service: IPmApiService;
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: IPmApiService, useClass: PmApiServiceFake },{provide:PmServiceBus},{provide:APP_BASE_HREF, useValue:'/'}
       ],
      //declarations: [ AddUserComponent ]
      imports: [
        AppModuleUnitTestFixture,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        //RouterTestingModule.withRoutes(RoteConfiguration),
        //DatepickerModule,
        BsDatepickerModule,
        //ModalModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    //service = TestBed.get(IPmApiService);
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
     //fixture.detectChanges();
     component.ngOnInit();
  });


  it('When User Dashboard  Component Created Injector Injects all required Inputs should create', () => {
    expect(component).toBeTruthy();
  });

});