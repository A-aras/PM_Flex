using ProjectManager.Entities;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System;

namespace ProjectManager.DAL
{
    public class ProjectManagerDbContext : DbContext, IProjectManagerDbContext
    {
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

        public ProjectManagerDbContext() : base("name=projectManagerDbSource")
        {
            Tasks = this.Set<TaskModel>();
            Users = this.Set<UserModel>();
            Projects = this.Set<ProjectModel>();
        }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            var taskMap = modelBuilder.Entity<TaskModel>();
            taskMap.HasKey(x => x.TaskId);
            taskMap.Property(x => x.TaskId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity).HasColumnName("Task_Id");
            taskMap.Property(x => x.TaskDescription).HasColumnName("Task");
            taskMap.Property(x => x.StartDate).HasColumnName("StartDate");
            taskMap.Property(x => x.EndDate).HasColumnName("EndDate");
            taskMap.Property(x => x.IsClosed).HasColumnName("IsClosed");
            taskMap.Property(x => x.Priority);
            taskMap.HasOptional(x => x.ParentTask).WithMany(x => x.ChildTasks).HasForeignKey(x => x.ParentTaskId).WillCascadeOnDelete(false);
            taskMap.HasRequired(x => x.Project).WithMany(x => x.Tasks).HasForeignKey(x => x.ProjectId).WillCascadeOnDelete(false);
            taskMap.HasOptional(x => x.User).WithMany(x => x.Tasks).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);

            taskMap.Property(x => x.ParentTaskId).IsOptional();
            taskMap.Property(x => x.ProjectId).IsOptional();
            taskMap.Property(x => x.UserId).IsOptional();

            taskMap.ToTable("Task");


            var projectMap = modelBuilder.Entity<ProjectModel>();
            projectMap.HasKey(x => x.ProjectId);
            projectMap.Property(x => x.ProjectId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity).HasColumnName("ProjectId");
            projectMap.Property(x => x.Project).HasColumnName("Project");
            projectMap.Property(x => x.StartDate).HasColumnName("StartDate").IsOptional();
            projectMap.Property(x => x.EndDate).HasColumnName("EndDate").IsOptional();
            projectMap.Property(x => x.Priority);
            projectMap.Property(x => x.IsActive);
            projectMap.Ignore(x => x.NoOfClosedTasks);

           projectMap.ToTable("Project");
            

            var userMap = modelBuilder.Entity<UserModel>();
            userMap.HasKey(x => x.UserId);
            userMap.Property(x => x.UserId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity).HasColumnName("UserId");
            userMap.Property(x => x.FirstName).HasColumnName("FName");
            userMap.Property(x => x.LastName).HasColumnName("LName");
            userMap.Property(x => x.EmployeeId).HasColumnName("EmpId");
            userMap.HasMany(x => x.Tasks).WithOptional(x => x.User).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            userMap.HasMany(x => x.Projects).WithOptional(x => x.ProjectManager).HasForeignKey(x => x.ProjectManagerId).WillCascadeOnDelete(false);

            userMap.ToTable("User");

            base.OnModelCreating(modelBuilder);
        }

        public void SetEntityState(object value, EntityState state)
        {
            Entry(value).State = state;
        }

        public DbEntityEntry<T> GetEntry<T>(T value)where T: class
        {
            return (this as DbContext).Entry<T>(value);
        }

        public void UpdateCurrentValue<T>(T oldValue, T newValue) where T : class
        {
            var entry = (this as DbContext).Entry<T>(oldValue);
            entry.CurrentValues.SetValues(newValue);
        }
    }
}
