import { FaBug, FaSeedling, FaQuestion } from 'react-icons/fa';
import './contact.css';
export default function Contact() {
  return (
    <main>
      <h1>Contact Us</h1>
      <h2>Thank you for reaching out!</h2>
      <h3>Choose an option to contact us</h3>
      <div className="report_option_container ">
        <div className="report_option option_report_a_bug">
          <p>Report a bug</p>
          <FaBug />
        </div>
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
