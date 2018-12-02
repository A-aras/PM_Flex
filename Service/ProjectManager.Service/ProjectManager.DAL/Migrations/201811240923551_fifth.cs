namespace ProjectManager.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fifth : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Task", "ProjectId", "dbo.Project");
            DropIndex("dbo.Task", new[] { "ProjectId" });
            AlterColumn("dbo.Task", "ProjectId", c => c.Int(nullable: false));
            CreateIndex("dbo.Task", "ProjectId");
            AddForeignKey("dbo.Task", "ProjectId", "dbo.Project", "ProjectId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "ProjectId", "dbo.Project");
            DropIndex("dbo.Task", new[] { "ProjectId" });
            AlterColumn("dbo.Task", "ProjectId", c => c.Int());
            CreateIndex("dbo.Task", "ProjectId");
            AddForeignKey("dbo.Task", "ProjectId", "dbo.Project", "ProjectId");
        }
    }
}
