using System.Collections.Generic;
using ProjectManager.Entities;
using System;

namespace ProjectManager.BusinessLayer
{
    public interface IProjectManagerService:IDisposable
    {
        #region User 
        ICollection<UserModel> GetUsers();

        UserModel GetUserById(int userId);

        UserModel AddUser(UserModel user);

        UserModel UpdateUser(UserModel user);

        bool DeleteUser(UserModel user);

        #endregion

        #region Project

        ICollection<ProjectModel> GetProjects();

        ProjectModel GetProjectById(int projId);

        ProjectModel AddProject(ProjectModel project);

        ProjectModel UpdateProject(ProjectModel project);

        bool DeleteProject(ProjectModel project);

        #endregion

        #region ParentTask
        ICollection<TaskModel> GetParentTasks();

        ICollection<TaskModel> GetParentTasksForProject(ProjectModel parentTask);

        //ParentTaskModel AddParentTask(ParentTaskModel parentTask);
        #endregion

        #region Task
        ICollection<TaskModel> GetTasks();

        TaskModel GetTaskById(int taskId);

        ICollection<TaskModel> GetAllTaskForProject(ProjectModel parentTask);
        TaskModel UpdateTaks(TaskModel task);
        TaskModel AddTask(TaskModel task);
        bool DeleteTaks(TaskModel task);

        #endregion
    }
}
