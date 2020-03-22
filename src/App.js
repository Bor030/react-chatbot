import React, {Component} from 'react';

import './App.css';
import {CardList} from './components/card-list.component';
import{SearchField} from './components/search-box.component'


class App extends Component {
constructor(){

  super()


  this.state = {

    monsters:[],
    searchField:''
    
  }

  this.handleChange = this.handleChange.bind(this)

}

componentDidMount(){
 
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => this.setState({monsters: users}))

}

handleChange = (e) => {this.setState({searchField: e.target.value }) }
render(){

     const { monsters, searchField} =  this.state;
     const filterMonsters =  monsters.filter(monsters =>
      
      monsters.address.zipcode.includes(searchField)

      
      )

    return(

       <div className="App">
         <h1>Aliens Rolodex</h1>
        <SearchField
        placeholder='search aliens'
        handleChange ={this.handleChange}
        />
       
     
        <CardList monsters={filterMonsters}></CardList>
        
      </div>
       
    )


}
}

export default App;
