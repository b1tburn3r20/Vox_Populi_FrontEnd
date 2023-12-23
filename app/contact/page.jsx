'use client';
import { FaBug, FaSeedling, FaQuestion } from 'react-icons/fa';
import './contact.css';
import PageLink from '../../components/PageLink';
export default function Contact() {
  return (
    <main>
      <h1>Contact Us</h1>
      <h2>We’re here to help and answer any question you might have!</h2>
      <p>
        At Voxium, we deeply value the feedback and inquiries we receive from our users and partners. Your insights and
        comments are crucial to our continuous improvement and help us to better understand your needs. Whether it's a
        question, a suggestion, or a concern, we're eager to hear what you have to say.
      </p>
      <p>
        Your feedback not only helps us enhance our services, but it also encourages a culture of collaboration and
        openness. We're committed to ensuring the highest standards of security and service, and your reports and
        suggestions play a key role in helping us identify and address issues promptly and effectively.
      </p>
      <h3>Choose an option to contact us</h3>
      <div className="report_option_container ">
        <PageLink href="/reportabug" className="report_option option_report_a_bug">
          <p>Report a bug</p>
          <FaBug />
        </PageLink>
        <div className="report_option option_request_a_feature">
          <p>Request a feature</p>
          <FaSeedling />
        </div>
        <div className="report_option option_something_else">
          <p>Something else?</p>
          <FaQuestion />
        </div>
      </div>
    </main>
  );
}
