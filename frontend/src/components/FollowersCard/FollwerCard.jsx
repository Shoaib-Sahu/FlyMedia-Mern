import React, { useEffect, useState } from 'react'
import './FollowerCard.css'
import User from '../User/User'
import { getAllUser } from '../../api/UserRequest'
import { useSelector } from "react-redux";

const FollwerCard = () => {
    const [person, setPerson] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
            setPerson(data);
        };
        fetchPersons();
    }, []);

    return (
        <div className='followerCard'>
            <h3>People you may know</h3>
            {
                person.map((person, id) => {
                    if (person._id !== user._id) {
                        return (
                            <User person={person} key={id} />
                        )
                    }
                })
            }
        </div>
    )
}

export default FollwerCard