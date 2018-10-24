import React, { Component } from 'react'
import flag from './us.svg'
import female from './female.png'
import male from './male.png'

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class UserItem extends Component {

    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this)
    }

    deleteUser(id){
        this.props.onDelete(id)
    }

    render() {
        var {user} = this.props;
        return (
            <div className="user-item" >
                <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
                <div className="user-info">
                    <img className="gender" src={user.gender==='female'? female:male} alt={user.gender} />
                    <h3>{`${capitalize(user.name.title)} ${capitalize(user.name.first)} ${capitalize(user.name.last)}`}</h3>
                    {user.nat === 'US' && (
                        <img src={flag} height="20" alt="US" />
                    )}
                    <p className="email">{user.email}</p>
                    <p className="geo">{`${user.location.city} , ${user.location.state} - ${user.nat && user.nat}`}</p>
                    <button onClick={(e) => this.deleteUser(user.email)}>DELETE</button>
                </div>
            </div>
        )
    }
}
