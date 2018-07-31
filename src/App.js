import React, { Component } from 'react';
import './App.css';
import api from './api.json'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            url: `http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${api.key}&limit=3`,
            inputValue: '',
            errorMessage: '',
            gifData: []
        }    
    }
    
    
    componentDidMount(){
        this.getData();
    }
   // uzyskalismy dostep do api 
    getData = () =>{
        const link = this.state.url;
        const obj = [];
        fetch(`${link}`)                                      
            .then(resp => resp.json())
            .then(resp => {
            resp.data.map(value=>this.setState({
                gifData: [...this.state.gifData, value]
            }))})
        .catch(err=>console.log(err))
    }
    // aktualizacja wartosci inputa
    handleChange = event => {
        this.setState({
            inputValue: event.target.value  
        })     
    }
    
    handleClick = event => {
        event.preventDefault;
    let searchingGif = this.state.inputValue;
        this.setState({
            url: `http://api.giphy.com/v1/gifs/search?q=${searchingGif}&api_key=${api.key}&limit=3`
        }, () =>{ 
            this.getData()
        }             
        )}
    
    componentDidUpdate(){
        console.log(this.state.gifData)
    }
    countImgTags = () =>{
        return document.getElementsByTagName('img').length
    }

      render() {
          
          
      
    return (
        
      <div className='container mt-6'>
        <div className='row input-group' >
            <div className='col-9'>
                <input className='col form-control' type='text' onChange={this.handleChange} value={this.state.inputValue} pleaceholder='Enter something'/>
            </div>
            <div className='col-3'>
                 <button onClick={this.handleClick} className="col btn btn-secondary">search!</button>        
                </div>
                
            </div>{
    
        }
            <div className='row mt-6'>        
                 {   
                    this.state.gifData.map(data=>{
        return(
            <div className="col-sm">
                     <img className="img-styles"src={data.images.downsized.url} key={data.id} alt={data.title}/>
                    </div>)
        })
        }
            </div>
        </div>
        
    
    )
  }
}

export default App;
