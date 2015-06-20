using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odenwald.Model;

namespace Odenwald.Facade.Interfaces
{
    public interface ITwitterFacade
    {
        //string ConsumerKey{set;}
        //string ConsumerSecret{set;}
        //string AccessTokenKey{set;}
        //string AccessTokenSecret{set;}
        Task<IEnumerable<Odenwald.Model.Twitter.Tweet>> Search(string hashTag);
    }
}
