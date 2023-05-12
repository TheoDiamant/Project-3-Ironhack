import "./EditProfilepage.css"

import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import Loading from "../../components/Loading/Loading";
import ProfilePictureInput from "../../components/ProfilePictureInput/ProfilePictureInput";

const API_URL = "http://localhost:5005"; 

function EditProfilePage() {

	const storedToken = localStorage.getItem("authToken");
	
	const { userId } = useParams()
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		getUser();
	}, []);

	function getUser() {
		axios.get(`${API_URL}/api/member/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
		.then(response => {
		  setUser(response.data)
		})
	}
	
	return (
		<div className="editProfilePageDiv">
			<div className="editProfilePageWrapper">
				
				<div className="changeProfilePicDiv">
					{user ?

					<ProfilePictureInput currentPFP={user.profilePicture} setUser={setUser}/> //Click on PFP

					:

					<Loading />
					
					}
				</div>

				<div className="changeUserInfoDiv">	
					{/* <div class= "container rounded bg-white mt-5">
						<div class="row">
							<div class="col-md-8">
								<div class="p-3 py-5">
									<div class="d-flex justify-content-between align-items-center mb-3">
										<div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
											<h6>Back to home</h6>
										</div>
										<h6 class="text-right">Edit Profile</h6>
									</div>
									<div class="row mt-2">
										<div class="col-md-6">
										<label>FirstName</label>
										{user === null ? <p>Loding name </p> :<input type="text" class="form-control" placeholder="first name" value={user.name}/>}
										</div>
										<div class="col-md-6">
										<label>LastName</label>
										<input type="text" class="form-control" value="Doe" placeholder="Doe"/>
										</div>
									</div>
									<div class="row mt-3">
										<div class="col-md-6">
										<label>Email</label>
										{user === null ? <p>Loding name </p> :<input type="text" class="form-control" placeholder="Email" value={user.email}/>}
										</div>
										<div class="col-md-6">
										<label>Mobile Number</label>
										<input type="text" class="form-control" value="+19685969668" placeholder="Phone number"/>
										</div>
									</div>
									<div class="row mt-3">
										<div class="col-md-6">
										<label>Street Adress</label>
										<input type="text" class="form-control" placeholder="address" value="D-113, right avenue block, CA,USA"/>
										</div>
										<div class="col-md-6">
										<label>Country</label>
										<input type="text" class="form-control" value="USA" placeholder="Country"/>
										</div>
									</div>
									<div class="row mt-3">
									<label>Saved Credit Card</label>
										<div class="col-md-6"><input type="text" class="form-control" placeholder="Bank Name" value="Bank of America"/>
										</div>
										<div class="col-md-6"><input type="text" class="form-control" value="043958409584095" placeholder="Account Number"/>
										</div>
									</div>
									<div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
								</div>
							</div>
						</div>
					</div>  */}
				</div>		
			
			</div>
		</div>
	)
}

export default EditProfilePage