using Odenwald.Model.Twitter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odenwald.Facade.Helpers
{
    public static class SentimentHelper
    {
        public static Statistic CalculateSentiment(IEnumerable<Model.Twitter.Tweet> tweets, string hashTag)
        {
            try
            {
                var sentiment = Sentiment.Instance;
                var stat = new Statistic();
                stat.Keyword = hashTag;
                foreach (var tweet in tweets)
                {
                    var score = sentiment.GetScore(tweet.TweetText);
                    if (score.Sentiment == 0)
                    {
                        stat.NeutralMessage += 1;
                    }
                    else if (score.Sentiment < 0)
                    {
                        stat.NegativePoint = score.Sentiment;
                        stat.NegativeMessage += 1;
                    }
                    else
                    {
                        stat.PositivePoint = score.Sentiment;
                        stat.PossitiveMessage += 1;
                    }
                }
                return stat;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
