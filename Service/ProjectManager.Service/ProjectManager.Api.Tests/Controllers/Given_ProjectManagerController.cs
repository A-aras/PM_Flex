//using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using NUnit.Framework.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Web.Http.Results;
//using ProjectManager.Api.;
//using ProjectManager.Api.
using ProjectManager.BusinessLayer;
using ProjectManager.DAL;
using ProjectManager.Entities;
using ProjectManager.QualityTools;
using Unity;
using NSubstitute;
using ProjectManager.API.Controllers;
using ProjectManager.QualityTools;
//using ProjectManager.Api.Tests.Utils;

namespace ProjectManager.Api.Tests.Controllers
{
    [TestFixture]
    public class Given_ProjectManagerController
    {
        private ProjectManagerController Controller;
        private UnityContainer container;

        [SetUp]
        public void Setup()
        {
            container = new UnityContainer();
            container.RegisterType<IProjectManagerDbContext, ProjectManagerDbContextFake>();
            container.RegisterType<IProjectManagerService, ProjectManagerService>();
            var taskService = container.Resolve<IProjectManagerService>();
            Controller = new ProjectManagerController(taskService);
        }

        #region User

        [TestCase]
        public void When_UserWithInvalidState_Then_ValidationShouldStopFurtherSteps()
        {
            // Arrange & Act
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.FirstName = null;
            var context = new ValidationContext(user, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(user, context, valResult, true); ;

            // Assert
            Assert.True(!modelState);

        }

        [TestCase]
        public void When_UserWithValidState_Then_ValidationShouldNotThrow()
        {
            // Arrange & Act
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            var context = new ValidationContext(user, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(user, context, valResult, true); ;

            // Assert
            Assert.True(modelState);
        }

        [TestCase]
        public void When_Add_AnNewUser_Then_Pass()
        {
            // Arrange
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.UserId = -1;

            // Act
            var result = Controller.AddUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_Add_AnExistingUser_Then_Fail()
        {
            // Arrange
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;

            // Act 
            var result = Controller.AddUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_AddWithUserWithInvalidState_Then_Fail()
        {
            // Arrange
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.UserId = -1;
            user.FirstName = null;

            // Act
            Controller.ModelState.AddModelError("FirstName", "FirstName required");
            var result = Controller.AddUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_AddWithUserWithValidState_Then_HttpOk()
        {
            // Arrange
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.UserId = -1;
            user.FirstName = "Updated First Name";

            // Act
            var result = Controller.AddUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_UpdateExistingUserWithInvalidState_Then_Fail()
        {
            // Arrange 
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.FirstName = null;

            // Act
            Controller.ModelState.AddModelError("FirstName", "FirstName required");
            var result = Controller.UpdateUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_UpdateAnExistingUser_Then_HttpOK()
        {
            // Arrange 
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.FirstName = "Second Name";

            // Act
            var result = Controller.UpdateUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var castedResult = result as StatusCodeResult;
            Assert.AreEqual(HttpStatusCode.OK, castedResult.StatusCode);
        }

        [TestCase]
        public void When_UpdateAnNonExistingUser_Then_HttpBad()
        {
            // Arrange 
            var user = ProjectManagerFakeData.UserFakeData.User1.DeepCopy() as UserModel;
            user.FirstName = "Second Name";
            user.UserId = -1;

            // Act
            var result = Controller.UpdateUser(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_GetAllUsers_Then_AllUsersReceived()
        {
            // Arrange & Act
            var result = Controller.GetUsers();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.UserFakeData.AllUsers.Count(), result.Count());
        }

        [TestCase]
        public void When_DeleteNonExistingUser_Then_NotFoundReceived()
        {
            // Arrange & Act
            var result = Controller.DeleteUser(-1);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [TestCase]
        public void When_DeleteExistingUser_Then_Deleted()
        {
            // Arrange & Act
            var result = Controller.DeleteUser(1);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkNegotiatedContentResult<UserModel>>(result);
            var castedResult = result as OkNegotiatedContentResult<UserModel>;
            Assert.AreEqual(1, castedResult.Content.UserId);

        }


        #endregion

        #region Project
        [TestCase]
        public void When_ProjectWithInvalidState_Then_ValidationShouldStopFurtherSteps()
        {
            // Arrange & Act
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.Project = null;
            var context = new ValidationContext(project, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(project, context, valResult, true); ;

            // Assert
            Assert.True(!modelState);

        }

        [TestCase]
        public void When_ProjectWithValidState_Then_ValidationShouldNotThrow()
        {
            // Arrange & Act
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            var context = new ValidationContext(project, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(project, context, valResult, true); ;

            // Assert
            Assert.True(modelState);
        }

        [TestCase]
        public void When_Add_AnNewProject_Then_Pass()
        {
            // Arrange
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.ProjectId = -1;

            // Act
            var result = Controller.AddProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_Add_AnExistingProject_Then_Fail()
        {
            // Arrange
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;


            // Act
            var result = Controller.AddProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_AddWithProjectWithInvalidState_Then_Fail()
        {
            // Arrange
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.Project = null;

            // Act
            Controller.ModelState.AddModelError("Project", "Project required");
            var result = Controller.AddProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_AddProjectWithValidState_Then_HttpOk()
        {
            // Arrange
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.ProjectId = -1;

            // Act
            var result = Controller.AddProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_UpdateExistingProjectWithInvalidState_Then_Fail()
        {
            // Arrange
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.Project = null;

            // Act
            Controller.ModelState.AddModelError("Project", "Project required");
            var result = Controller.UpdateProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_UpdateAnExistingProject_Then_HttpOK()
        {
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.Project = "Project Updated";

            // Act

            var result = Controller.UpdateProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var castedResult = result as StatusCodeResult;
            Assert.AreEqual(HttpStatusCode.OK, castedResult.StatusCode);

        }

        [TestCase]
        public void When_UpdateAnNonExistingProject_Then_HttpBad()
        {
            var project = ProjectManagerFakeData.ProjectFakeData.Project1.DeepCopy() as ProjectModel;
            project.Project = "Project Updated";
            project.ProjectId = -1;

            // Act

            var result = Controller.UpdateProject(project);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_GetAllProject_Then_AllProjectReceived()
        {
            // Arrange & Act
            var result = Controller.GetProjects();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.ProjectFakeData.AllProjects.Count(), result.Count());
        }

        #endregion

        #region Tasks
        [TestCase]
        public void When_TaskWithInvalidState_Then_ValidationShouldStopFurtherSteps()
        {
            // Arrange & Act
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskDescription = null;
            var context = new ValidationContext(task, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(task, context, valResult, true); ;

            // Assert
            Assert.True(!modelState);

        }

        [TestCase]
        public void When_TaskWithValidState_Then_ValidationShouldNotThrow()
        {
            // Arrange & Act
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            var context = new ValidationContext(task, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(task, context, valResult, true); ;

            // Assert
            Assert.True(modelState);
        }

        [TestCase]
        public void When_Add_AnNewTask_Then_Pass()
        {
            // Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskId = -1;

            // Act
            var result = Controller.AddTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_Add_AnExistingTask_Then_Fail()
        {
            // Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;

            // Act
            var result = Controller.AddTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_AddTaskWithInvalidState_Then_Fail()
        {
            // Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskDescription = null;

            // Act
            Controller.ModelState.AddModelError("TaskDescription", "TaskDescription required");
            var result = Controller.AddTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_AddTaskWithValidState_Then_HttpOk()
        {
            // Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskId = -1;

            // Act
            var result = Controller.AddTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_UpdateExistingTaskWithInvalidState_Then_Fail()
        {
            // Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskDescription = null;

            // Act
            Controller.ModelState.AddModelError("TaskDescription", "TaskDescription required");
            var result = Controller.AddTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_UpdateAnExistingTask_Then_HttpOK()
        {
            //Arrange
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskDescription = "Description Updated";

            // Act

            var result = Controller.UpdateTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var castedResult = result as StatusCodeResult;
            Assert.AreEqual(HttpStatusCode.OK, castedResult.StatusCode);

        }

        [TestCase]
        public void When_UpdateAnNonExistingTask_Then_HttpBad()
        {
            var task = ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1.DeepCopy() as TaskModel;
            task.TaskDescription = "Description Updated";
            task.TaskId = -1;

            // Act

            var result = Controller.UpdateTask(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_GetAllTask_Then_AllTaskReceived()
        {
            // Arrange & Act
            var result = Controller.GeTasks();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.TaskFakeData.AllTasks.Count(), result.Count());
        }

        [TestCase]
        public void When_GetAllParentTask_Then_AllParentTaskReceived()
        {
            // Arrange & Act
            var result = Controller.GetParentTasks();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.TaskFakeData.AllTasks.Where(x => x.IsParentTask).Count(), result.Count());
        }

        [TestCase]
        public void When_GetParentTasksForProject_Then_AllParentTaskRelatedToProjectReceived()
        {
            // Arrange & Act
            var result = Controller.GetParentTasksForProject(ProjectManagerFakeData.ProjectFakeData.Project1);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.TaskFakeData.AllTasks.Where(x => x.IsParentTask && x.ProjectId == ProjectManagerFakeData.ProjectFakeData.Project1.ProjectId).Count(), result.Count());
        }

        [TestCase]
        public void When_GetTaskById_Then_TaskReceived()
        {

            // Arrange & Act
            var result = Controller.GetTaskById(1);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(ProjectManagerFakeData.TaskFakeData.Project1_ParentTask1, result);
        }

        [TestCase]
        public void When_GetAllTaskForProject_Then_AllTaskReceivedForProjectReceived()
        {
            // Arrange & Act
            var result = Controller.GetAllTaskForProject(ProjectManagerFakeData.ProjectFakeData.Project1);

            // Assert
            Assert.IsNotNull(result);

            Assert.AreEqual(ProjectManagerFakeData.TaskFakeData.AllTasks.Where(x => x.ProjectId == ProjectManagerFakeData.ProjectFakeData.Project1.ProjectId).Count(), result.Count());
        }

        #endregion
    }


}
