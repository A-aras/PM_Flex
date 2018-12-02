namespace ProjectManager.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Project",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        ProjectManagerId = c.Int(),
                        Project = c.String(nullable: false),
                        StartDate = c.DateTime(),
                        EndDate = c.DateTime(),
                        Priority = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId)
                .ForeignKey("dbo.User", t => t.ProjectManagerId)
                .Index(t => t.ProjectManagerId);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        FName = c.String(nullable: false),
                        LName = c.String(nullable: false),
                        EmpId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
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
                        IsParentTask = c.Boolean(nullable: false),
                        ProjectId = c.Int(),
                        UserId = c.Int(),
                    })
                .PrimaryKey(t => t.Task_Id)
                .ForeignKey("dbo.Task", t => t.ParentTaskId)
                .ForeignKey("dbo.Project", t => t.ProjectId)
                .ForeignKey("dbo.User", t => t.UserId)
                .Index(t => t.ParentTaskId)
                .Index(t => t.ProjectId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "UserId", "dbo.User");
            DropForeignKey("dbo.Task", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.Task", "ParentTaskId", "dbo.Task");
            DropForeignKey("dbo.Project", "ProjectManagerId", "dbo.User");
            DropIndex("dbo.Task", new[] { "UserId" });
            DropIndex("dbo.Task", new[] { "ProjectId" });
            DropIndex("dbo.Task", new[] { "ParentTaskId" });
            DropIndex("dbo.Project", new[] { "ProjectManagerId" });
            DropTable("dbo.Task");
            DropTable("dbo.User");
            DropTable("dbo.Project");
        }
    }
}
