using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(icdtBaseProject2.Startup))]

namespace icdtBaseProject2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            ConfigureAuth(app);

            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            app.UseWebApi(config);

            app.Map("/signalr", map =>
            {
                map.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
                map.RunSignalR(new HubConfiguration()
                {
                    EnableDetailedErrors = true,
                    EnableJavaScriptProxies = true
                });
            });
        }
    }
}
