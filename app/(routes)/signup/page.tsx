'use client';

import React from 'react';

import SignUpForm from '@/_components/signup/signupForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
