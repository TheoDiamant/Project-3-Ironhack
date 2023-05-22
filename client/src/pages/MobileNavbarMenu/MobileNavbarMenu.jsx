import "./MobileNavbarMenu.css"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function MobileNavbarMenu() {

    const navigate = useNavigate()
    const { user, logOutUser } = useContext(AuthContext)

    function goToProfile() {
        navigate(`/member/${user._id}`)
    }

    function goToMesages() {
        navigate("/messages")
    }

    return(
        
        <div className="mobileNavbarMenuDiv">
            {user &&
                <div className="mobileMenuProfileDiv" onClick={goToProfile}>
                    <div className="mobileMenuImageDiv">
                        <img src={user.profilePicture} alt="" />
                    </div>
                    <p>{user.name}</p>
                </div>
            }

            <div className="mobileMenuFavouritesDiv">
                <div className="mobileMenuImageDiv">
                    <img src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png" alt="" />
                </div>
                <p>Favourites</p>
            </div>

            <div className="mobileMenuMessagesDiv" onClick={goToMesages}>
                <div className="mobileMenuImageDiv">
                    <img src="https://img.favpng.com/4/13/10/email-computer-icons-message-icon-design-png-favpng-Z2c8kiG21uxY3Xd63qQi3Qzb1.jpg" alt="" />
                </div>
                <p>Messages</p>
            </div>
            <button className="mobileMenuButton" onClick={logOutUser}>Logout</button>
        </div>
    )
}

export default MobileNavbarMenu