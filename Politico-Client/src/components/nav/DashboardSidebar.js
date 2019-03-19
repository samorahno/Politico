import React from 'react';
import '../../styles/dashboard.css';

const Sidebar = () => {
    return (
        <div className='side-nav visible' id='togle_nav'>
		<nav>
			<ul>
				<li className='active'>
					<a href='dashboard.html'>
						<span ><i className='fa fa-home fa-fw'></i></span>
						<span>Home</span>
					</a>
				</li>
				<li> 
					<a href='admin_party.html'>
						<span ><i className='fa fa-asterisk'></i></span>
						<span>Political Party</span>
					</a>
				</li>
				<li> 
					<a href='admin_office.html'>
						<span ><i className='fa fa-compress'></i></span>
						<span>Political Office</span>
					</a>
				</li>
				<li> 
					<a href='candidate_request.html'>
						<span ><i className='fa fa-pencil-square'></i></span>
						<span>Candidate Request</span>
					</a>
				</li>
				
				<li> 
					<a href='vote_result.html'>
						<span ><i className='fa fa-envelope'></i></span>
						<span>Vote Result</span>
					</a>
				</li>
				
				<li>
					<a href='admin_profile.html'>
						<span ><i className='fa fa-envelope'></i></span>
						<span>View Profile</span>
					</a>
				</li>
				<li>
					<a href='../index.html'>
						<span ><i className='fa fa-power-off'></i></span>
						<span>Logout</span>
					</a>
				</li>
				
			</ul>
		</nav>
	</div>
    );
}

export default Sidebar;