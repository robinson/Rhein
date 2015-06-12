using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Facebook;
using System.Data.Entity;

[assembly: OwinStartup(typeof(Odenwald.WebApi.Startup))]

namespace Odenwald.WebApi
{
    public partial class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }
        public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
          
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AuthContext, Odenwald.WebApi.Migrations.Configuration>());

        }
    }
}
