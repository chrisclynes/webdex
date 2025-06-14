import React from 'react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <div className="text-center p-10 mt-10 border-t dark:border-gray-700 border-gray-200 whitespace-nowrap sticky top-[100vh]">
            <h1>{currentYear} WebDex, Inc.</h1>
        </div>
    );
}