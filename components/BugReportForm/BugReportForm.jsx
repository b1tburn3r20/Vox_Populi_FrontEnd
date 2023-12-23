import React, { useEffect } from 'react';
import { useBugReportForm } from '../../hooks/useBugReportForm';
import './BugReportForm.css'; // Importing CSS styles
import Loader from 'react-loading'; // Assuming you have a Loader component

export default function BugReportForm({}) {
  const {
    userIdRef,
    usernameRef,
    emailRef,
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    isSubmitting,
    submissionSuccess
  } = useBugReportForm();

  useEffect(() => {
    if (submissionSuccess) {
      alert('thanks!');
    }
  }, [submissionSuccess]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isSubmitting) {
    return <Loader type="spin" color="#00BFFF" height={50} width={50} />;
  }
  return (
    <div className="bug-report-form-container">
      <h2>Report a Bug</h2>
      <p>Your feedback helps us identify and fix issues, enhancing the quality of our service.</p>

      <form onSubmit={handleSubmit} className="bug-report-form">
        {/* Hidden fields for user data from Auth0 */}
        <input type="hidden" name="userId" ref={userIdRef} />
        <input type="hidden" name="username" ref={usernameRef} />
        <input type="hidden" name="email" ref={emailRef} />

        {/* Category selection */}
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a Category</option>
            <option value="ui">UI Issue</option>
            <option value="functionality">Functionality Issue</option>
            <option value="performance">Performance Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description field */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Submit Bug Report
        </button>
      </form>
    </div>
  );
}
