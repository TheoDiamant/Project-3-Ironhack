
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import "./EditProfilePage.css"

import ImageInput from "../../components/ImageInput/ImageInput"

const API_URL = "http://localhost:5005"; 


function EditProfilepage() {

	
	
	const storedToken = localStorage.getItem("authToken");
	
	const { userId } = useParams()

	const [user, setUser] = useState(null)
	console.log(user)

	const getUser = () => {
		axios.get(`${API_URL}/api/member/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
		.then(response => {
		  const uniqueUser = response.data
		  setUser(uniqueUser)
		  console.log(user)
		})
	  }

	useEffect(() => {
		getUser();
	  }, []);

	 

	
  return (


    <div>
 

 
 <div class="container rounded bg-white mt-5">
        <div class="row">
            <div class="col-md-4 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
				<img class="rounded-circle mt-5" src="https://i.imgur.com/0eg0aG0.jpg" width="90"/>
				 {user === null ? <p>Loading name</p> : <span class="font-weight-bold">{user.name}</span>}
				{user === null ? <p>Loading name</p> : <span class="text-black-50">{user.email}</span>}
			
				{user === null ? <p>Loading name</p> : <span class="text-black-50">{user.country}</span>} 
				</div>

				<i>Add a quote</i>
            </div>
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
    </div>


  {/* <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
				</div>
				<h5 class="user-name">Yuki Hayashi</h5>
				<h6 class="user-email">yuki@Maxwell.com</h6>
			</div>
			<div class="about">
				<h5>About</h5>
				<p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Full Name</label>
					<input type="text" class="form-control" id="fullName" placeholder="Enter full name"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email</label>
					<input type="email" class="form-control" id="eMail" placeholder="Enter email ID"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" class="form-control" id="phone" placeholder="Enter phone number"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="website">Website URL</label>
					<input type="url" class="form-control" id="website" placeholder="Website url"/>
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Address</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Street">Street</label>
					<input type="name" class="form-control" id="Street" placeholder="Enter Street"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="ciTy">City</label>
					<input type="name" class="form-control" id="ciTy" placeholder="Enter City"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">State</label>
					<input type="text" class="form-control" id="sTate" placeholder="Enter State"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="zIp">Zip Code</label>
					<input type="text" class="form-control" id="zIp" placeholder="Zip Code"/>
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
					<button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
					<button type="button" id="submit" name="submit" class="btn btn-primary">Update</button>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</div>
</div>   */}
    </div>


  )
}

export default EditProfilepage