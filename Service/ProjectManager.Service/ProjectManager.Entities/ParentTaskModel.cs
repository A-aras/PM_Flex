using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Entities
{
    //[Serializable]
    public class ParentTaskModel
    {

        private int parentTaskId;

        public int ParentTaskId
        {
            get { return parentTaskId; }
            set { parentTaskId = value; }
        }

        private string parent_Task;

        public string Parent_Task
        {
            get { return parent_Task; }
            set { parent_Task = value; }
        }

        private ICollection<TaskModel> tasks;

        public ICollection<TaskModel> Tasks
        {
            get { return tasks; }
            set { tasks = value; }
        }
    }
}
