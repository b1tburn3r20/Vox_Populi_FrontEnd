'use client';
import emailjs from 'emailjs-com';
import React, { useState, useEffect, useRef } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Highlight from '../../components/Highlight';
import BugReportForm from '../../components/BugReportForm/BugReportForm';

export default function BugReportFormPage() {
  return <BugReportForm />;
}
