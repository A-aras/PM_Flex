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


@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
  providers: [DatePipe]
})
export class AddProjectComponent implements OnInit {
  readonly priorityMin = Const.priorityMin;
  readonly priorityMax = Const.priorityMax;

  projectForm: FormGroup;
  projectControl: FormControl;
  dateRequiredControl: FormControl;
  dateFormGroup: FormGroup;
  startDateControl: FormControl;
  endDateControl: FormControl;
  projectPriorityControl: FormControl;
  managerControl: FormControl;
  btnAction = "Add";
  searchModalDisplayed: boolean = false;
  rowSelected: boolean = false;

  getDefaultUserModel():UserModel{
    let defaultUser:UserModel   = {
      EmployeeId: -1,
      FirstName: "",
      LastName: "",
      UserId: -1
    };
    return defaultUser;
  }

  selectedManager:UserModel=this.getDefaultUserModel();

  getDefaultProjectModel():ProjectModel{
    this.selectedManager=this.getDefaultUserModel();
    let defaultProject:ProjectModel   = {
      EndDate: getTomorrowDate(),
      Priority: 0,
      Project: null,
      ProjectId: -1,
      ProjectManager: this.selectedManager,
      ProjectManagerId: -1,
      StartDate: getCurrentDate(),
      Tasks: null,
      NoOfClosedTasks:0,
      IsActive:true
    };
    return defaultProject;
  }

  

  serarchInputValues: any[] ;//= [this.defaultProject];
  columnsDisplay: string[] = ['FirstName', 'LastName', 'EmployeeId'];
  searchFields: string[] = ['FirstName','LastName'];
  popupModelType: string="Project Manager";

  @ViewChild("searchModal")
  searchModal: ModalDirective;

  @ViewChild("alertModal")
  alertModal: ModalDirective;

  DialogResult: Subject<boolean> = new Subject<boolean>();

  model: ProjectModel = this.getDefaultProjectModel();

  

  constructor(
    private service: IPmApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService,
    private serviceBus: PmServiceBus
  ) {
    setTheme("bs4");
    this.initFormsControl();
    //this.model.endDate=this.model.startDate.addDays(1);
  }

  ngOnInit() {

    this.serviceBus.ProjectEditObservable.subscribe(x => {
      this.btnAction = "Save";
      this.model = x;
      this.selectedManager=x.ProjectManager;
      this.UpdateValuesFromModelToFormsControls();
    });

    this.DialogResult
    .pipe(
      filter(x =>{
        return x;
      }
      )
    )
    .subscribe(x => {
      this.model.Project = this.projectControl.value;
      if(this.dateRequiredControl.value==true)
      {
        this.model.StartDate = this.startDateControl.value;
        this.model.EndDate = this.endDateControl.value;
      }
      else
      {
        this.model.StartDate=null;
        this.model.EndDate=null;
      }

      this.model.ProjectManager=this.selectedManager;
      this.model.ProjectManagerId=this.selectedManager===null?null:this.selectedManager.UserId;
      this.model.Priority = this.projectPriorityControl.value;
      

      if (this.btnAction === "Add") {
        this.model.ProjectId=-1;
        this.service.AddProject(this.model).subscribe(x => {
          console.log("Project Added...");
          //this.router.navigate(["/AddUser"]);
          this.refreshProject();
        });
      } else if (this.btnAction === "Save") {
        this.service.UpdateProject(this.model).subscribe(x => {
          console.log("Project Updated...");
          //this.router.navigate(["/AddUser"]);
          this.refreshProject();
        });
      }
    });
  }

  initFormsControl(): void {
    this.projectControl = new FormControl(
      this.model.Project,
      Validators.required
    );

    //this.projectControl .disable();

    this.dateRequiredControl = new FormControl(false);

    // this.startDateControl = new FormControl(this.model.startDate, [
    //   Validators.required,
    //   Validator.IsValidDate
    // ]);

    this.startDateControl = new FormControl(this.model.StartDate);

    this.startDateControl.disable();

    // this.endDateControl = new FormControl(this.model.endDate, [
    //   Validators.required,
    //   Validator.IsValidDate
    // ]);

    this.endDateControl = new FormControl(this.model.EndDate);

    this.endDateControl.disable();

    // let dateValidator = Validator.DateMustbeGreaterThanValidation(
    //   "startDateControl",
    //   "endDateControl"
    // );

    
    this.dateFormGroup = new FormGroup({
      startDateControl: this.startDateControl,
      endDateControl: this.endDateControl
    });
    
    //this.dateFormGroup.setValidators(dateValidator);

    this.dateRequiredControl.valueChanges.subscribe(x => {
      if(this.dateRequiredControl.value as boolean===true)
      {
        this.startDateControl.enable();
        this.startDateControl.setValidators([Validators.required,
          Validator.IsValidDate]);

          this.endDateControl.enable();
        this.endDateControl.setValidators([Validators.required,
          Validator.IsValidDate]);

          let dataValidation = Validator.DateMustbeGreaterThanValidation(
            "startDateControl",
            "endDateControl"
          );

          this.dateFormGroup.setValidators(dataValidation);
      }
      else{
        this.startDateControl.disable();
        this.startDateControl.clearValidators();

        this.endDateControl.disable();
        this.endDateControl.clearValidators();

        this.dateFormGroup.clearValidators();
      }
    });

    this.projectPriorityControl = new FormControl(this.model.Priority, [
      Validators.required,
      Validators.min(Const.priorityMin),
      Validators.max(Const.priorityMax)
    ]);

    this.managerControl = new FormControl(
      this.model.ProjectManager.FirstName,
      Validators.required
    );
    //this.managerControl.();

    this.projectForm = new FormGroup({
      projectControl: this.projectControl,
      dateRequiredControl: this.dateRequiredControl,
      dateFormGroup: this.dateFormGroup,
      projectPriorityControl: this.projectPriorityControl,
      managerControl: this.managerControl
    });
  }

  // onSearchManager(): void {
  //   this.searchModal.show();
  //   this.searchModalDisplayed = true;
  // }

  // HandleRowSelection(selectedValue: [UserModel, boolean]) {
  //   this.rowSelected = selectedValue[1];
  //   this.selectedManager = selectedValue[0];
  //   // this.model.projectManager=selectedValue[0];
  //   // this.model.projectManagerId=(selectedValue[0] as UserModel).UserId;
  // }

  confirm(): void {
    this.model.ProjectManager = this.selectedManager;
    this.model.ProjectManagerId = this.selectedManager.UserId;
    this.searchModal.hide();
    this.searchModalDisplayed = true;
    this.UpdateValuesFromModelToFormsControls();
  }

  decline(): void {
    this.searchModal.hide();
    this.searchModalDisplayed = true;
  }

  UpdateValuesFromModelToFormsControls() {
    
    this.projectControl.setValue(this.model.Project);
    this.projectPriorityControl.setValue(this.model.Priority);
    this.managerControl.setValue(this.model.ProjectManager.FirstName);

    if (this.model.StartDate != null) {
      this.dateRequiredControl.setValue(true);
      this.startDateControl.setValue(new Date(this.model.StartDate));
    } else {
      this.dateRequiredControl.setValue(false);
      this.startDateControl.setValue(null);
    }

    if (this.model.EndDate != null) {
      this.endDateControl.setValue(new Date(this.model.EndDate));
    } else {
      this.endDateControl.setValue(null);
    }
  }


  refreshProject(): void {
    this.btnAction = "Add";
    this.projectForm.reset();
    // this.model.IsActive=true;
    // this.model.Tasks=null;
    // this.model.ProjectId=-1;
    // this.model.Priority=0;
    // this.model.ProjectManager=null;
    // this.model.ProjectManagerId=null;
    // this.model.EndDate= getTomorrowDate();
    // this.model.StartDate= getCurrentDate();
    // this.model.Project="";
    this.model=this.getDefaultProjectModel();
    this.UpdateValuesFromModelToFormsControls();

    this.serviceBus.ProjectSearchObservable.next(true);
  }

  onProjectSave() {
    ValidationHelper.Validate(this.projectForm);

    if (this.projectForm.valid) {
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

  onSearchProjectManager() {
    this.columnsDisplay = ['EmployeeId', 'FirstName', 'LastName'];
    this.searchFields = ['FirstName', 'LastName'];
    this.popupModelType = "Project Manager";
    this.service.getUsers().subscribe(x => {
      this.serarchInputValues = x;
      this.searchModalDisplayed = true;
      this.serviceBus.CommonSearchObservable.next(true);
    });
  }

  HandleRowSelected(selectedValue: [any, boolean, string]) {
    if (selectedValue[1]) {
        this.selectedManager = selectedValue[0];
        this.managerControl.setValue(this.selectedManager.FirstName);
        //this.managerControl.markAsTouched();
    }
    // this.rowSelected = selectedValue[1];
    // this.selectedManager = selectedValue[0];
    // this.model.projectManager=selectedValue[0];
    // this.model.projectManagerId=(selectedValue[0] as UserModel).UserId;
  }

}
