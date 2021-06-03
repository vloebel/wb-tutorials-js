// Projects - 
// displays the projects when userState updates
// uses projectForm component to add new project 

import React, { useState } from 'react';
import NewProject from './NewProject';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_PROJECT } from '../../utils/mutations';
const [removeProject] = useMutation(REMOVE_PROJECT);


const Projects = ({ userState, setuserState }) => {
  const [NewProjectRequest, setNewProjectRequest] = useState(false);


  // ----------77777777777----------------7777777777777777777-
  // const handleRemoveProject = async (event) => {
  //   try {
  //     let projectId = 1234
  //     const data = await removeProject({
  //       variables: { projectId },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };


  console.log("VICKY userState", userState)


  return (
    <div className="flex-row justify-space-between">
      <div className="container" >
        <div>
          <button onClick={() => setNewProjectRequest(true)} style={{ backgroundColor: 'green' }}>Add New Project</button>
          {NewProjectRequest ? (
            <div>
              <NewProject />
            </div>
          ) : null}
          {userState.projects.map((proj) =>

            <ul key={proj._id} style={{ listStyle: 'none' }}>
              {/* <li> <button onClick={() => handleRemoveProject} style={{ backgroundColor: 'orange' }}>Delete</button></li> */}

              <li style={{ fontWeight: 'bold' }}>{proj.title}</li>
              <li>_id: {proj._id}</li>
              <li>thumbnail: {proj.thumbnail}</li>
              <li>repoLink: {proj.repoLink}</li>
              <li>deployedLink: {proj.deployedLink}</li>
              <li>videoLink: {proj.videoLink}</li>
              <li>organization: {proj.organization}</li>
              <li>description: {proj.blurb}</li>
              <li>project skills: {proj.projectSkills}</li>
            </ul>

          )
          }
        </div>
      </div>
    </div>
  )
}

export default Projects;