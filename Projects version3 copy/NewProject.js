// Creates a new project from data entered in form
// Saves project and updates user in db 

// Version 1.0 is new project only - no editing or updates


import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PROJECT } from '../../utils/mutations';

const NewProject = () => {
  const [projectFormData, setprojectFormData] =
    useState({
      _id: '',
      title: '',
      thumbnail: '',
      repoLink: '',
      deployedLink: '',
      videoLink: '',
      organization: '',
      blurb: '',
      projectSkills: [],
    });

  const [addProject] = useMutation(ADD_PROJECT);

//input form validation
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  // ----------------------------------------------
  // UPDATE FORM FIELD Event Listener 
  // ----------------------------------------------

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setprojectFormData({ ...projectFormData, [name]: value });
  };

  // ----------------------------------------------
  // SUBMIT BUTTON event listener
  // addProject mutation 
  // add Project to userState Project Array
  // updateUser in database
  // ----------------------------------------------
  const handleSaveProject = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log("**Saving projectFormData** ", projectFormData)

    // create project in database
    // automatically updates logged in user with this project
    try {
      const data = await addProject({
        variables: { ...projectFormData },
      });
      console.log("**returned project** ", data)
    } catch (e) {
    console.error(e);
  }
};


return (
  <>
    <p>Project Information</p>
    <Form noValidate validated={validated} onSubmit={handleSaveProject}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Error updating project information.
        </Alert>

      <Form.Group>
        <Form.Label htmlFor='title'>Title</Form.Label>
        <Form.Control
          type='title'
          placeholder=''
          name='title'
          onChange={handleInputChange}
          value={projectFormData.title}
          required
        />
        <Form.Control.Feedback type='invalid'>Project must have a title</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='thumbnail'>Thumbnail File Name (optional)</Form.Label>
        <Form.Control
          type='thumbnail'
          placeholder='do not include directory path'
          name='thumbnail'
          onChange={handleInputChange}
          value={projectFormData.thumbnail}
        />
        <Form.Control.Feedback type='invalid'>Last name is required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='repoLink'>Github Repository Link (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='repoLink'
          onChange={handleInputChange}
          value={projectFormData.repoLink}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='deployedLink'>Link to Deployed Application (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='deployedLink'
          onChange={handleInputChange}
          value={projectFormData.deployedLink}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='videoLink'>Video Link (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='videoLink'
          onChange={handleInputChange}
          value={projectFormData.videoLink}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='organization'>Organization (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='organization'
          onChange={handleInputChange}
          value={projectFormData.organization}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='blurb'>Short Blurb (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='blurb'
          onChange={handleInputChange}
          value={projectFormData.blurb}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor='projectSkills'>List of skills (optional)</Form.Label>
        <Form.Control
          type='text'
          placeholder=''
          name='projectSkills'
          onChange={handleInputChange}
          value={projectFormData.projectSkills}
        />
      </Form.Group>


      <Button disabled={!(projectFormData.title)} type='submit' variant='success'>
        Save Project
        </Button>
    </Form>
  </>
);
};

export default NewProject;