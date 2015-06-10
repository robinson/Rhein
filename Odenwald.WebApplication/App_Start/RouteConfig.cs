using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Odenwald.WebApplication
{
    public class RouteConfig
    {

        public static string ControllerAction = "ApiControllerAction";
        public static string ControllerOnly = "ApiControllerOnly";
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // This controller-per-type route is ideal for GetAll calls.
            // It finds the method on the controller using WebAPI conventions
            // The template has no parameters.
            //
            // ex: api/sessionbriefs
            // ex: api/sessions
            // ex: api/persons
            routes.MapHttpRoute(
                name: ControllerOnly,
                routeTemplate: "api/{controller}"
            );

            // This RPC style route is great for lookups and custom calls
            // It matches the {action} to a method on the controller 
            //
            // ex: api/lookups/all
            // ex: api/lookups/rooms
            routes.MapHttpRoute(
            name: ControllerAction,
            routeTemplate: "api/{controller}/{action}"
        );
        }
    }
}
