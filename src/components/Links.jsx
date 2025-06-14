import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { url: '/search', text: 'All' },
    { url: '/image', text: 'Images' },
    // { url: '/news', text: 'News' },
    // { url: '/videos', text: 'Videos' },
  ];

export const Links = () => {
    return (
        <div className="flex items-center mt-4 pb-2 space-x-6">
            {links.map(({ url, text }, index) =>(
                <NavLink key={index} exact to={url} className={(navData)=> navData.isActive ? "text-red-700 border-b-2 dark: text-red-300 border-red-700 pb-2" : null }>
                    {text}
                </NavLink>
            ))}
        </div>
    );
}