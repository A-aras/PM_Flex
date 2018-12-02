namespace ProjectManager.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ParentTask",
                c => new
                    {
                        Parent_Id = c.Int(nullable: false, identity: true),
                        Parent_Task = c.String(),
                    })
                .PrimaryKey(t => t.Parent_Id);
            
            CreateTable(
                "dbo.Task",
                c => new
                    {
                        Task_Id = c.Int(nullable: false, identity: true),
                        ParentTaskId = c.Int(),
                        Task = c.String(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        Priority = c.Int(nullable: false),
                        IsClosed = c.Boolean(nullable: false),
                        ProjectId = c.Int(),
                    })
                .PrimaryKey(t => t.Task_Id)
                .ForeignKey("dbo.ParentTask", t => t.ParentTaskId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .Index(t => t.ParentTaskId)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Project",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        ProjectManagerId = c.Int(),
                        Project = c.String(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        FName = c.String(nullable: false),
                        LName = c.String(nullable: false),
                        EmpId = c.Int(nullable: false),
                        Task_TaskId = c.Int(),
                        ProjectId = c.Int(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Task", t => t.Task_TaskId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .Index(t => t.Task_TaskId)
                .Index(t => t.ProjectId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.User", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.User", "Task_TaskId", "dbo.Task");
            DropForeignKey("dbo.Task", "ParentTaskId", "dbo.ParentTask");
            DropIndex("dbo.Task", new[] { "ProjectId" });
            DropIndex("dbo.User", new[] { "ProjectId" });
            DropIndex("dbo.User", new[] { "Task_TaskId" });
            DropIndex("dbo.Task", new[] { "ParentTaskId" });
            DropTable("dbo.User");
            DropTable("dbo.Project");
            DropTable("dbo.Task");
            DropTable("dbo.ParentTask");
        }
    }
}
