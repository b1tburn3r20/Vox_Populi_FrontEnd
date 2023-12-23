'use client';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import BugReportForm from '../../components/BugReportForm/BugReportForm';

export default function BugReportFormPage(router) {
  return <BugReportForm router={router} />;
}
