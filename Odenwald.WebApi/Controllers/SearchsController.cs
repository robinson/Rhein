using Odenwald.Facade;
using Odenwald.Facade.Interfaces;
using Odenwald.Model.Twitter;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Odenwald.WebApi.Controllers
{
    public class SearchsController : ApiControllerBase
    {
        private static string _consumerKey = ConfigurationManager.AppSettings.Get("consumer_key");
        private static string _consumerSecret = ConfigurationManager.AppSettings.Get("consumer_secret");
        private static string _accessKey = ConfigurationManager.AppSettings.Get("access_token_key");
        private static string _accessToken = ConfigurationManager.AppSettings.Get("access_token_secret");
        // GET: api/searchs/searchhashtag?q=

        [ActionName("searchhashtag")]
        [System.Web.Http.HttpGet]
        //public IEnumerable<Tweet> SearchHashtag(string q)
        //{
        //    ITwitterFacade facade = new TwitterFacade(_consumerKey, _consumerSecret, _accessKey, _accessToken);
        //    try
        //    {
        //        var result = facade.Search(q);
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //}
        public async Task<IEnumerable<Odenwald.Model.Twitter.Tweet>> SearchHashtag(string q)
        {
            ITwitterFacade facade = new TwitterFacade(_consumerKey, _consumerSecret, _accessKey, _accessToken);
            try
            {
                var result = await facade.Search(q);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}