import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
    const { results, isLoading, getResults, searchTerm } = useResultContext();
    const location = useLocation();// gives you the ulr, ex: /news, /videos....

    useEffect(() => {
        if(searchTerm) {
            if(location.pathname == '/videos') {
                getResults(`/search/q=${searchTerm} videos`);
            }else {
                getResults(`${location.pathname}?q=${searchTerm}&lr=en-US&num=50`)//num=50 is the number of results
            }   
        }
    }, [searchTerm, location.pathname]);

    if(isLoading) {
        return <Loading />;
    }else {
        switch (location.pathname) {
            //default search
            case '/webdex':
                return (
                    <div className="flex flex-col  space-y-6 sm:px-56">
                        {results[0]?.map(({ link, title, description }, i) => (
                            <div key={i} className="max-w-3xl w-full">
                                <a href={link} target="_blank" rel="noreferrer">{/*noreferrer link type hides referrer information when the link is clicked, no analytics data*/}
                                    <p className="text-lg hover:underline dark:text-red-400 text-red-800">
                                        {title}
                                    </p>
                                    <div className="text-sm dark:text-gray-200 text-gray-700">
                                        {description && description?.length > 200 ? `${description.substring(0, 200)}...` : description}
                                    </div>
                                    <p className="text-sm dark:text-blue-300 text-blue-800">
                                        {link.length > 30 ? link.substring(0, 30) : link}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </div>
                );
            case '/search':
                return (
                    <div className="flex flex-col space-y-6 sm:px-56">
                        {results[0]?.items?.map(({ link, title, snippet, displayLink }, i) => (
                            <div key={i} className="max-w-3xl w-full">
                                <a href={link} target="_blank" rel="noreferrer">
                                    <p className="text-lg hover:underline dark:text-red-400 text-red-800">
                                        {title}
                                    </p>
                                    <div className="text-sm dark:text-gray-200 text-gray-700">
                                        {snippet && snippet?.length > 200 ? `${snippet.substring(0, 200)}...` : snippet}
                                    </div>
                                    <p className="text-sm dark:text-blue-300 text-blue-800">
                                        {displayLink}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </div>
                );
            case '/image':
                return (
                    <div className="flex flex-wrap justify-center items-center">
                        {results[0]?.items?.map(({ title, thumbnailImageUrl, originalImageUrl, contextLink, size }, i) => (
                            <a key={i} href={contextLink} target="_blank" rel="noreferrer" className="sm:p-3 p-5">
                                <img src={thumbnailImageUrl} alt={title} loading="lazy" />
                                <p className="w-36 break-words text-sm mt-2">
                                    {title}
                                </p>
                                <p className="text-xs text-gray-500">{size}</p>
                            </a>
                        ))}
                    </div>
                );
            case '/news':
                return (
                    <div className="flex flex-col space-y-6 sm:px-56">
                        {results[0]?.items?.map(({ link, title, snippet, displayLink }, i) => (
                            <div key={i} className="max-w-2xl w-full">
                                <a href={link} target="_blank" rel="noreferrer" className="hover:underline">
                                    <p className="text-lg dark:text-red-400 text-red-800">
                                        {title}
                                    </p>
                                    <div className="text-sm dark:text-gray-200 text-gray-700">
                                        {snippet}
                                    </div>
                                    <p className="text-sm dark:text-blue-300 text-blue-800">
                                        {displayLink}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </div>
                );
            case '/videos':
                return (
                    <div className="flex flex-wrap">
                        {results[0]?.items?.map(({ link, title }, i) => (
                            <div key={i} className="p-2">
                                {link && <ReactPlayer url={link} controls width="355px" height="200px"/>}
                                <p className="text-sm mt-2">{title}</p>
                            </div>  
                        ))}
                    </div>
                )
            default:
                return 'error!';
        }
    }
}