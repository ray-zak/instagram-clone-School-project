
import './Profile.css';
import ProfileBanner from "../ProfileBanner.component";
import Gallery from "../Gallery.component";


function Profile() {
    return (
        <div>
            <div className='body'>
                <div className='container'>
                    <ProfileBanner/>
                </div>
                <main>
                    <div className='container'>
                        <Gallery/>
                    </div>
                </main>
                <div className='loader'></div>
            </div>
        </div>
    );
}

export default Profile;