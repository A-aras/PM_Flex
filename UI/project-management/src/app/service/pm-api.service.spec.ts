import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { PmApiService } from './pm-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { PMApiServiceMockData } from './pm-api.service.mock';


describe('PmApiService', () => {

  let injector = TestBed;
  let service: PmApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmApiService],
      imports: [HttpClientTestingModule]
    });
    injector = TestBed;
    service = TestBed.get(PmApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    //To check there is no outstanding outbound call after each test
    httpMock.verify();
  });


  it('When Task Service Instance Required Then Injector Provides',
    () => {
      expect(service).toBeTruthy();
      httpMock.verify();
    });

    it('When getTaskById Then getTaskById Should return matching Task', () => {
      service.getTaskById(PMApiServiceMockData.Project1_ParentTask1_ChildTask1.TaskId).subscribe(x => {
        //expect(x.length).toBe(3);
        expect(x).toBe(PMApiServiceMockData.Project1_ParentTask1_ChildTask1);
      });
      var request = httpMock.expectOne(environment.ApiService + "/Task/GetTaskById/"+PMApiServiceMockData.Project1_ParentTask1_ChildTask1.TaskId);
      expect(request.request.method).toBe('GET');
      request.flush(PMApiServiceMockData.Project1_ParentTask1_ChildTask1);
  
    });

    it('When getTasks Then Should return all Tasks', () => {
      service.getTasks().subscribe(x => {
        expect(x.length).toBe(3);
        expect(x).toBe(PMApiServiceMockData.Tasks);
      });
      var request = httpMock.expectOne(environment.ApiService + "/Task/GetTasks");
      expect(request.request.method).toBe('GET');
      request.flush(PMApiServiceMockData.Tasks);
  
    });

    it('When getParentTasks Then Should return Parent Tasks', () => {
      service.getParentTasks().subscribe(x => {
        expect(x.length).toBe(1);
        expect(x[0]).toBe(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks());
      });
      var request = httpMock.expectOne(environment.ApiService + "/Task/GetParentTasks");
      expect(request.request.method).toBe('GET');
      request.flush(PMApiServiceMockData.Tasks.filter(x=>x.IsParentTask));
  
    });


    it('When Add Task Then AddTaks(TaskModel) Should Make Post Call', () => {
      service.AddTask(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks()).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/Task/AddTask"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks());
      request.flush(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks());
    });

    it('When Update Task Then Update(TaskModel) Should Make Post Call', () => {
      service.UpdateTask(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks()).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/Task/UpdateTask"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks());
      request.flush(PMApiServiceMockData.Project1_ParentTask1_WithChildTasks());
    });

    it('When getProjects Then Should return all Projects', () => {
      service.getProjects().subscribe(x => {
        expect(x.length).toBe(2);
        expect(x).toBe(PMApiServiceMockData.Projects);
      });
      var request = httpMock.expectOne(environment.ApiService + "/Project/GetProjects");
      expect(request.request.method).toBe('GET');
      request.flush(PMApiServiceMockData.Projects);
  
    });

    it('When Add Project Then AddProject(ProjectModel) Should Make Post Call', () => {
      service.AddProject(PMApiServiceMockData.Project1_WithAll()).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/Project/AddProject"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.Project1_WithAll());
      request.flush(PMApiServiceMockData.Project1_WithAll());
    });

    it('When Update Project Then UpdateProject(ProjectModel) Should Make Post Call', () => {
      service.UpdateProject(PMApiServiceMockData.Project1_WithAll()).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/Project/UpdateProject"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.Project1_WithAll());
      request.flush(PMApiServiceMockData.Project1_WithAll());
    });

    it('When getUsers Then Should return all Users', () => {
      service.getUsers().subscribe(x => {
        expect(x.length).toBe(2);
        expect(x).toBe(PMApiServiceMockData.Users);
      });
      var request = httpMock.expectOne(environment.ApiService + "/User/GetUsers");
      expect(request.request.method).toBe('GET');
      request.flush(PMApiServiceMockData.Users);
  
    });

    it('When Add User Then AddUser(UserModel) Should Make Post Call', () => {
      service.AddUser(PMApiServiceMockData.User1).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/User/AddUser"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.User1);
      request.flush(PMApiServiceMockData.User1);
    });

    it('When Update User Then UpdateUser(UserModel) Should Make Post Call', () => {
      service.UpdateUser(PMApiServiceMockData.User1).subscribe(x => {
      });
      var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/User/UpdateUser"));
      expect(request.request.body).not.toBeNull();
      expect(request.request.body).toBe(PMApiServiceMockData.User1);
      request.flush(PMApiServiceMockData.User1);
    });

});
