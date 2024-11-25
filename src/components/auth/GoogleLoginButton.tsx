import React from 'react';

interface GoogleLoginButtonProps {
    onClick: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
            Login com Google
        </button>
    )
}