import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import styled from 'styled-components'
import * as api from '../utils/api'

const Div = styled.div`
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        width:250px;
    `

    const P = styled.p`
        width: 250px
    `

class Voter extends Component {
    state = {
        votes: 0
    }

    style = {
        primary: {
            color: `#F7FFF7`,
            border: `2px solid #F7FFF7`, 
            width: '100px',
            margin: '5px',
            display:'flex',
            justifyContent: 'flex-start'
        },
        secondary: {
            color: `${this.props.color}`,
            background: `#F7FFF7`,
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
            <Div>
                 <P>Likes: {this.props.votes + this.state.votes}</P>
                <Button variant='outlined' style={this.state.votes > 0 ? this.style.secondary : this.style.primary}  startIcon={<ThumbUpAltIcon />} name ='1' onClick={this.updateVote} disabled={this.state.votes>0}>
                    Like
                </Button>
                <Button variant='outlined' style={this.state.votes < 0 ? this.style.secondary : this.style.primary} startIcon={<ThumbDownAltIcon />} name ='-1' onClick={this.updateVote} disabled={this.state.votes<0}>
                    Dislike
                </Button>
               

            </Div>
        );
    }
}

export default Voter;