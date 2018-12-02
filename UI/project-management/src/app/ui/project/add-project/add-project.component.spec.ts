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

import { AddProjectComponent } from './add-project.component';
import { PmApiServiceFake } from "../../../service/pm-api.service.fake";
import { AppModuleUnitTestFixture } from "src/app/app.module.unittest.fixture";

describe('AddProjectComponent', () => {
  let routerMock: any;
  let location: Location;
  let routerSpy: Router;
  let service: IPmApiService;
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;


  beforeEach(async(() => {
    TestBed.overrideComponent(
      AddProjectComponent,
      {set: {providers: [{provide: IPmApiService, useClass: PmApiServiceFake}]}}
  );
    TestBed.configureTestingModule({
      providers: [{ provide: IPmApiService, useClass: PmApiServiceFake }],
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

  beforeEach(() => {
    location = TestBed.get(Location);
    service = TestBed.get(IPmApiService);
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.ngOnInit();
  });

  it('When Project Editor Component Created Injector Injects all required Inputs should create', () => {
    expect(component).toBeTruthy();
  });

  it("When No Values filled form should be invalid", () => {
    expect(component).toBeTruthy();
    expect(component.projectForm.valid).toBe(false);
  });

  it("When Project Discription given then Project Discription validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.Project = PMApiServiceMockData.Project1_WithAll().Project;
    component.UpdateValuesFromModelToFormsControls();
    expect(true).toBe(component.projectControl.valid);
    //expect(component.projectForm.valid).toBe(false);
  });

  it("When Date Not Required Checked then All Date validation should pass", () => {
    expect(component).toBeTruthy();
    component.dateRequiredControl.setValue(false);
    component.model.StartDate =null;
    component.model.EndDate =null;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDateControl.enabled).toBe(false);
     expect(component.endDateControl.enabled).toBe(false);
     expect(component.dateFormGroup.enabled).toBe(false);
    expect(component.projectForm.valid).toBe(false);
  });

  it("When Date Not Required Checked then Date's not given Then validation should fail", () => {
    expect(component).toBeTruthy();
    component.dateRequiredControl.setValue(true);
    component.model.StartDate =null;
    component.model.EndDate =null;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDateControl.valid).toBe(false);
     expect(component.endDateControl.valid).toBe(false);
     expect(component.dateFormGroup.valid).toBe(false);
  });

  it("When Start is Greater Than To Date then Date validation should fail", () => {
    expect(component).toBeTruthy();
    component.dateRequiredControl.setValue(true);
    component.model.StartDate =new Date(2018,11,26);
    component.model.EndDate =new Date(2018,11,24);
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDateControl.valid).toBe(true);
     expect(component.endDateControl.valid).toBe(true);
     expect(component.dateFormGroup.valid).toBe(false);
  });

  it("When Start is Less Than To Date then Date validation should pass", () => {
    expect(component).toBeTruthy();
    component.dateRequiredControl.setValue(true);
    component.model.StartDate =new Date(2018,11,24);
    component.model.EndDate =new Date(2018,11,26);
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDateControl.valid).toBe(true);
     expect(component.endDateControl.valid).toBe(true);
     expect(component.dateFormGroup.valid).toBe(true);
  });

  it("When Project Manager not selected then validation should fail", () => {
    expect(component).toBeTruthy();
    component.selectedManager=PMApiServiceMockData.User1;
    component.model.ProjectManager=component.selectedManager;
    component.model.ProjectManagerId=component.selectedManager.UserId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.managerControl.valid).toBe(true);
  });

  it("When Priority less than min should fail for priorty", () => {
    expect(component).toBeTruthy();
        component.model.Priority = priorityMin - 10;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.projectPriorityControl.valid).toBe(false);
  });

  it("When Priority greater than max should fail for priorty", () => {
    expect(component).toBeTruthy();
    component.model.Priority = priorityMax + 10;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.projectPriorityControl.valid).toBe(false);
  });

  it("When Priority between min and max then should not fail for priorty", () => {
    expect(component).toBeTruthy();
    component.model.Priority = 15;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.projectPriorityControl.valid).toBe(true);
  });

  it("When All Value given with Data required selected then validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.Project = PMApiServiceMockData.Project1_WithAll().Project;
    component.dateRequiredControl.setValue(true);
    component.model.StartDate = new Date(2018,11,24);
    component.model.EndDate = new Date(2018,11,26);
    component.model.Priority = 15;
    component.selectedManager=PMApiServiceMockData.User1;
       component.model.ProjectManager=component.selectedManager;
     component.model.ProjectManagerId=component.selectedManager.UserId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.projectForm.valid).toBe(true);
  });

  it("When All Value given with Data required not selected then validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.Project = PMApiServiceMockData.Project1_WithAll().Project;
    component.dateRequiredControl.setValue(false);
    component.model.Priority = 15;
    component.selectedManager=PMApiServiceMockData.User1;
       component.model.ProjectManager=component.selectedManager;
     component.model.ProjectManagerId=component.selectedManager.UserId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.projectForm.valid).toBe(true);
  });

});
