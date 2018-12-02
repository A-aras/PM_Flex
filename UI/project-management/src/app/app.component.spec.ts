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

import { AppComponent } from "./app.component";
import { UserDashboardComponent } from "src/app/ui/user/user-dashboard/user-dashboard.component";
import { ViewUserComponent } from "src/app/ui/user/view-user/view-user.component";
import { AddUserComponent } from "src/app/ui/user/add-user/add-user.component";
import { SortPipe } from "src/app/pipes/sort.pipe";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { ProjectDashboardComponent } from "src/app/ui/project/project-dashboard/project-dashboard.component";
import { AddProjectComponent } from "src/app/ui/project/add-project/add-project.component";
import { ViewProjectComponent } from "src/app/ui/project/view-project/view-project.component";
import { ArrayLenghtPipe } from "src/app/pipes/arraylenght.pipe";
import { ViewTaskComponent } from "src/app/ui/task/view-task/view-task.component";
import { AddTaskComponent } from "src/app/ui/task/add-task/add-task.component";
import { SearchModuleComponent } from "src/app/ui/search/search-module/search-module.component";
import { AppModuleUnitTestFixture } from "src/app/app.module.unittest.fixture";
import { PmApiServiceFake } from "src/app/service/pm-api.service.fake";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: IPmApiService, useClass: PmApiServiceFake }],
      declarations: [
        AppComponent,
        UserDashboardComponent,
        ViewUserComponent,
        AddUserComponent,
        SortPipe,
        FilterPipe,
        ProjectDashboardComponent,
        AddProjectComponent,
        ViewProjectComponent,
        //SearchManagerComponent,
        ArrayLenghtPipe,
        ViewTaskComponent,
        AddTaskComponent,
        SearchModuleComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DatepickerModule,
        BsDatepickerModule,
        ModalModule
      ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'project-management'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("project-management");
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to project-management!');
  // }));
});
