import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";

import { IPmApiService } from "src/app/service/pm-api.service-interface";
import {
  FormArray,
  Form,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from "@angular/forms";

import { Input } from "@angular/core";

import { Router, Route, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, debounceTime, filter } from "rxjs/operators";

import { of, Subject } from "rxjs";

import { DatePipe } from "@angular/common";

import { setTheme } from "ngx-bootstrap/utils";
import { TemplateRef } from "@angular/core";
import { BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker/bs-datepicker.module";
import { DatePickerComponent } from "ngx-bootstrap/datepicker/datepicker.component";

import { isDate } from "util";
import { UserModel } from "src/app/model/user-model";
import { ValidationHelper } from "src/app/validators/validation-helper";
import { PmServiceBus } from "src/app/service/service_bus";
import { ProjectModel } from "src/app/model/project-model";
import * as Validator from "src/app/validators/";
import * as Const from "src/app/const/const";
import { DatepickerModule } from "ngx-bootstrap/datepicker/datepicker.module";
import { createDate } from "ngx-bootstrap/chronos/create/date-from-array";
import { getTomorrowDate, getCurrentDate } from "src/app/utils/date-util";
import { TaskModel } from "src/app/model/task-model";
import { RxStompService } from "@stomp/ng2-stompjs";
import { Message } from "@stomp/stompjs";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  readonly priorityMin = Const.priorityMin;
  readonly priorityMax = Const.priorityMax;

  taskForm: FormGroup;
  projectControl: FormControl;
  // dateRequiredControl: FormControl;
  dateFormGroup: FormGroup;
  startDateControl: FormControl;
  endDateControl: FormControl;
  taskControl: FormControl;
  isParentTaskControl: FormControl;
  taskPriorityControl: FormControl;
  parentTaskControl: FormControl;
  userControl: FormControl;
  btnAction = "Add";

  searchModalDisplayed: boolean = false;
  rowSelected: boolean = false;

  @ViewChild("projectSearchModal")
  searchModal: ModalDirective;

  @ViewChild("alertModal")
  alertModal: ModalDirective;

  DialogResult: Subject<boolean> = new Subject<boolean>();

  getDefaultUserModel(): UserModel {
    let defaultUser: UserModel = {
      EmployeeId: -1,
      FirstName: "",
      LastName: "",
      UserId: -1
    };
    return defaultUser;
  }
  selectedUser: UserModel = this.getDefaultUserModel();

  getDefaultProjectModel(): ProjectModel {
    let defaultProject: ProjectModel = {
      EndDate: getTomorrowDate(),
      Priority: 0,
      Project: null,
      ProjectId: -1,
      ProjectManager: this.selectedUser,
      ProjectManagerId: -1,
      StartDate: getCurrentDate(),
      Tasks: null,
      NoOfClosedTasks: 0,
      IsActive: true
    };
    return defaultProject;
  }

  selectedProject: ProjectModel = this.getDefaultProjectModel();

  getDefaultParentTaskModel(): TaskModel {
    let defaultParentTask: TaskModel = {
      EndDate: null,
      ChildTasks: null,
      IsClosed: false,
      IsParentTask: true,
      ParentTask: null,
      ParentTaskId: -1,
      Priority: -1,
      Project: null,
      StartDate: null,
      TaskDescription: "",
      TaskId: -1,
      User: null,
      ProjectId: -1,
      UserId: -1
    };
    return defaultParentTask;
  }

  selectedParentTask: TaskModel = this.getDefaultParentTaskModel();

  getDefaultTaskModel(): TaskModel {
    let defaultTask: TaskModel = {
      EndDate: getTomorrowDate(),
      Priority: 0,
      Project: this.getDefaultProjectModel(),
      StartDate: getCurrentDate(),
      ParentTask: this.getDefaultParentTaskModel(),
      ChildTasks: null,
      IsParentTask: false,
      ParentTaskId: -1,
      TaskDescription: "",
      IsClosed: true,
      TaskId: -1,
      User: this.getDefaultUserModel(),
      UserId: -1,
      ProjectId: -1
    };
    return defaultTask;
  }

  model: TaskModel = this.getDefaultTaskModel();

  // this.columnsDisplay=['Project','StartDate','EndDate'];
  //   this.searchFields=['Project'];
  serarchInputValues: any[] = [this.selectedProject];
  columnsDisplay: string[] = ["Project", "StartDate", "EndDate"];
  searchFields: string[] = ["Project"];
  popupModelType: string = "Project";

  constructor(
    private service: IPmApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService,
    private serviceBus: PmServiceBus,
    private rxStompService: RxStompService
  ) {
    setTheme("bs4");
    this.initFormsControl();
    //this.model.endDate=this.model.startDate.addDays(1);

    this.rxStompService.watch('ws://localhost:55887/api/Message/Subscribe').subscribe((message: Message) => {

      //this.receivedMessages.push(message.body);
    });

  }

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(
        debounceTime(500),
        switchMap((parms: any) => {
          if (parms === null || parms === undefined || !parms.has("id")) {
            this.btnAction = "Add";
            return of(this.model);
          }
          //if (parms.has("id")) {
          let id = Number.parseInt(parms.get("id"));
          this.btnAction = "Save";
          return this.service.getTaskById(id);
          // }
          // this.btnAction = "Add";
          // return of(this.model);
        })
      )
      .subscribe(x => {
        this.model = x;
        this.selectedParentTask = x.ParentTask;
        this.selectedProject = x.Project;
        this.selectedUser = x.User;
        this.UpdateValuesFromModelToFormsControls();
      });

    // this.serviceBus.ProjectEditObservable.subscribe(x => {
    //   this.btnAction = "Save";
    //   this.model = x;
    //   this.UpdateValuesFromModelToFormsControls();
    // });

    // this.activeRoute.paramMap
    //   .pipe(debounceTime(500),
    //     switchMap((parms: any) => {
    //       //console.log(parms);
    //       if(parms===null || parms===undefined ||!parms.has("id"))
    //       {
    //         this.btnAction = "Add";
    //         return of(this.model);
    //       }
    //       //if (parms.has("id")) {
    //         let id = Number.parseInt(parms.get("id"));
    //         this.btnAction = "Save";
    //         return this.service.getTaskById(id);
    //       // }
    //       // this.btnAction = "Add";
    //       // return of(this.model);
    //     })
    //   )
    //   .subscribe(x => {
    //     this.model = x;
    //     this.UpdateValuesFromModelToFormsControls();
    //   });

    this.DialogResult.pipe(filter(x => x)).subscribe(x => {
      //this.model.Project = this.projectControl.value;
      this.model.TaskDescription = this.taskControl.value;
      if (this.isParentTaskControl.value === false) {
        this.model.IsParentTask = false;
        this.model.Priority = this.taskPriorityControl.value;
        this.model.StartDate = this.startDateControl.value;
        this.model.EndDate = this.endDateControl.value;
        this.model.Project = this.selectedProject;
        this.model.ParentTaskId =
          this.selectedParentTask === null ||
          this.selectedParentTask === undefined
            ? null
            : this.selectedParentTask.TaskId === -1
            ? null
            : this.selectedParentTask.TaskId;
        this.model.ParentTask =
          this.selectedParentTask === null ||
          this.selectedParentTask === undefined
            ? null
            : this.selectedParentTask.TaskId === -1
            ? null
            : this.selectedParentTask;
        this.model.User = this.selectedUser;

        this.model.UserId =
          this.selectedUser === null || this.selectedUser === undefined
            ? null
            : this.selectedUser.UserId;
        this.model.ProjectId =
          this.selectedProject === null || this.selectedProject === undefined
            ? null
            : this.selectedProject.ProjectId;
        this.model.IsClosed = false;
      } else {
        this.model.IsParentTask = true;
        this.model.Priority = 0;
        this.model.ParentTask = null;
        this.model.ParentTaskId = null;
        this.model.UserId =
          this.selectedUser === null || this.selectedUser === undefined
            ? null
            : this.selectedUser.UserId;
        
        this.model.User=this.selectedUser;

        this.model.StartDate = null;
        this.model.EndDate = null;
        this.model.IsClosed = false;
        this.model.Project = this.selectedProject;
        this.model.ProjectId =
          this.selectedProject === null || this.selectedProject === undefined
            ? null
            : this.selectedProject.ProjectId;
      }

      if (this.btnAction === "Add") {
        this.service.AddTask(this.model).subscribe(x => {
          console.log("Task Added...");
          this.router.navigate(["/ViewTask"]);
          //this.refreshProject();
        });
      } else if (this.btnAction === "Save") {
        this.service.UpdateTask(this.model).subscribe(x => {
          console.log("Task Updated...");
          this.router.navigate(["/ViewTask"]);
          //this.refreshProject();
        });
      }
    });
  }

  UpdateValuesFromModelToFormsControls() {
    //this.projectControl.setValue(this.model.Project.ProjectId);
    this.taskControl.setValue(this.model.TaskDescription);

    this.taskPriorityControl.setValue(this.model.Priority);
    if (this.model.ParentTask != null) {
      this.selectedParentTask = this.model.ParentTask;
      this.parentTaskControl.setValue(this.model.ParentTask.TaskDescription);
    } else {
      this.parentTaskControl.setValue("");
    }

    if (this.model.StartDate != null) {
      this.startDateControl.setValue(new Date(this.model.StartDate));
    } else {
      this.startDateControl.setValue(null);
    }

    if (this.model.EndDate != null) {
      this.endDateControl.setValue(new Date(this.model.EndDate));
    } else {
      this.endDateControl.setValue(null);
    }

    if (this.model.User != null) {
      this.selectedUser = this.model.User;
      this.userControl.setValue(this.model.User.FirstName);
    } else {
      this.userControl.setValue("");
    }

    if (this.model.Project != null) {
      this.selectedProject = this.model.Project;
      this.projectControl.setValue(this.model.Project.Project);
    } else {
      this.projectControl.setValue("");
    }

    this.isParentTaskControl.setValue(this.model.IsParentTask);

    if (this.btnAction != "Add") {
      this.isParentTaskControl.disable();
    }
  }

  initFormsControl(): void {
    this.projectControl = new FormControl(
      this.model.Project.Project,
      Validators.required
    );

    this.taskControl = new FormControl(this.model.TaskDescription, [
      Validators.required
    ]);

    this.isParentTaskControl = new FormControl(this.model.IsParentTask);

    this.startDateControl = new FormControl(this.model.StartDate, [
      Validators.required,
      Validator.IsValidDate
    ]);

    this.endDateControl = new FormControl(this.model.EndDate, [
      Validators.required,
      Validator.IsValidDate
    ]);

    // let dateValidator = Validator.DateMustbeGreaterThanValidation(
    //   "startDateControl",
    //   "endDateControl"
    // );

    this.dateFormGroup = new FormGroup({
      startDateControl: this.startDateControl,
      endDateControl: this.endDateControl
    });

    //this.dateFormGroup.setValidators(dateValidator);

    this.taskPriorityControl = new FormControl(this.model.Priority, [
      Validators.required,
      Validators.min(Const.priorityMin),
      Validators.max(Const.priorityMax)
    ]);

    this.parentTaskControl = new FormControl(
      this.model.ParentTask.TaskDescription
    );

    this.userControl = new FormControl(
      this.model.User.FirstName,
      Validators.required
    );

    this.taskForm = new FormGroup({
      projectControl: this.projectControl,
      taskControl: this.taskControl,
      dateFormGroup: this.dateFormGroup,
      taskPriorityControl: this.taskPriorityControl,
      parentTaskControl: this.parentTaskControl,
      userControl: this.userControl
    });

    this.isParentTaskControl.valueChanges.subscribe(x => {
      if ((x as boolean) === false) {
        this.startDateControl.enable();
        this.startDateControl.setValidators([
          Validators.required,
          Validator.IsValidDate
        ]);

        this.endDateControl.enable();
        this.endDateControl.setValidators([
          Validators.required,
          Validator.IsValidDate
        ]);

        let dataValidation = Validator.DateMustbeGreaterThanValidation(
          "startDateControl",
          "endDateControl"
        );

        this.dateFormGroup.setValidators(dataValidation);

        this.taskPriorityControl.enable();
        this.taskPriorityControl.setValidators([
          Validators.required,
          Validators.min(Const.priorityMin),
          Validators.max(Const.priorityMax)
        ]);

        //this.parentTaskControl.disable();

        //this.projectControl.disable();

        this.userControl.enable();
        this.userControl.setValidators([Validators.required]);
      } else {
        this.startDateControl.disable();
        this.startDateControl.clearValidators();

        this.endDateControl.disable();
        this.endDateControl.clearValidators();

        this.dateFormGroup.clearValidators();

        this.taskPriorityControl.disable();
        this.taskPriorityControl.clearValidators();

        this.parentTaskControl.disable();

        // this.userControl.disable();
        // this.userControl.clearValidators();
      }
      this.model.IsParentTask = x as boolean;
    });
  }

  onSearchProject() {
    //let displayColumn:string[]={};
    this.columnsDisplay = ["Project", "StartDate", "EndDate"];
    this.searchFields = ["Project"];
    this.popupModelType = "Project";
    this.service.getProjects().subscribe(x => {
      this.serarchInputValues = x;
      this.searchModalDisplayed = true;
      this.serviceBus.CommonSearchObservable.next(true);
    });
  }

  onSearchUser() {
    this.columnsDisplay = ["EmployeeId", "FirstName", "LastName"];
    this.searchFields = ["FirstName", "LastName"];
    this.popupModelType = "User";
    this.service.getUsers().subscribe(x => {
      this.serarchInputValues = x;
      this.searchModalDisplayed = true;
      this.serviceBus.CommonSearchObservable.next(true);
    });
  }

  onSearchParentTask() {
    this.columnsDisplay = ["TaskDescription", "StartDate", "EndDate"];
    this.searchFields = ["TaskDescription"];
    this.popupModelType = "ParentTask";
    this.service.getAllParentTasksForProject(this.selectedProject).subscribe(x => {
      this.serarchInputValues = x;
      this.searchModalDisplayed = true;
      this.serviceBus.CommonSearchObservable.next(true);
    });
  }

  HandleRowSelected(selectedValue: [any, boolean, string]) {
    if (selectedValue[1]) {
      if (selectedValue[2] === "ParentTask") {
        this.selectedParentTask = selectedValue[0];
        this.parentTaskControl.setValue(
          this.selectedParentTask.TaskDescription
        );
      }
      if (selectedValue[2] === "Project") {
        this.selectedProject = selectedValue[0];
        this.projectControl.setValue(this.selectedProject.Project);
      }
      if (selectedValue[2] === "User") {
        this.selectedUser = selectedValue[0];
        this.userControl.setValue(this.selectedUser.FirstName);
      }
    }
    // this.rowSelected = selectedValue[1];
    // this.selectedManager = selectedValue[0];
    // this.model.projectManager=selectedValue[0];
    // this.model.projectManagerId=(selectedValue[0] as UserModel).UserId;
  }

  onTaskSave() {
    ValidationHelper.Validate(this.taskForm);

    if (this.taskForm.valid) {
      this.ShowAlterModel();
      return;
      //alert("form valid");
    }
    alert("Please enter valid inputs to proceed further");
  }

  ShowAlterModel() {
    this.alertModal.show();
  }

  confirmAlertModal(): void {
    this.alertModal.hide();
    this.DialogResult.next(true);
  }

  declineAlertModal(): void {
    this.alertModal.hide();
    this.DialogResult.next(false);
  }
}
