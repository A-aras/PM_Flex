using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProjectManager.Entities
{
    public class TaskModel :IDeepCopy<TaskModel>
    {

        private int taskId;

        public int TaskId
        {
            get { return taskId; }
            set { taskId = value; }
        }

        private TaskModel parentTask;

        
        public TaskModel ParentTask
        {
            get { return parentTask; }
            set { parentTask = value; }
        }

        private ICollection< TaskModel> childTasks;

        public virtual ICollection<TaskModel> ChildTasks
        {
            get { return childTasks; }
            set { childTasks = value; }
        }

        private int? parentTaskId;

        public int? ParentTaskId
        {
            get { return parentTaskId; }
            set { parentTaskId = value; }
        }

        private string taskDescription;

        [Required]
        public string TaskDescription
        {
            get { return taskDescription; }
            set { taskDescription = value; }
        }


        private DateTime? startDate;

        public DateTime? StartDate
        {
            get { return startDate; }
            set { startDate = value; }
        }

        private DateTime? endDate;
        
        
        public DateTime? EndDate
        {
            get { return endDate; }
            set { endDate = value; }
        }

        private int priority;

        [Range(0,30)]
        public int Priority
        {
            get { return priority; }
            set { priority = value; }
        }

        private bool isClosed;

        public bool IsClosed
        {
            get { return isClosed; }
            set { isClosed = value; }
        }

        private bool isParentTask;

        public bool IsParentTask
        {
            get { return isParentTask; }
            set { isParentTask = value; }
        }

        
        private int? projectId;
        public int? ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }


        private ProjectModel project;

        public ProjectModel Project
        {
            get { return project; }
            set { project = value; }
        }

        private int? userId;

        public int? UserId
        {
            get { return userId; }
            set { userId = value; }
        }


        private UserModel user;

        public UserModel User
        {
            get { return user; }
            set { user = value; }
        }

        public TaskModel DeepCopy()
        {
            return (TaskModel)this.MemberwiseClone();
        }
    }
}
