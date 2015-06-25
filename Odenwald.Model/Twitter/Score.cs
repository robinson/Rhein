using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odenwald.Model.Twitter
{
    public class Score
    {
        /// <summary>
        /// Tokens which were scored
        /// </summary>
        public IEnumerable<string> Tokens { get; set; }
        /// <summary>
        /// Total sentiment score of the tokens
        /// </summary>
        public int Sentiment { get; set; }
        /// <summary>
        /// Average sentiment score Sentiment/Tokens.Count
        /// </summary>
        public double AverageSentimentTokens { get { return (double)Sentiment / Tokens.Count(); } }
        /// <summary>
        /// Average sentiment score Sentiment/Words.Count
        /// </summary>
        public double AverageSentimentWords { get { return (double)Sentiment / Words.Count(); } }
        /// <summary>
        /// Words that were used from AFINN
        /// </summary>
        public IList<string> Words { get; set; }
        /// <summary>
        /// Words that had negative sentiment
        /// </summary>
        public IList<string> Negative { get; set; }
        /// <summary>
        /// Words that had positive sentiment
        /// </summary>
        public IList<string> Positive { get; set; }

        //public Score()
        //{
        //    Words = new List<string>();
        //    Negative = new List<string>();
        //    Positive = new List<string>();
        //}
    }
}
