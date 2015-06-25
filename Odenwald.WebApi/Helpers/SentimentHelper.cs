using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Odenwald.WebApi.Helpers
{
    public static class SentimentHelper
    {
        public static IEnumerable<Odenwald.Model.Twitter.Tweet> CalculateSentiment(IEnumerable<Odenwald.Model.Twitter.Tweet> tweets)
        {
            var sentiment = Sentiment.Instance;
            foreach (var tweet in tweets)
            {
                var score = sentiment.GetScore(tweet.TweetText);
                tweet.Score = new Model.Twitter.Score
                {
                    Negative = score.Negative,
                    Positive = score.Positive,
                    Sentiment = score.Sentiment,
                    Tokens = score.Tokens,
                    Words = score.Words
                };
            }
            return tweets;
        }
    }
}