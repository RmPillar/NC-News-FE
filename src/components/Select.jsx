import React from 'react';

const Select = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Sort By: 
                <select onChange={props.handleChange}>
                    <option value='created_at'>Date Created</option>
                    <option value='comment_count'>Number of Comments</option>
                    <option value='votes'>Votes</option>
                </select>
                <button>Sort</button>
            </label>
        </form>
    );
};

export default Select;