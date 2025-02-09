'use client';

import React from 'react';
import SignUpForm from '@/_components/signup/signupForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
