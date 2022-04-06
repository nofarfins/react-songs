import React from 'react';
import { Performance } from './Performance';
export class FormSearch extends React.Component{
    constructor(){
        super();
        this.state={
            search : ""
        }
    }
updateSearch(event){
    this.setState({search: event.target.value})
}




render(){
    let filterperformance = this.props.performances.filter(
        (performance) =>{
            return performance.song.indexOf(this.state.search) !==-1;
        }

    )
    return(
        <div>
            

            <input 
            type="text"
            value = {this.state.search}
            onChange={this.updateSearch.bind(this)}></input>
            {filterperformance.map((performance) =>{
                return <Performance performance={performance} key= {performance.key}/>
            }
            )}
            
        </div>

    )
}


}