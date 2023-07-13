import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../context/firebase';
import axios from 'axios';
// import { DataContext } from '../../pages/DataContext';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [allCmt, setAllCmt] = useState([]);
    const [isLiked, setIsLiked] = useState([]);
    const [point, setPoint] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [reloadUserProfile, setReloadUserProfile] = useState(null);
    const [postingPush, setPostingPush] = useState([]);
    const [singlePage, setSinglePage] = useState([]);
    const [accessToken ,setAccessToken] = useState([]);
    //data global

    const fetchAllData = async (accessToken) => {
        try {
            const response = await fetch('https://f-home-be.vercel.app/posts', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseCmt = await fetch('https://f-home-be.vercel.app/allComment', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseLike = await fetch("https://f-home-be.vercel.app/getAllFavourite", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            if (!responseCmt.ok) {
                throw new Error(`HTTP error! Status: ${responseCmt.status}`);
            }
            if (!responseLike.ok) {
                throw new Error(`HTTP error! Status: ${responseLike.status}`);
            }
            const responseData = await response.json();
            const responseDataCmt = await responseCmt.json();
            const responseDataLike = await responseLike.json()
            setPostingPush(responseData.data.postings);
            setAllCmt(responseDataCmt.data.postingComments);
            setIsLiked(responseDataLike.data.favourite);

        } catch (error) {
            console.error(error);
        }
    }




    return (
        <AuthContext.Provider
            value={{
                postingPush, setPostingPush, allCmt, setAllCmt, fetchAllData,
                singlePage, setSinglePage,isLiked, setIsLiked,accessToken ,setAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
