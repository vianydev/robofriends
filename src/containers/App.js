import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor(props){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => { return response.json();})
        .then(users => {this.setState({robots: users})})
    }
    
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }


    render() {
        const {robots, searchfield} = this.state;

        const filterRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })

        if (robots.length === 0){
            return <h1>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <div>
                        <h1 className='f1'>Robofriends</h1>
                        <SearchBox searchChange={this.onSearchChange} />
                    </div>
                    <Scroll>
                        <CardList robots={filterRobots} />
                    </Scroll>
                    
                </div>
            );
        }

        
    }
    
}

export default App;