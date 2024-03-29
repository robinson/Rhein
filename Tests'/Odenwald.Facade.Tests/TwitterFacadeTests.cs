﻿using System;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
using Xunit;
using Odenwald.Facade.Interfaces;
using Odenwald.Facade;
using System.Threading.Tasks;
using System.Collections.Generic;
using Odenwald.Model.Twitter;

namespace Odenwald.Facade.Tests
{
    public class TwitterFacadeTests
    {
        static string consumerKey = "tkr9B1TdVpsPgrgDoM0XPmdYP";
        static string consumerSecret = "2Rl5ukIAj9prHCBg1CSeCGex1qXSnJYkgOVX1WTEwb2HKaMHgW";
        static string accessTokenKey = "49227431-K8J2y8saXX04UeYtCnbPc1fyY9iKG4kVfjK3odVB0";
        static string accessTokenSecret = "35Ks5f3P4eclgtdNhodyjdLP0UEt0FEkEeL1Yhr42mZnp";

        [Fact]
        public void SearchTweetTestNotNull()
        {
            string inputHashTag = "#Bphone";
            TwitterFacade facade = new TwitterFacade(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret);
            var result = facade.Search(inputHashTag);
            Assert.NotNull(result);
        }
        //[Fact]
        //public async Task TestCalculateSentiment()
        //{

        //    string keyword = "bphone";
        //    ITwitterFacade facade = new TwitterFacade(consumerKey, consumerSecret, accessTokenKey, accessTokenSecret);

        //    var tweets = await facade.Search(keyword);
        //    Assert.NotNull(tweets);
        //    IEnumerable<Model.Twitter.Tweet> results = (IEnumerable<Model.Twitter.Tweet>)tweets;
        //    var stat = facade.CalculateSentiment(results, keyword);
        //    Assert.NotNull(stat);
        //}
    }
}
