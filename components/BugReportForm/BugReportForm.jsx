// components/BugReportForm.js
import React from 'react';
import { useBugReportForm } from '../../hooks/useBugReportForm';

export default function BugReportForm() {
  const { userIdRef, usernameRef, emailRef, formData, isLoading, handleChange, handleSubmit } = useBugReportForm();

  if (isLoading) {
    return <p>Loading...</p>; // Or any loading spinner
  }

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
