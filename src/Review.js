import React from "react";

export class Review extends React.Component {


    render() {
        return (
            <div>
                <p>{this.props.review_title}</p>
                <p>{this.props.review_text}</p>
                
            </div>
        )
    }
}
