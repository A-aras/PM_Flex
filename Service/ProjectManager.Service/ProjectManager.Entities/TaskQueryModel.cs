using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectManager.Entities
{
    [Serializable]
    public class TaskQueryModel
    {
        public string TaskName { get; set; }
        public int? PriorityFrom { get; set; }
        public int? PriorityTo { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string ParentTask { get; set; }
    }
}