import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';

export const SignupPage: React.FC = () => {
    const handleSuccess = () => {
        window.location.href = '/login';
    };

    const handleError = (message: string) => {
        alert(message);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6 bg-surface">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-surface"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block opacity-40 grayscale-[20%]">
                    <img
                        alt="Modern architectural detail"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_vwGbhepRR0sr5h967gFEitoLKFBllKTdtvkWumDpbbL4cSfE_o8F7sW_aGr_dHKGEUw68s7C5kuGCRCClXfr7dQ-IEIrN-MF32961MSBehW-JFBdvcr3rQFDJA9tZYQIAFnD9lt3R5O1-LsPnDl0_Hu2kO0zzcRUtKO9zdYghpPFkzd8XRu4lxu_eKXrIw7P_cbjpS2TO0M_U9gVGBTybf9ZjaGB9FUIx5c16_JT_MtTRQfmG0gJnLuhN0NszGcvWJddr01w6VI"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-surface via-surface/60 to-transparent"></div>
                </div>
            </div>

            {/* Signup Card container */}
            <div className="w-full max-w-lg relative z-10">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-0 shadow-slate-900/5">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-blue-950 mb-3 tracking-tight">Create account</h1>
                        <p className="text-slate-500 font-medium">Join the most exclusive architectural network.</p>
                    </div>

                    <SignupForm onSuccess={handleSuccess} onError={handleError} />

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Already have an account? 
                            <a className="text-blue-800 font-bold hover:underline ml-1" href="/login">Log In</a>
                        </p>
                    </div>
                </div>

                {/* Footer-style Links */}
                <div className="mt-8 flex justify-center space-x-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                    <a className="hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
                    <a className="hover:text-blue-900 transition-colors" href="#">Contact Support</a>
                </div>
            </div>
        </main>
    );
};
