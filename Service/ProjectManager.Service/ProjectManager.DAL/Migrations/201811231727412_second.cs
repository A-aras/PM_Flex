namespace ProjectManager.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class second : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Project", "ProjectManagerId", "dbo.User");
            DropForeignKey("dbo.Task", "UserId", "dbo.User");
            DropIndex("dbo.Project", new[] { "ProjectManagerId" });
            DropIndex("dbo.Task", new[] { "UserId" });
            AlterColumn("dbo.Project", "ProjectManagerId", c => c.Int(nullable: false));
            AlterColumn("dbo.Task", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Project", "ProjectManagerId");
            CreateIndex("dbo.Task", "UserId");
            AddForeignKey("dbo.Project", "ProjectManagerId", "dbo.User", "UserId");
            AddForeignKey("dbo.Task", "UserId", "dbo.User", "UserId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "UserId", "dbo.User");
            DropForeignKey("dbo.Project", "ProjectManagerId", "dbo.User");
            DropIndex("dbo.Task", new[] { "UserId" });
            DropIndex("dbo.Project", new[] { "ProjectManagerId" });
            AlterColumn("dbo.Task", "UserId", c => c.Int());
            AlterColumn("dbo.Project", "ProjectManagerId", c => c.Int());
            CreateIndex("dbo.Task", "UserId");
            CreateIndex("dbo.Project", "ProjectManagerId");
            AddForeignKey("dbo.Task", "UserId", "dbo.User", "UserId");
            AddForeignKey("dbo.Project", "ProjectManagerId", "dbo.User", "UserId");
        }
    }
}
