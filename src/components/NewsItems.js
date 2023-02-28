import React, { Component } from 'react'


export class NewsItems extends Component {



  render() {
    let {title, description, imageUrl, newsUrl } = this.props;
    return (
        <div className='my-3'>
          <div className="card">
             <img src={!imageUrl?"https://s.yimg.com/os/creatr-uploaded-images/2022-09/e3980db0-38c1-11ed-97d7-a9a22cf4ed7a":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
    )
  }
}

export default NewsItems
