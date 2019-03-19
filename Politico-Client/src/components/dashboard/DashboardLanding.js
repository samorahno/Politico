import React from 'react';
import '../../styles/dashboard.css';
import Header from '../nav/DashboardHeader';
import Footer from '../nav/DashboardFooter'

const DashboardLanding = () => {
    return (
			<div>
				<Header />
        <div className='main-content'>
				<div className='title'>
					home /
				</div>
			
			<div className='main'>
				<div className='widget'>
					<div className='title heado'>Citizens</div>
					<div className='widget_stat'>
						<div className='widget_stat1'>
						<i className='fa  fa-check-circle-o'></i>
						</div>
						<div className='widget_stat2'>
						5
						</div>
					</div>
				</div>
				<div className='widget'>
					<div className='title heado'>Politicians</div>
					<div className='widget_stat'>
						<div className='widget_stat1'>
						<i className='fa fa-asterisk'></i>
						</div>
						<div className='widget_stat2'>
						8
						</div>
					</div>
				</div>
				<div className='widget'>
					<div className='title heado'>Vote Count</div>
					<div className='widget_stat'>
						<div className='widget_stat1'>
						<i className='fa fa-book'></i>
						</div>
						<div className='widget_stat2'>
						8
						</div>
					</div>
				</div>
				
			</div>
			
			<main className='cards'>
				  <article className='card'>
					<img src='../images/Anonymous.jpg' alt='Candidate Photo' />
					<div className='text'>
					  <h4><strong>Name:</strong> Wale Ojo</h4>
					  <p><strong>Office:</strong> National Assembly Member</p>
					  <p><strong>Party:</strong> PDP</p>
					 
					</div>
				  </article>
				  <article className='card'>
					<img src='../images/Anonymous.jpg' alt='Sample photo' />
					<div className='text'>
					  <h4><strong>Name:</strong> Ahmed Mark</h4>
					  <p><strong>Office:</strong> National Assembly Member</p>
					  <p><strong>Party:</strong> APC</p>
					 
					</div>
				  </article>
				  <article className='card'>
					<img src='../images/Anonymous.jpg' alt='Sample photo' />
					<div className='text'>
					  <h4><strong>Name:</strong> Bimbo Ali</h4>
					  <p><strong>Office:</strong> National Assembly Member</p>
					  <p><strong>Party:</strong> AD</p>
					
					</div>
				  </article>
				  <article className='card'>
					<img src='../images/Anonymous.jpg' alt='Sample photo' />
					<div className='text'>
					  <h4><strong>Name:</strong> Tolu Oni</h4>
					  <p><strong>Office:</strong> National Assembly Member</p>
					  <p><strong>Party:</strong> LP</p>
					 
					</div>
				  </article>
				  <article className='card'>
					<img src='../images/Anonymous.jpg' alt='Sample photo' />
					<div className='text'>
					  <h4><strong>Name:</strong> Tola Odeyemi</h4>
					  <p><strong>Office:</strong> Legislative Council Member</p>
					  <p><strong>Party:</strong> PDP</p>
					
					</div>
				  </article>
				  
        </main>
			<button className='btn btnmore'>View More</button>
			</div>
       <Footer />
			 </div>     
    );
}

export default DashboardLanding;