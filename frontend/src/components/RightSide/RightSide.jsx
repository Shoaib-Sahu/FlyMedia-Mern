import React, { useState } from 'react'
import './RightSide.css'
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import NavIcons from '../NavIcons/NavIcons';

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className='rightSide'>
            {/* Side Navbar */}
            <NavIcons />
            {/* TrendCard */}
            <TrendCard />

            {/* Sharing button */}
            <button className="button r-btn"
                onClick={() => setModalOpened(true)}>Share</button>
            <ShareModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened} />
        </div>
    )
}

export default RightSide