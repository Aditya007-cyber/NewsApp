import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }


    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ab0d908e22be4954b47f9411bc01adf5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
    })
    }

    handlePrevClick = async () => {
    this.setState({page: this.state - 1});
    this.updateNews();

    }

    handleNextClick = async () => {
        this.setState({page: this.state + 1});
        this.updateNews();
    }

    fetchMoreData = async () => {
       this.setState({page: this.state.page + 1})
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ab0d908e22be4954b47f9411bc01adf5&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults
        })
    }

    render() {
        return (
            <>
                <h1 className="text-center my-4 pt-4 m-5 pb-5 bg-info">The Vibrant - Top headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key = {element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl = {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                            </div> 
                            })} 
                        </div>

                    </div>
                </InfiniteScroll>
            </>
                
            
        )
    }
}

export default News
