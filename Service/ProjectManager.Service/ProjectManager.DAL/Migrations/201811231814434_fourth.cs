namespace ProjectManager.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fourth : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Task", "StartDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Task", "StartDate", c => c.DateTime(nullable: false));
        }
    }
}
