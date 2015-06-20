using AutoMapper;
using Odenwald.Facade.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Core.Interfaces;
using Tweetinvi.Core.Interfaces.Models.Parameters;

namespace Odenwald.Facade
{
    public class TwitterFacade : ITwitterFacade
    {
        //public string ConsumerKey { set; }
        //public string ConsumerSecret {set; }
        //public string AccessTokenKey {set; }
        //public string AccessTokenSecret { set; }

        public TwitterFacade(string consumerKey, string consumerSecret, string accessTokenKey, string accessTokenSecret)
        {
            TwitterCredentials.SetCredentials(accessTokenKey, accessTokenSecret, consumerKey, consumerSecret);
            Mapping.TweetMapping.CreateMap();
        }

        //public IEnumerable<Odenwald.Model.Twitter.Tweet> Search(string hashTag)
        //{
        //    var searchParameter = Tweetinvi.Search.CreateTweetSearchParameter(hashTag);
        //    searchParameter.TweetSearchType = TweetSearchType.All;//TODO: consider to search retweet
        //    searchParameter.MaximumNumberOfResults = 100;
        //    try
        //    {
        //        var tweets = Tweetinvi.Search.SearchTweets(searchParameter);
        //        var result = Mapper.Map<IEnumerable<ITweet>, IEnumerable<Model.Twitter.Tweet>>(tweets);
        //        return result;
        //    }
        //    catch (Exception ex)//TODO: thow exception handling
        //    {
        //        throw ex;
        //    }
        //}
        public async Task<IEnumerable<Odenwald.Model.Twitter.Tweet>> Search(string hashTag) 
        {
            var searchParameter = Tweetinvi.Search.CreateTweetSearchParameter(hashTag);
            searchParameter.TweetSearchType = TweetSearchType.All;//TODO: consider to search retweet
            searchParameter.MaximumNumberOfResults = 30;//TODO: get 30 items 
            try
            {
                var tweets = await Tweetinvi.SearchAsync.SearchTweets(searchParameter);
                var result = Mapper.Map<IEnumerable<ITweet>, IEnumerable<Model.Twitter.Tweet>>(tweets);
                return result;
            }
            catch (Exception ex)//TODO: thow exception handling
            {
                throw ex;
            }
        }
    }
}
