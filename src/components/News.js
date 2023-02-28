import React, { Component } from 'react'
import NewsItems from './NewsItems'
import spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps =  {
      country: 'in',
      pageSize: 8,
      category: 'general',

    }
 
    static propTypes =  {
      country:  PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

  constructor(){
    super();
    console.log('Hello, I am constructor from new component');
    this.state={
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5c122e25230485d9bb1db5519d0ba2c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    
  }
  handlePrevClick = async ()=> {
    console.log("Previous");

    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5c122e25230485d9bb1db5519d0ba2c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  handleNextClick = async()=> {
    console.log("Next");
    if( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

    }
    else  {
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5c122e25230485d9bb1db5519d0ba2c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parsedData = await data.json() 
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  }

  render() {
    console.log("render");
    return (
      <div className='container my-3 mx-3'>
        <h1 className='text-center' style={{margin: '35px 0px' , marginTop: '90px'}}>NewsMonkey Top Headlines </h1>
        {this.state.loading && <spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=> {
            return <div className="col-md-3" key={element.url}>
                <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
        })}
          
        </div>
      <div className='container d-flex justify-content-between'> 
      <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </div>
    )
  }
}

export default News
