import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";

import { Router } from "@angular/router";
import { Location } from "@angular/common";
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

import { AddUserComponent } from './add-user.component';
import { PmApiServiceFake } from "../../../service/pm-api.service.fake";
import { PmServiceBus } from "../../../service/service_bus";
import { AppModuleUnitTestFixture } from "src/app/app.module.unittest.fixture";

describe('AddUserComponent', () => {
  let routerMock: any;
  let location: Location;
  let routerSpy: Router;
  let service: IPmApiService;
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: IPmApiService, useClass: PmApiServiceFake }
        ],
      //declarations: [ AddUserComponent ]
      imports: [
        AppModuleUnitTestFixture,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(RoteConfiguration),
        DatepickerModule,
        BsDatepickerModule,
        ModalModule
      ]
    })
    .compileComponents();
  }));

  //Test

  beforeEach(() => {
    location = TestBed.get(Location);
    service = TestBed.get(IPmApiService);
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.ngOnInit();
  });

  it('When User Editor Component Created Injector Injects all required Inputs should create', () => {
    expect(component).toBeTruthy();
  });

  // it("When No Values filled form should be invalid", () => {
  //   expect(component).toBeTruthy();
  //   expect(component.userForm.valid).toBe(false);
  // });

  it("When FirstName given then FirstName validator should be pass", () => {
    expect(component).toBeTruthy();
    component.model.FirstName = PMApiServiceMockData.User1.FirstName;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.fName.valid).toBe(true);
    expect(component.userForm.valid).toBe(false);
  });

  it("When LastName given then LastName validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.LastName = PMApiServiceMockData.User1.LastName;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.lName.valid).toBe(true);
    expect(component.userForm.valid).toBe(false);
  });

  it("When EmployeeId  given then EmployeeId validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.EmployeeId = PMApiServiceMockData.User1.EmployeeId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.empId.valid).toBe(true);
    expect(component.userForm.valid).toBe(false);
  });

  it("When All Value given then validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.FirstName = PMApiServiceMockData.User1.FirstName;
    component.model.LastName = PMApiServiceMockData.User1.LastName;
    component.model.EmployeeId = PMApiServiceMockData.User1.EmployeeId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.userForm.valid).toBe(true);
  });

});
