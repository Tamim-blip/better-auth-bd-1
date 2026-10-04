import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-from';

const ResetPasswordPage = () => {
    return (
        <div>
            <h1>Reset Password</h1>

            <Suspense fallback="loading">
                <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
            
        </div>
    );
};

export default ResetPasswordPage;