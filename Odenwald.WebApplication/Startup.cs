using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Extensions;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
[assembly: OwinStartup(typeof(Odenwald.WebApplication.Startup))]

namespace Odenwald.WebApplication
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
          
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            // Make ./public the default root of the static files in our Web Application.
            app.UseFileServer(new FileServerOptions
            {
                RequestPath = new PathString(string.Empty),
                FileSystem = new PhysicalFileSystem("."),
                EnableDirectoryBrowsing = true,
            });

            app.UseStageMarker(PipelineStage.MapHandler);
        }
    }
}
