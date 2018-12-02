using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace ProjectManager.Entities
{
    public class ProjectModel:IDeepCopy<ProjectModel>
    {

        private int projectId;

        public int ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }

        private UserModel projectManager;

        public UserModel ProjectManager
        {
            get { return projectManager; }
            set { projectManager = value; }
        }

        private int? projectManagerId;

        public int? ProjectManagerId
        {
            get { return projectManagerId; }
            set { projectManagerId = value; }
        }

        private string project;

        [Required]
        public string Project
        {
            get { return project; }
            set { project = value; }
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

        [Range(1, 30)]
        public int Priority
        {
            get { return priority; }
            set { priority = value; }
        }

        public int NoOfClosedTasks { get
            {
                //return 0;
                return Tasks==null?0:Tasks.Where(x => x.IsClosed).Count();
            } }

        private ICollection<TaskModel> tasks;

        public virtual ICollection<TaskModel> Tasks
        {
            get { return tasks; }
            set { tasks = value; }
        }

        private bool isActive;

        [Required]
        public bool IsActive
        {
            get { return isActive; }
            set { isActive = value; }
        }

        public ProjectModel DeepCopy()
        {
            return (ProjectModel)this.MemberwiseClone();
        }
    }
}
