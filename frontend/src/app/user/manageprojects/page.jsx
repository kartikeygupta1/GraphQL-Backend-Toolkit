"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';


const ManageProjects = () => {
    


    return (
        <>
            <div className='vh-100'>
                <div style={{
                    backgroundImage: `url("https://e0.pxfuel.com/wallpapers/318/535/desktop-wallpaper-project-manager.jpg")`,
                    backgroundSize: "cover",
                    height: "100vh",
                }}>
                    <div className='text-center pt-5'>
                        <MDBBtn onClick={toggleOpen}>New</MDBBtn>
                    </div>
                    <MDBModal open={centredModal} setOpen={setCentredModal} tabIndex='-1'>
                        <MDBModalDialog centered>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>Project Description</MDBModalTitle>
                                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBInput label='Enter Project Name' ref={nameRef} placeholder='New GraphQL Project' />
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleOpen}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn onClick={addNewProject}>Create Project</MDBBtn>
                                </MDBModalFooter>
                            </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                    <div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 square border border-dark py-5">
                                    <ul className='list-group'>

                                        {
                                            projectList.map((project) => {
                                                return (
                                                    <li key={project._id} className='list-group-item'>
                                                        <p>{project.name}</p>
                                                        <button className='btn btn-primary btn-sm'
                                                            onClick={() => setSelProject(project)}
                                                        >View</button>
                                                        <button className='btn btn-danger btn-sm float-end' onClick={() => deleteProject(project._id)}>Delete</button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="col-md-9">
                                    {
                                        selProject !== null && (
                                            <div className='mt-3'>
                                                <h1>{selProject.name}</h1>
                                                <p>{selProject.tagline}</p>

                                                <h3>Queries : {selProject.config.queryList.length}</h3>
                                                <ul className='list-group'>
                                                    {
                                                        selProject.config.queryList.map(query => (
                                                            <li className='list-group-item'>
                                                                {query.name}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <h3>Mutation : {selProject.config.mutationList.length}</h3>
                                                <ul className='list-group'>
                                                    {
                                                        selProject.config.mutationList.map(mutation => (
                                                            <li className='list-group-item'>
                                                                {mutation.name}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <h3>Entity : {selProject.config.entityList.length}</h3>
                                                <ul className='list-group'>
                                                    {
                                                        selProject.config.entityList.map(entity => (
                                                            <li className='list-group-item'>
                                                                {entity.name}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <div className="d-flex gap-5 justify-content-center">
                                                    <Link className='btn btn-primary' href={'/query_generator/' + selProject._id}>Edit Project</Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageProjects;