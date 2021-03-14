// eslint-disable-next-line
import React,{useState,useEffect} from 'react';
import {CardList} from './components/card-list/cardlist.component'
import './App.css';
import { SearchBox } from './components/search-box/searchbox.component';

class App extends React.Component{
      constructor(){
          super();

          this.state={
            monsters: [],
            queryString: ''
          };
      }

      async componentDidMount(){
          try{
              const result = await fetch("https://jsonplaceholder.typicode.com/users");
              const users = await result.json();
          // return users;
              this.setState({monsters: users })
          }
          catch(error){
              console.log(error)
          }
      }
        
      handleChange = async(e) => {
          console.log("Handle Change called")
          try{
          await this.setState({
            queryString: e.target.value
          })
          }
          catch(err){
            console.log(err);
          }
          //console.log(this.state)
      }

       
      render(){
      // const [msg, setMsg] = useState(""); - hooks

      // useEffect(() => {
      //   setMsg("Hello from Manudeep")
      // }, [])
          const {monsters, queryString} = this.state//DESTRUCTURING
          const filteredMonsters = monsters.filter(monster => {
            return monster.name.toLowerCase().includes(queryString)
          })

          return (
            <div className="App">
                <h1>Monsters Rolodex</h1>
                <SearchBox value={queryString} placeholder="Search monsters" handleChange={this.handleChange}/>
                <CardList monsters={filteredMonsters}/>
            </div>
          );
      }
}

export default App;
