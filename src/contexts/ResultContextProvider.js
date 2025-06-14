import React, { createContext, useContext, useState } from 'react';

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
const ResultContext = createContext();

const baseUrl = 'https://google-search72.p.rapidapi.com';

//note all react components have children props, this allows use to wrap this around any components to send props down through
export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    //to get results for search by type: videos, images...
    const getResults = async (type) => {
        setIsLoading(true);
        
        let url = `${baseUrl}${type}`;
        
        // Handle image search specifically
        if (type.includes('/image')) {
            url = `${baseUrl}/imagesearch?q=${searchTerm}&gl=us&lr=lang_en&num=10&start=0`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'US',
                'X-RapidAPI-Host': 'google-search72.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_GOOGLE_API_KEY
            }
        });
        const data = await response.json();

        if (data.status === 'success') {
            setResults([data]);
        } else {
            setResults([]);
        }
        
        setIsLoading(false);
    }
    return (
            // Use a Provider to pass the current data to the tree below.
            // Any component can read it, no matter how deep it is.
            //render all child components, "those that are wrapped"
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);
