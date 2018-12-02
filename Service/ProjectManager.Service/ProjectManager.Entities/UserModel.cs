using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Entities
{
    public class UserModel: IDeepCopy<UserModel>
    {

        private int userId;

        public int UserId
        {
            get { return userId; }
            set { userId = value; }
        }

        private string firstName;

        [Required]
        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }

        private string lastName;

        [Required]
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        private int employeeId;

        [Required]
        public int EmployeeId
        {
            get { return employeeId; }
            set { employeeId = value; }
        }

        private ICollection<ProjectModel> projects;

        public ICollection<ProjectModel> Projects
        {
            get { return projects; }
            set { projects = value; }
        }


        private ICollection<TaskModel> tasks;

        public ICollection<TaskModel> Tasks
        {
            get { return tasks; }
            set { tasks = value; }
        }

        public UserModel DeepCopy()
        {
            return (UserModel)this.MemberwiseClone();
        }
    }
}
