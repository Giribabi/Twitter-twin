import React, { useEffect, useState } from "react";
import "./Edit.css";
import {
    Box,
    Button,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
};

function EditChild({ DOB, setDOB }) {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <React.Fragment>
            <div className="birthdate" onClick={handleOpenModal}>
                <div className="edit-dob-button">Edit details</div>
            </div>
            <Modal
                hideBackdrop
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 300, height: 200 }}>
                    <div className="text">
                        <h2>Edit date of birth?</h2>
                        <Typography>
                            This can be only changed a few times.
                            <br />
                            Make sure you enter the correct age.
                        </Typography>
                        <div className="modal-dob-input">
                            <input
                                type="date"
                                onChange={(e) => setDOB(e.target.value)}
                            />
                            <Button
                                className="cancel-changes-button"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

function Edit({ loggedinUser }) {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [DOB, setDOB] = useState("");
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {}, [loggedinUser]);

    const handleSave = async () => {
        console.log("entered");
        const editedInfo = {
            name: name,
            bio: bio,
            dob: DOB,
            location: location,
            website: website,
        };
        if (editedInfo) {
            await axios.patch(
                `http://localhost:3030/profile/update/${loggedinUser[0]?.email}`,
                editedInfo
            );
        }
        setOpenModal(false);
    };

    return (
        <div className="edit-profile-container">
            <button
                className="edit-profile-button"
                onClick={() => setOpenModal(true)}
            >
                Edit Profile
            </button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal">
                    <div className="modal-header">
                        <Typography
                            variant="h5"
                            className="edit-profile-heading"
                        >
                            Edit Profile
                        </Typography>
                        <div className="modal-options">
                            <button
                                className="save-profile-button"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                            <IconButton onClick={() => setOpenModal(false)}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                    <form className="form-content">
                        <TextField
                            className="text-field"
                            style={{ margin: "5px 1px" }}
                            placeholder="Name"
                            fullWidth
                            is="fullWidth"
                            variant="filled"
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={loggedinUser[0]?.name || ""}
                        />
                        <TextField
                            className="text-field"
                            style={{ margin: "5px 1px" }}
                            placeholder="Bio"
                            fullWidth
                            is="fullWidth"
                            variant="filled"
                            onChange={(e) => setBio(e.target.value)}
                            defaultValue={loggedinUser[0]?.bio || ""}
                        />
                        <TextField
                            className="text-field"
                            style={{ margin: "5px 1px" }}
                            placeholder="Location"
                            fullWidth
                            is="fullWidth"
                            variant="filled"
                            onChange={(e) => setLocation(e.target.value)}
                            defaultValue={loggedinUser[0]?.location || ""}
                        />
                        <TextField
                            className="text-field"
                            style={{ margin: "5px 1px" }}
                            placeholder="Website"
                            fullWidth
                            is="fullWidth"
                            variant="filled"
                            onChange={(e) => setWebsite(e.target.value)}
                            defaultValue={loggedinUser[0]?.website || ""}
                        />
                    </form>
                    <div className="form-footer">
                        <div className="birthdate-section">
                            <Typography variant="h6">Birth Date</Typography>
                            <EditChild DOB={DOB} setDOB={setDOB} />
                        </div>
                        <div className="rest-section">
                            {loggedinUser[0]?.dob ? (
                                <h2>{loggedinUser[0].dob}</h2>
                            ) : (
                                <h2>
                                    {DOB ? DOB : "Add your date of birth now!"}
                                </h2>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Edit;
