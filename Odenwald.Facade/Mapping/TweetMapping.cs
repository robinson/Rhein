using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tweetinvi.Core.Interfaces;
using Tweetinvi.Core.Interfaces.Models.Entities;
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
                .ForMember(vm => vm.Location, c => c.MapFrom(m => m.Place.Name))
                .ForMember(vm => vm.Medias, c => c.MapFrom(m=> m.Media));

            Mapper.CreateMap<IMediaEntity, Odenwald.Model.Twitter.TweetMedia>()
                .ForMember(vm => vm.DisplayURL, c => c.MapFrom(m => m.DisplayURL))
                .ForMember(vm => vm.ExpandedURL, c => c.MapFrom(m => m.ExpandedURL))
                .ForMember(vm => vm.Id, c => c.MapFrom(m => m.Id))
                .ForMember(vm => vm.IdStr, c => c.MapFrom(m => m.IdStr))
                .ForMember(vm => vm.Indices, c => c.MapFrom(m => m.Indices))
                .ForMember(vm => vm.MediaType, c => c.MapFrom(m => m.MediaType))
                .ForMember(vm => vm.MediaURL, c => c.MapFrom(m => m.MediaURL))
                .ForMember(vm => vm.MediaURLHttps, c => c.MapFrom(m => m.MediaURLHttps))
                .ForMember(vm => vm.URL, c => c.MapFrom(m => m.URL));
        }

    }
}