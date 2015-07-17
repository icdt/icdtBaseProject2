namespace icdtBaseProject2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateIcdtDataModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.icdtdatas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Phone = c.String(),
                        Address = c.String(),
                        Email = c.String(),
                        StartDate = c.DateTime(),
                        EndDate = c.DateTime(),
                        StartTime = c.String(),
                        EndTime = c.String(),
                        IsChecked = c.Boolean(),
                        Radio = c.String(),
                        Number = c.Double(),
                        Select = c.String(),
                        AutoComplete = c.String(),
                        Checklist = c.String(),
                        Photo = c.String(),
                        CKeditorContent = c.String(),
                        IsDeleted = c.Boolean(),
                        GID = c.Guid(defaultValueSql:"newid()"),
                        CreateOn = c.DateTime(defaultValueSql:"getdate()"),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.icdtdatas");
        }
    }
}
