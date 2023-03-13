import React from 'react'
import FollwerCard from '../FollowersCard/FollwerCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'

const ProfileSide = () => {
    return (
        <div className='profileSide'>
            <LogoSearch />
            <ProfileCard location="homePage" />
            <FollwerCard />
        </div>
    )
}

export default ProfileSide