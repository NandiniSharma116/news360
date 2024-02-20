import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { description, imgUrl, url, date, author, source} = this.props;
    return (
      <a
        href={url}
        className="block relative h-80 w-80 border-2 rounded-2xl bg-gray-300 border-gray-700 overflow-hidden transform transition-transform hover:scale-105 cursor-pointer relative"
      >
        <span className="absolute top-0 left-0 z-10 bg-gray-900 text-white rounded-lg text-[0.75rem] p-2">
          <strong>{source}</strong>
        </span>

        <img
          className="rounded-t-2xl w-full h-40 object-cover"
          src={imgUrl ? imgUrl : "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_640.jpg"}
          alt=""
        />
        <div className="text-center">
          <b className="block p-4 text-gray-700">{description}</b>
          <p className="text-sm text-gray-500">Published at: {date}</p>
          <p className="text-sm text-gray-500">{author === null ? "" : `Author: ${author}`}</p>
        </div>
      </a>
    );
  }
}

export default NewsItem;
