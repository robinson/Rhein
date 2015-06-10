using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tweetinvi.Core.Interfaces;
namespace Odenwald.Facade.Mapping
{
    public class TweetMapping
    {
        public static void CreateMap()
        {
            Mapper.CreateMap<ITweet, Odenwald.Model.Twitter.Tweet>()
                .ForMember(vm => vm.TweetText, c => c.MapFrom(m => m.Text))
                .ForMember(vm => vm.User, c => c.MapFrom(m => m.Creator.ScreenName))
                .ForMember(vm => vm.ImageUrl, c => c.MapFrom(m => m.Creator.ProfileImageUrlHttps))
                .ForMember(vm => vm.CreatedAt, c => c.MapFrom(m => m.CreatedAt))
                .ForMember(vm => vm.Longitude, c => c.MapFrom(m => m.Coordinates.Longitude.ToString()))
                .ForMember(vm => vm.Latitude, c => c.MapFrom(m => m.Coordinates.Latitude.ToString()))
                .ForMember(vm => vm.Location, c => c.MapFrom(m => m.Place.Name));
        }
    }
}