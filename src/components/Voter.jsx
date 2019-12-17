import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import * as api from '../utils/api'

class Voter extends Component {
    state = {
        votes: 0
    }

    style = {
        primary: {
            color: `${this.props.color}`,
            border: `2px solid ${this.props.color}`, 
            width: '100px',
            margin: '5px',
            display:'flex',
            justifyContent: 'flex-start'
        },
        secondary: {
            color: `#FCFCFC`,
            background: `${this.props.color}`,
            border: `2px solid ${this.props.color}`,
            width: '100px', 
            margin: '5px',
            display:'flex',
            justifyContent: 'flex-start'
        }
    }

    updateVote = (event) => {
        const {currentTarget:{name}} = event
        this.setState(currentState => {
            return {
                votes: currentState.votes + +name
            }
        })
        api.patchVote(name,this.props.id, this.props.type)
    }

    render() {
        return (
            <div>
                <Button variant='outlined' style={this.state.votes > 0 ? this.style.secondary : this.style.primary}  startIcon={<ThumbUpAltIcon />} name ='1' onClick={this.updateVote} disabled={this.state.votes>0}>
                    Like
                </Button>
                <Button variant='outlined' style={this.state.votes < 0 ? this.style.secondary : this.style.primary} startIcon={<ThumbDownAltIcon />} name ='-1' onClick={this.updateVote} disabled={this.state.votes<0}>
                    Dislike
                </Button>
                <p>Likes: {this.props.votes + this.state.votes}</p>

            </div>
        );
    }
}

export default Voter;