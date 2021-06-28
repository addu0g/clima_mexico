import { Component } from 'react';

export default class NavComponent extends Component{
    fnControlPerse=()=>{
        const element=<nav>
                    <a href="principal">Home</a> &nbsp;|&nbsp;
                    <a href="ste">Site</a>
                </nav>;
        return(
            element
        );
    }
    render(){
        return(
            this.fnControlPerse()
        );
    }
}

