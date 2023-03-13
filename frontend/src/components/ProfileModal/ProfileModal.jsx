import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserAction';
import { uploadImage } from '../../actions/uploadAction';


function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();
    const dispatch = useDispatch();
    const param = useParams();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);

    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    // to handle changes in inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === "profileImage"
                ? setProfileImage(img)
                : setCoverImage(img);
        }
    };

    // form submission
    const handlUpdate = (e) => {
        e.preventDefault();
        let UserData = formData;

        // if user wants to update profile pic
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append("name", fileName);
            data.append("file", profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        };

        // if user wants to update cover pic
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("file", coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(updateUser(param.id, UserData));
        setModalOpened(false);
    };

    return (
        <Modal
            overlayColor={
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form className="infoForm" onSubmit={handlUpdate}>
                <h3>Your info</h3>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="firstname"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="worksAt"
                        placeholder="Works at"
                        onChange={handleChange}
                        value={formData.worksAt}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="livesin"
                        placeholder="Lives in"
                        onChange={handleChange}
                        value={formData.livesin}
                    />
                    <input
                        type="text"
                        className="infoInput"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        value={formData.country}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name='relationship'
                        placeholder="RelationShip Status"
                        onChange={handleChange}
                        value={formData.relationship}
                    />
                </div>
                <div>
                    Profile Image
                    <input type="file"
                        name='profileImage'
                        onChange={handleImageChange}
                    />
                    Cover Image
                    <input type="file"
                        name="coverImage"
                        onChange={handleImageChange} />
                </div>

                <button
                    className="button submitBtn"
                    type='submit'>Update</button>
            </form>
        </Modal>
    );
}

export default ProfileModal;