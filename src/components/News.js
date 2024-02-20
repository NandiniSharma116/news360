import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  constructor(props) {
    super(props);
    console.log("This is a News Constructor.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
    };
    document.title = this.props.category==="general"?"News360 - Updated News Daily!":"News360 - "+this.props.category.toUpperCase();
  }

  async updateNews()
  {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ab7b512263b4d4c9b090452faf82ce7&page=${this.state.page}&pageSize=9`;
    try {
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
      this.setState({ articles: parsedData.articles, loading: false, totalArticles: parsedData.totalResults });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

   fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ab7b512263b4d4c9b090452faf82ce7&page=${this.state.page}&pageSize=9`;
    try {
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
      this.setState({ articles: this.state.articles.concat(parsedData.articles), loading: false, totalArticles: parsedData.totalResults });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //  handlePrevClick = async () => {
  //   // console.log(this.state.page)
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ab7b512263b4d4c9b090452faf82ce7&page=${this.state.page - 1}&pageSize=9`;
  //   // try {
  //   //   this.setState({
  //   //     loading: true
  //   //   })
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   this.setState({ articles: parsedData.articles, loading: false });
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   // }
  //   // this.setState({
  //   //   page: this.state.page - 1
  //   // })
  //   this.setState({
  //       page: this.state.page - 1
  //     })
  //     this.updateNews()
  // };

  //  handleNextClick = async () => {
  //   // console.log("Next");
  //   // if (this.state.page+1 >= 10){
  //   // }
  //   // else
  //   // {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ab7b512263b4d4c9b090452faf82ce7&page=${this.state.page + 1}&pageSize=9`;
  //   // try {
  //   //   this.setState({
  //   //     loading: true
  //   //   })
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData.articles);
  //   //   this.setState({ articles: parsedData.articles, loading: false });
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   // }
  //   // this.setState({
  //   //   page: this.state.page + 1
  //   // })
  //   // }
  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updateNews();
  // };

  render() {
    console.log("This is before rendering");
  let displayMessage;
  if (this.state.articles.length === 0) {
    displayMessage = <h1>There are no items to display.</h1>;
  } else {
    displayMessage = this.state.articles.map((element) => (
      <NewsItem source={element.source.name} date={element.publishedAt.slice(0, 10)} author={element.author} key={element.url} url={element.url} imgUrl={element.urlToImage} description={element.title.slice(0, 100)} />
    ));
  }
  
    return (
      <div>
        <center>
          <h1 className='mt-10 text-5xl font-bold text-gray-700'>News360 - Top  Headlines</h1>
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== parseInt(this.state.totalArticles)}
          loader={<Spinner/>}
        >
          <div className="mt-10 container w-[1000px] grid grid-cols-3 gap-4">
            {displayMessage}
          </div>
          </InfiniteScroll>
          {/* <div className='mt-8 mb-30'>
            <button disabled={this.state.page <= 1 ? true : false} onClick={this.handlePrevClick} className='text-2xl border-2 p-5 rounded-l-xl hover:bg-slate-100'> &larr; </button>
            <button onClick={this.handleNextClick} className='text-2xl border-2 p-5 rounded-r-xl hover:bg-slate-100'> &rarr; </button>
          </div> */}
        </center>
      </div>
    );
  }
  
  }


export default News;
