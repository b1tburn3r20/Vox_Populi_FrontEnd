'use client';
import emailjs from 'emailjs-com';
import React, { useState, useEffect, useRef } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Highlight from '../../components/Highlight';

export default function BugReportForm() {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const userIdRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    category: '',
    description: ''
  });

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      const userEmail = user.nickname ? `${user.nickname}@gmail.com` : '';

      // Update the refs
      userIdRef.current.value = user.sub;
      usernameRef.current.value = user.name;
      emailRef.current.value = userEmail;
    }
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Sending the form data to EmailJS
    emailjs.sendForm(serviceID, templateID, e.target, userID).then(
      result => {
        console.log('Email sent!', result.text);
        // Additional actions after email is sent
      },
      error => {
        console.log('Email sending error:', error.text);
        // Handle errors here
      }
    );
    // POST request to Firebase
    const response = await fetch('https://voxium-af7be-default-rtdb.firebaseio.com/contact_us/reported_bugs.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('Bug report submitted successfully.');
      console.log(user.email);
      setFormData({ userId: '', username: '', email: '', category: '', description: '' }); // Reset form
    } else {
      console.log('Failed to submit bug report.');
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Hidden fields for user data from Auth0 */}
      <input type="hidden" name="userId" ref={userIdRef} />
      <input type="hidden" name="username" ref={usernameRef} />
      <input type="hidden" name="email" ref={emailRef} />

      {/* Rest of the form fields for user input */}
      <div>
        <label htmlFor="category">Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          <option value="ui">UI Issue</option>
          <option value="functionality">Functionality Issue</option>
          <option value="performance">Performance Issue</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <button type="submit">Submit Bug Report</button>
    </form>
  );
}
