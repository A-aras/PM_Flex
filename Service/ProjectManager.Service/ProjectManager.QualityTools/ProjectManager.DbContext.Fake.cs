using System;
using System.Collections.Generic;
using System.Linq;
using ProjectManager.Entities;

namespace ProjectManager.QualityTools
{
    public static class ProjectManagerFakeData
    {

        public static class UserFakeData
        {
            public static UserModel User1 = new UserModel()
            {
                UserId = 1,
                FirstName = "FName1",
                LastName = "LName1",
                EmployeeId = 1,
                Tasks = new List<TaskModel>() { TaskFakeData.Project1_ParentTask1_ChildTask1 }
                //StartDate = new DateTime(2018, 09, 05),
                //EndDate = new DateTime(2018, 09, 05),
                //Priority = 1,
                //ParentTask = ParentTasksData.ParentTask1
            };
            public static UserModel User2 = new UserModel()
            {
                UserId = 2,
                FirstName = "FName2",
                LastName = "LName2",
                EmployeeId = 2,
                Tasks = new List<TaskModel>() { TaskFakeData.Project1_ParentTask1_ChildTask2 }
            };

            public static IQueryable<UserModel> AllUsers = new List<UserModel>() { User1, User2 }.AsQueryable();

        }

        public static class ProjectFakeData
        {

            public static ProjectModel Project1 = new ProjectModel()
            {
                ProjectId = 1,
                Project = "Project1",
                StartDate = new DateTime(2018, 09, 1),
                EndDate = new DateTime(2018, 09, 30),
                IsActive = true,
                Priority = 10,
                ProjectManager = UserFakeData.User1,
                ProjectManagerId = UserFakeData.User1.UserId,
                Tasks = new List<TaskModel>() {
                TaskFakeData.Project1_ParentTask1, TaskFakeData.Project1_ParentTask1_ChildTask1, TaskFakeData.Project1_ParentTask1_ChildTask2
            },
			

            };


            public static ProjectModel Project2 = new ProjectModel()
            {
                ProjectId = 2,
                Project = "Project2",
                StartDate = new DateTime(2018, 10, 1),
                EndDate = new DateTime(2018, 10, 31),
                IsActive = true,
                Priority = 20,
                ProjectManager = UserFakeData.User2,
                ProjectManagerId = UserFakeData.User2.UserId,

            };

            public static IQueryable<ProjectModel> AllProjects = new List<ProjectModel>() { Project1, Project2 }.AsQueryable();



        }

        public static class TaskFakeData
        {

            public static TaskModel Project1_ParentTask1 = new TaskModel()
            {
                TaskId = 1,
                TaskDescription = "ParentTask1",
                IsParentTask = true,
                IsClosed = false,
                User = null,
                UserId = null,
                ParentTask = null,
                ParentTaskId = null,
                ProjectId = ProjectFakeData.Project1.ProjectId,
                ChildTasks = new List<TaskModel>() { Project1_ParentTask1_ChildTask1, Project1_ParentTask1_ChildTask2 }
            };

            public static TaskModel Project1_ParentTask1_ChildTask1 = new TaskModel()
            {
                TaskId = 2,
                TaskDescription = "ParentTask1_ChildTask1",
                IsParentTask = false,
                IsClosed = false,
                User = UserFakeData.User1,
                UserId = UserFakeData.User1.UserId,
                ParentTask = Project1_ParentTask1,
                ParentTaskId = Project1_ParentTask1.ParentTaskId,
                ProjectId = ProjectFakeData.Project1.ProjectId,
                ChildTasks = null,
                StartDate = new DateTime(2018, 09, 1),
                EndDate = new DateTime(2018, 09, 15),
                Priority = 10,
                Project = ProjectFakeData.Project1
            };

            public static TaskModel Project1_ParentTask1_ChildTask2 = new TaskModel()
            {
                TaskId = 3,
                TaskDescription = "ParentTask1_ChildTask2",
                IsParentTask = false,
                IsClosed = false,
                User = UserFakeData.User2,
                UserId = UserFakeData.User2.UserId,
                ParentTask = Project1_ParentTask1,
                ParentTaskId = Project1_ParentTask1.ParentTaskId,
                ProjectId = ProjectFakeData.Project1.ProjectId,
                ChildTasks = null,
                StartDate = new DateTime(2018, 09, 15),
                EndDate = new DateTime(2018, 09, 30),
                Priority = 20,
                Project = ProjectFakeData.Project1
            };



            public static IQueryable<TaskModel> AllTasks = new List<TaskModel>() {
                Project1_ParentTask1, Project1_ParentTask1_ChildTask1, Project1_ParentTask1_ChildTask2
            }.AsQueryable();



        }



    }
}
