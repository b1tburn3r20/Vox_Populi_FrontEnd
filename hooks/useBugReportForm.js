import { useState, useEffect, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import emailjs from 'emailjs-com';

export const useBugReportForm = () => {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for managing submission loading
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
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
      setFormData({ ...formData, userId: user.sub, username: user.name, email: userEmail });
    }
  }, [user]);
  

 

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    // Sending the form data to EmailJS
    emailjs.sendForm(serviceID, templateID, e.target, userID)
      .then(
        result => {
          console.log('Email sent!', result.text);
          submitToFirebase(); // Call to submit the form data to Firebase
        },
        error => {
          console.log('Email sending error:', error.text);
          setIsSubmitting(false); // Stop loading on error
        }
      );
  };

  const submitToFirebase = async () => {
    const dataToSubmit = {
      userId: userIdRef.current ? userIdRef.current.value : 'Empty',
      username: usernameRef.current ? usernameRef.current.value : 'Empty',
      email: emailRef.current ? emailRef.current.value : 'Empty',
      category: formData.category,
      description: formData.description
    };
  
    // POST request to Firebase
    const response = await fetch('https://voxium-af7be-default-rtdb.firebaseio.com/contact_us/reported_bugs.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSubmit)
    });

    if (response.ok) {
      console.log('Bug report submitted successfully.');
      resetForm();
      setIsSubmitting(false); // Stop loading
      setSubmissionSuccess(true); // Set submissionSuccess to true
    } else {
      console.log('Failed to submit bug report.');
      setIsSubmitting(false); // Stop loading
    }
   };
 
  

  const resetForm = () => {
    setFormData({ userId: '', username: '', email: '', category: '', description: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { userIdRef, usernameRef, emailRef, formData, isLoading, handleChange, handleSubmit, isSubmitting, submissionSuccess };
};
