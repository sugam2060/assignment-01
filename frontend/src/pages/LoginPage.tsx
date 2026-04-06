import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuthStore } from '../store/authStore';
import { getMe } from '../api';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
    const { setUser } = useAuthStore();
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) return null;

    const handleSuccess = async () => {
        try {
            const meResponse = await getMe();
            if (meResponse.success && meResponse.user) {
                setUser(meResponse.user);
                navigate('/');
            } else {
                alert("Login successful but failed to fetch user info.");
            }
        } catch (err) {
            alert("An error occurred after login.");
        }
    };

    const handleError = (message: string) => {
        alert(message);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6 bg-slate-50">
            {/* Background Layering */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Modern architectural home"
                    className="w-full h-full object-cover grayscale opacity-20"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFnwJ7gCIF0aJcphhO85Zwr4MjGcno3YbmnQEMY5sPkSLOU4FYamUrZ3d0uV56v49hQ81vy66m3qc6n7yI_fUC35XkBgYOx-pamby9_NjePtv1fuq6qTQwJNr9yXSiTKcM8ldOVxGhur4QNpTVpeF2ASzLw1BpcuWztkam9XvoEh-PDFHMqhJtbbVGrLSyCrvOh_5DTqQzt_hdn_oH5EP8tupXJ5T34HfIDDcRSDNIyKRFNzEPGi2knLj6i4ruWA3NXCs6GWVuffk"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-slate-50/90 to-transparent"></div>
            </div>

            {/* Login Card Container */}
            <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden shadow-slate-900/5">
                {/* Left Side: Visual Narrative */}
                <div className="hidden md:block relative overflow-hidden group">
                    <img
                        alt="Luxury interior"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Nn2hr35WPVMkylSGeyJArDCR4huq3Dx-MWm-tw1Ly2EPWkw2IPfxt1314D0KNIYVkd7ToZvqLL18l0fCV_c813R7xAbFysfaNWgRkwFpj1POVfmyXfapX7HXBWw3jcllHuDmyzC_BaTrxDe349M16xAkcHzVCmhiW0RdY8DtfwVu6anh_t2B3aFGP4fPz8tqWSCD5PdPiTUSq63kPcYsrsDzuRGbi3uafcUUXE3V78kgCoWXTSk9Re16zc1lG70YV_UMC_OO4eM"
                    />
                    <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-blue-950/80 to-transparent">
                        <span className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-80">Editorial Access</span>
                        <h2 className="text-4xl font-extrabold tracking-tighter mb-4 leading-tight">Step into the extraordinary.</h2>
                        <p className="text-blue-100 text-lg font-medium opacity-90 max-w-sm">Curated listings for those who seek the peak of architectural excellence.</p>
                    </div>
                </div>

                {/* Right Side: Interaction (Form) */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-12">
                        <div className="text-2xl font-black text-blue-950 tracking-tighter mb-8">
                            The Estate
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-slate-600 font-medium">Please sign in to access your private consultations.</p>
                    </div>

                    <LoginForm onSuccess={handleSuccess} onError={handleError} />

                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Don't have an account? 
                            <a className="text-blue-800 font-bold hover:underline decoration-2 underline-offset-4 ml-1" href="/signup">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center relative z-10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">
                    © 2024 The Estate. Architectural Authority.
                </p>
            </footer>
        </main>
    );
};
