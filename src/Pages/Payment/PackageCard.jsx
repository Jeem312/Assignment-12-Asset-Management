import React from 'react';
import { FaAmazonPay, FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PackageCard = ({p}) => {
    
    return (
        <div>
           <section className="py-20 dark:bg-gray-100 dark:text-gray-800 ">
           <div className="container px-4 mx-auto">
					
					<div className="flex items-stretch -mx-4">
						<div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
							<div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 dark:bg-gray-50 bg-green-400 text-white">
								<div className="space-y-2">
									<h4 className="text-2xl font-bold">{p.package_name}</h4>
									<span className="text-6xl font-bold">${p.price}

									</span>
								</div>
								<p className="mt-3 leading-relaxed dark:text-gray-600">For Maximum {p.members_count} employees</p>
								<ul className="flex-1 mb-6 dark:text-gray-600">
									<li className="flex mb-2 space-x-2">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
										</svg>
										<span>{p.members_count} Employees</span>
									</li>
									<li className="flex mb-2 space-x-2">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
										</svg>
										<span>24 Hour Support</span>
									</li>
									<li className="flex mb-2 space-x-2">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-600">
											<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
										</svg>
										<span>User Friendly</span>
									</li>
								</ul>
                                <div>
                            <Link to={`/payment/${p._id}`}>
                            <button className='btn btn-sm border border-white bg-green-400 text-white'>Pay Now  </button></Link>
                           </div>
							</div>
                          
						</div>
						
						
					</div>
				</div>
			</section>

		</div> 
       
    );
};

export default PackageCard;