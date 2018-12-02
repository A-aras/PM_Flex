using ProjectManager.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManager.Entities;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using NSubstitute;

namespace ProjectManager.QualityTools
{
    public class ProjectManagerDbContextFake : IProjectManagerDbContext,IDisposable
    {
        public bool ThrowErrorOnNextMethod { get; set; }

        private IDbSet<TaskModel> tasks;

        public IDbSet<TaskModel> Tasks
        {
            get { return tasks; }
            set { tasks = value; }
        }

        private IDbSet<UserModel> users;

        public IDbSet<UserModel> Users
        {
            get { return users; }
            set { users = value; }
        }

        private IDbSet<ProjectModel> projects;

        public IDbSet<ProjectModel> Projects
        {
            get { return projects; }
            set { projects = value; }
        }

        public ProjectManagerDbContextFake()
        {

            IDbSet<TaskModel> task = NSubstitute.Substitute.For<IDbSet<TaskModel>, IQueryable<TaskModel>>();
            //tasks.Provider = TasksData.AllTaks.Provider;
            task.Provider.Returns(ProjectManagerFakeData.TaskFakeData.AllTasks.Provider);
            task.Expression.Returns(ProjectManagerFakeData.TaskFakeData.AllTasks.Expression);
            task.ElementType.Returns(ProjectManagerFakeData.TaskFakeData.AllTasks.ElementType);
            task.GetEnumerator().Returns(ProjectManagerFakeData.TaskFakeData.AllTasks.GetEnumerator());
            this.Tasks = task;


            IDbSet<UserModel> users = NSubstitute.Substitute.For<IDbSet<UserModel>>();
            users.Provider.Returns(ProjectManagerFakeData.UserFakeData.AllUsers.Provider);
            users.Expression.Returns(ProjectManagerFakeData.UserFakeData.AllUsers.Expression);
            users.ElementType.Returns(ProjectManagerFakeData.UserFakeData.AllUsers.ElementType);
            users.GetEnumerator().Returns(ProjectManagerFakeData.UserFakeData.AllUsers.GetEnumerator());
            this.Users = users;

            IDbSet<ProjectModel> projects = NSubstitute.Substitute.For<IDbSet<ProjectModel>>();
            projects.Provider.Returns(ProjectManagerFakeData.ProjectFakeData.AllProjects.Provider);
            projects.Expression.Returns(ProjectManagerFakeData.ProjectFakeData.AllProjects.Expression);
            projects.ElementType.Returns(ProjectManagerFakeData.ProjectFakeData.AllProjects.ElementType);
            projects.GetEnumerator().Returns(ProjectManagerFakeData.ProjectFakeData.AllProjects.GetEnumerator());
            this.Projects = projects;


        }

        public int SaveChanges()
        {
            if (ThrowErrorOnNextMethod)
                throw new Exception("Error");
            return 1;
        }

        public void SetEntityState(object value, System.Data.Entity.EntityState state)
        {
            return;
        }

        public void Dispose()
        {
            Tasks = null;
            Users = null;
            Projects= null;
            return;
        }

        public void UpdateCurrentValue<T>(T oldValue, T newValue) where T : class
        {
            return;
        }
    }
}
