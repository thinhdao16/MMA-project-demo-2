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
            const response = await fetch('https://trading-stuff-be-iphg.vercel.app/post', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseCmt = await fetch('https://trading-stuff-be-iphg.vercel.app/comment', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseLike = await fetch("https://trading-stuff-be-iphg.vercel.app/favourite", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const responseProfle = await fetch("https://trading-stuff-be-iphg.vercel.app/user/me", {
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
            if (!responseProfle.ok) {
                throw new Error(`HTTP error! Status: ${responseLike.status}`);
            }
            const responseData = await response.json();
            const responseDataCmt = await responseCmt.json();
            const responseDataLike = await responseLike.json()
            const responseDataProfile = await responseProfle.json()
            setPostingPush(responseData.data.posts);
            setAllCmt(responseDataCmt.data.postingComments);
            setIsLiked(responseDataLike.data.favourite);
            setUserProfile(responseDataProfile)
            console.log(accessToken)
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <AuthContext.Provider
            value={{
                postingPush, setPostingPush, allCmt, setAllCmt, fetchAllData,
                singlePage, setSinglePage,isLiked, setIsLiked,accessToken ,setAccessToken,userProfile, setUserProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
