import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import {
  FormArray,
  Form,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from "@angular/forms";

import { Inject } from "@angular/core";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { mergeMap } from "rxjs/internal/operators/mergeMap";
import { filter } from "rxjs/internal/operators/filter";
import { IPmApiService } from "src/app/service/pm-api.service-interface";
import { UserModel } from "src/app/model/user-model";
import { PmServiceBus } from "src/app/service/service_bus";
import { ProjectModel } from "src/app/model/project-model";
import { TaskModel } from "src/app/model/task-model";
import { Router } from "@angular/router";
import { getTomorrowDate, getCurrentDate } from "../../../utils/date-util";
import { BsModalService } from "ngx-bootstrap";


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  searchForm: FormGroup;
  searchInputControl: FormControl;

  getDefaultProjectModel(): ProjectModel {
    let defaultProject: ProjectModel = {
      EndDate: getTomorrowDate(),
      Priority: 0,
      Project: null,
      ProjectId: -1,
      ProjectManager: null,
      ProjectManagerId: -1,
      StartDate: getCurrentDate(),
      Tasks: null,
      NoOfClosedTasks: 0,
      IsActive: true
    };
    return defaultProject;
  }

  selectedProject: ProjectModel = this.getDefaultProjectModel();

  @Input()
  tasks: TaskModel[];

  sortBy: String = "StartDate";

  //searchUserInputValue:string="";

  serarchInputValues: any[] = [this.selectedProject];
  columnsDisplay: string[] = ['Project', 'StartDate', 'EndDate'];
  searchFields: string[] = ['Project'];
  popupModelType: string = "Project";

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }

  constructor(
    private service: IPmApiService,
    private serviceBus: PmServiceBus,
    public router: Router,
    private modalService: BsModalService,
  ) {
    this.initFormsControl();
  }

  ngOnInit() {
    //this.loadTaskModel();
    // this.serviceBus.ProjectSearchObservable.subscribe(x => {
    //   this.loadTaskModel();
    // });
  }

  private initFormsControl() {
    this.searchInputControl = new FormControl(this.selectedProject.Project);
    this.searchInputControl.disable();

    this.searchForm = new FormGroup({
      searchInputControl: this.searchInputControl
    });

    this.searchInputControl.valueChanges.subscribe(x=>
      {
        this.loadTaskModel();
      });
    // this.searchForm.valueChanges.subscribe(x=>
    //   {
    //     this.searchUserInputValue=this.searchInputControl.value;
    //   });
  }

  loadTaskModel(): void {
    this.service.getAllTaskForProject(this.selectedProject).subscribe(x => {
      this.tasks = x;
    });
  }

  // onEditProject(project: ProjectModel): void {
  //   this.serviceBus.ProjectEditObservable.next(project);
  // }

  // onSuspendProject(project: ProjectModel): void {
  //   project.IsActive=!project.IsActive;
  //   this.service.UpdateProject(project).subscribe(x => {
  //     console.log("Project Suspended...");
  //     //this.router.navigate(["/AddUser"]);
  //     this.loadTaskModel();
  //   });
  // }

  onSort(field: string): void {
    this.sortBy = field;
  }

  OnEditTask(task: TaskModel) {
    this.router.navigate(['EditTask', task.TaskId]);
  }

  OnEndTask(task: TaskModel) {
    task.EndDate = new Date();
    task.IsClosed = true;
    this.service.UpdateTask(task).subscribe(x => {
      console.log("Task Ended...");
      this.loadTaskModel();
    });
  }

  onSearchProject() {
    //let displayColumn:string[]={};
    this.columnsDisplay = ['Project', 'StartDate', 'EndDate'];
    this.searchFields = ['Project'];
    this.popupModelType = "Project";
    this.service.getProjects().subscribe(x => {
      this.serarchInputValues = x;
      this.serviceBus.CommonSearchObservable.next(true);
    });
  }

  HandleRowSelected(selectedValue: [any, boolean, string]) {
    if (selectedValue[1]) {
      if (selectedValue[2] === "Project") {
        this.selectedProject = selectedValue[0];
        this.searchInputControl.setValue(this.selectedProject.Project);
      }
    }
  }
}