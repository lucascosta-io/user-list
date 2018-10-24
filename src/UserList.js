import React, { Component } from 'react'
import axios from 'axios'
import UserItem from './UserItem'

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            fetched: false
        }

        this.fetchUsersFromAPI = this.fetchUsersFromAPI.bind(this)
        this.renderUserItems = this.renderUserItems.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
    }

    componentDidMount(){
        this.fetchUsersFromAPI();
    }

    //function that is called from the child component
    handleDeleteUser(id){
        var newUsers = {...this.state.users};
        delete newUsers[id]

        this.setState({
            users: newUsers
        })
    }

    //fetches users from the API
    fetchUsersFromAPI(){
        console.log('fetching users');
        const URL = 'https://randomuser.me/api/?results=25';
        axios.get(URL).then((data) => {
            if(data.data.results){
                var userObj = this.transformArrayIntoObject(data.data.results)
                this.setState({
                    users: userObj,
                    fetched: true
                })
            }
        })
    }

    // Function to trasfor the array of users into an object to facilitate removing from the list.
    // It assumes email addresses are unique amongst users and uses that email as the key
    //to the newly generated object
    transformArrayIntoObject(array){
        var obj ={};
        array.map((user, i) => {
            obj[array[i].email] = array[i]
            return 0
        })

        return obj
    
    }

    //renders a list of UserItem s
    renderUserItems(){
        var keys = Object.keys(this.state.users)
        var {users} = this.state

        return(
            keys.map( (key, i) => {
                return(
                    <UserItem key={key} user={users[key]} onDelete={this.handleDeleteUser}  />
                )
            })
        )
        

    
    }

    render() {
        return ( 
        <div >
            <h1>User List</h1>
            {
                this.state.fetched? (
                    <div className="list">
                        {this.renderUserItems()}
                    </div>
                ) : (
                    <p> Fetching... </p>
                )
            }
            </div>
        )
    }
}