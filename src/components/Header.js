import React from 'react';
import PropTypes from 'prop-types';

const Header = (props)=>{	
	return(
		<header className="top">
			<h1>
				Catch
				<span className="ofThe">
					<span className="of">the</span> 
					<span className="the">fish</span>
					
				</span>
			</h1>
			<h3 className="tagline">{props.tagline}</h3>
		</header>
	)
}

Header.propTypes = {
	tagline: PropTypes.string.isRequired
}

export default Header