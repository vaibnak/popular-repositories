import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*
function Namelist(props){

  console.log("Namelist called")
  console.log(props.name)
  return(
    
  <ul>
    
    {
  props.repos.map((element, i) =>(
    
  <span key = {i}>
  <li key = {element.name}>{element.name}</li>
  
  </span>
  
  
  )
  )
    }
    
    </ul>
    
)

  }
*/

  

function fetchPopularRepos(language) {
  // "language" can be "javascript", "ruby", "python", or "all"
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    });
}
function Display(props){
  return(
<nav>
<ul>
    {
  props.element.map((lng) => (
  
  <li key = {lng} onClick = {() => {props.handleclick(lng)}}>{lng}</li>
  
  ))
  }
  </ul>
  </nav>
  )
  }

  function RepoGrid(props){
return(
<ul style={{display: 'flex', flexWrap: 'wrap'}}>
{props.repos.map(({ name, owner, stargazers_count, html_url })=>(

<li key = {name} style={{margin: 30}}>
<ul>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>

              </li>







))
}
</ul>
)


  }
  class Loading extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: 'Loading'
      };
    }
    componentDidMount() {
      const stopper = this.state.text + '...';
      this.interval = window.setInterval(() => {
        this.state.text === stopper
          ? this.setState(() => ({ text: 'Loading' }))
          : this.setState((prevState) => ({ text: prevState.text + '.' }))
      }, 300)
    }
    componentWillUnmount() {
      window.clearInterval(this.interval);
    }
    render() {
      return (
        <p>
          {this.state.text}
        </p>
      )
    }
  }

class App extends Component {
  constructor(){
    super()
    this.state = {
    
      categories: ["javascript", "ruby", "python", "all"],
    clicked: "all",
    names: "",
    loading: true,
    }
    this.handleclick = this.handleclick.bind(this)
    this.fetchRepos = this.fetchRepos.bind(this)

    }
componentDidUpdate(prevProps,  prevState){
  console.log(this.state.clicked)
  if(prevState.clicked !== this.state.clicked){
  this.fetchRepos(this.state.clicked)
  }
}
    componentDidMount() {
          this.fetchRepos(this.state.clicked)
    }
   

    fetchRepos(lang){
      this.setState({
        loading: true,
      })
    fetchPopularRepos(lang)
      .then((data) => {
       this.setState({
         loading:false,
         names: data,
       })

      })
    }
handleclick(lng){

  this.setState({
    clicked : lng,
  })
  
}

  render() {
    return (
      <div>
        <h1>The most popular Repositories</h1>
        <Display element = {this.state.categories} handleclick = {this.handleclick} />
  
    
      
     { this.state.loading === true ?<Loading />:
     <div>
       <h1 style = {{textAlign: 'center'}}> Active Language : {this.state.clicked}</h1>
       <RepoGrid repos={this.state.names} />
      </div>}
         </div>
    );
  }
}

export default App;
