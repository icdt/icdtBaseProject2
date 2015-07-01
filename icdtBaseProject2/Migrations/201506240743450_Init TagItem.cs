namespace icdtBaseProject2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitTagItem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TagItems",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Level = c.Int(nullable: false),
                        Parent_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TagItems", t => t.Parent_ID)
                .Index(t => t.Parent_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TagItems", "Parent_ID", "dbo.TagItems");
            DropIndex("dbo.TagItems", new[] { "Parent_ID" });
            DropTable("dbo.TagItems");
        }
    }
}
