import React from 'react';
import ResetPasswordForm from '../../features/Auth/ResetPasswordForm';

const ForgotPassword: React.FC = () => {
  
    return (
      <main className='flex flex-col items-center justify-center w-screen h-screen'>
        <ResetPasswordForm />
      </main>
    );
  };
  
  export default ForgotPassword;