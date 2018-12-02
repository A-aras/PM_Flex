using ProjectManager.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManager.DAL
{
    public interface IProjectManagerDbContext : IDisposable
    {
        IDbSet<TaskModel> Tasks { get; set; }

        IDbSet<UserModel> Users { get; set; }

        IDbSet<ProjectModel> Projects { get; set; }

        int SaveChanges();

        void SetEntityState(object value, EntityState state);

        //DbEntityEntry<T> GetEntry<T>(T value) where T : class;

        void UpdateCurrentValue<T>(T oldValue, T newValue) where T : class;
    }
}
