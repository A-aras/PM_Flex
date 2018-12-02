using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjectManager.Entities;
using ProjectManager.DAL;
using System.Data.Entity;

namespace ProjectManager.BusinessLayer
{
    public class ProjectManagerService : IProjectManagerService
    {

        private IProjectManagerDbContext dbContext;
        public ProjectManagerService(IProjectManagerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public ProjectModel AddProject(ProjectModel project)
        {
            project.ProjectManager = null;

            dbContext.SetEntityState(project, EntityState.Added);

           if (dbContext.SaveChanges() >= 0)
            {
                return project;
            }
            else { return null; }
        }

        public TaskModel AddTask(TaskModel task)
        {
            task.ParentTask = null;
            task.User = null;
            task.Project = null;

            dbContext.Tasks.Add(task);

            if (dbContext.SaveChanges() >= 0)
            {
                return task;
            }
            else { return null; }
        }

        public UserModel AddUser(UserModel user)
        {
            dbContext.Users.Attach(user);
            dbContext.SetEntityState(user, EntityState.Added);

            if (dbContext.SaveChanges() >= 0)
            {
                return user;
            }
            else { return null; }
        }

        public bool DeleteProject(ProjectModel project)
        {
            dbContext.Projects.Remove(project);
            return dbContext.SaveChanges() == 1;
        }

        public bool DeleteTaks(TaskModel task)
        {
            dbContext.Tasks.Remove(task);
            return dbContext.SaveChanges() == 1;
        }

        public bool DeleteUser(UserModel user)
        {
            dbContext.Users.Remove(user);
            return dbContext.SaveChanges() == 1;
        }

        public ICollection<TaskModel> GetAllTaskForProject(ProjectModel project)
        {
            return dbContext.Tasks.Include(x => x.Project).Where(x => x.ProjectId == project.ProjectId).ToList();
        }

        public ICollection<TaskModel> GetParentTasks()
        {
            return dbContext.Tasks.Where(x => x.IsParentTask).ToList();
        }

        public ICollection<TaskModel> GetParentTasksForProject(ProjectModel project)
        {
            return dbContext.Tasks.Where(x => x.ProjectId == project.ProjectId && x.IsParentTask ).ToList();
            //return dbContext.Tasks.Where(x => x.IsParentTask).ToList();
        }

        public ICollection<ProjectModel> GetProjects()
        {
            return dbContext.Projects.Include(x => x.Tasks).Include(x => x.ProjectManager).ToList();
        }

        public ICollection<TaskModel> GetTasks()
        {
            return dbContext.Tasks.ToList();
        }

        public TaskModel GetTaskById(int taskId)
        {

            return dbContext.Tasks.Where(x => x.TaskId == taskId).Include(x => x.Project).Include(x => x.ParentTask).Include(x => x.User).FirstOrDefault();
        }

        public UserModel GetUserById(int userId)
        {
            return dbContext.Users.Include(x => x.Tasks).Include(x => x.Projects).FirstOrDefault(x => x.UserId == userId);
        }

        public ICollection<UserModel> GetUsers()
        {
            return dbContext.Users.ToList();
        }

        public ProjectModel UpdateProject(ProjectModel project)
        {
            
            var proj = dbContext.Projects.Find(project.ProjectId);
            
            if (project.ProjectManager != null)
            {
                dbContext.SetEntityState(project.ProjectManager, EntityState.Detached);
            }
            if (project.Tasks != null)
            {
                foreach (var task in project.Tasks)
                {
                    dbContext.SetEntityState(task, EntityState.Detached);
                }
            }

            dbContext.UpdateCurrentValue(proj, project);

            if (dbContext.SaveChanges() >= 0)
            {
                return GetProjectById(project.ProjectId);
            }
            else { return null; }
        }

        public TaskModel UpdateTaks(TaskModel task)
        {
            var oldTask = dbContext.Tasks.Find(task.TaskId);

            if (task.User != null)
            {
                dbContext.SetEntityState(task.User, EntityState.Detached);
            }
            if (task.ChildTasks != null)
            {
                foreach (var childTask in task.ChildTasks)
                {
                    dbContext.SetEntityState(childTask, EntityState.Detached);
                }
            }
            if (task.ParentTask != null)
            {
                dbContext.SetEntityState(task.ParentTask, EntityState.Detached);
            }

            if (task.User != null)
            {
                dbContext.SetEntityState(task.User, EntityState.Detached);
            }

            dbContext.UpdateCurrentValue(oldTask, task);
            if (dbContext.SaveChanges() >= 0)
            {
                return GetTaskById(task.TaskId);
            }
            return null;

        }

        public UserModel UpdateUser(UserModel user)
        {
            var oldUser = dbContext.Users.Find(user.UserId);

            if (user.Tasks != null)
            {
                foreach (var task in user.Tasks)
                {
                    dbContext.SetEntityState(task, EntityState.Detached);
                }
            }

            if (user.Projects != null)
            {
                foreach (var proj in user.Projects)
                {
                    dbContext.SetEntityState(proj, EntityState.Detached);
                }
            }


            dbContext.UpdateCurrentValue(oldUser, user);
            if (dbContext.SaveChanges() >= 0)
            {
                return GetUserById(user.UserId);
            }
            return null;
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }

        public ProjectModel GetProjectById(int projId)
        {

            return dbContext.Projects.Where(x => x.ProjectId == projId).Include(x => x.ProjectManager).Include(x => x.Tasks).FirstOrDefault();

        }
    }
}
