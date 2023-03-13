import React from 'react'
import FollwerCard from '../FollowersCard/FollwerCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = () => {
    return (
        <div className='profileSide'>
            <LogoSearch />
            <InfoCard />
            <FollwerCard />
        </div>
    )
}

export default ProfileLeft
