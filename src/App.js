import React from 'react';
import { Link } from 'react-router';

import './App.css';

import { connect } from 'react-redux';
import { getTracks } from './actions/tracks';
import Menu from './Menu';


const App = ({ tracks, onAddTrack, onFindTrack, onGetTracks, ownProps }) => {


	let trackInput = '';
	let searchInput = '';

    const addTrack = () => {
        console.log(trackInput.value);
        onAddTrack(trackInput.value);
	    trackInput.value = '';
    };

	const findTrack = () => {
		console.log('findTrack', searchInput.value);
		onFindTrack(searchInput.value);

	};

return (
	<div>
		<Menu/>
		<div>
			<input type="text" ref={(input) => { trackInput = input }} />
			<button onClick={addTrack}>Add track</button>
		</div>
		<div>
			<input type="text" ref={(input) => { searchInput = input }} />
			<button onClick={findTrack}>Find track</button>
		</div>
		<div>
			<button onClick={onGetTracks}>Get tracks</button>
		</div>
		<ul>
			{tracks.map((track, index) =>
				<Link to={`/tracks/${track.id}`}>{track.name}</Link>
			)}
		</ul>
	</div>
)
};

export default connect(
	(state, ownProps) => ({
		tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
		ownProps
	}),
    dispatch => ({
        onAddTrack: (name) => {
            const payload = {
                id: Date.now().toString(),
                name

            };
            dispatch({type: 'ADD_TRACK', payload})
        },
	    onFindTrack: (name) => {
		    dispatch({ type: 'FIND_TRACK', payload: name })
	    },
	    onGetTracks: () => {
		    dispatch(getTracks());
	    }
    })
)(App);