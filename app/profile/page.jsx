'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';

function Profile() {
  const { user, isLoading } = useUser();
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/updateUser', {
        userId: user.sub, // Auth0 user ID
        userMetadata: {
          name: newName,
          email: newEmail
        }
      });
      console.log('User metadata updated:', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error updating user metadata:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </Col>
            <Col md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">New Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter new name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">New Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter new email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Update Profile</Button>
          </Form>
          <Row data-testid="profile-json">
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
