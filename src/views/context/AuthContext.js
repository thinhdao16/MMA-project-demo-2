import React, { createContext, useEffect, useState } from "react";
import { auth } from "../context/firebase";
import axios from "axios";
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
    const [accessToken, setAccessToken] = useState([]);
    const [postingPushHidden, setPostingPushHidden] = useState([]);
    const [postingPushPublished, setPostingPushPublished] = useState([]);
    const [postingPushLimited, setPostingPushLimited] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [auctionData, setAuctionData] = useState([])
    //data global

    const fetchAllData = async (accessToken) => {
        try {
            setIsLoading(true); // Bắt đầu quá trình tải dữ liệu
            console.log("do")
            const response = await fetch(
                "https://trading-stuff-be-iphg.vercel.app/post",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const responseCmt = await fetch(
                "https://trading-stuff-be-iphg.vercel.app/comment",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const responseLike = await fetch(
                "https://trading-stuff-be-iphg.vercel.app/favourite",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const responseProfile = await fetch(
                "https://trading-stuff-be-iphg.vercel.app/user/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                setPostingPush(responseData.data.posts);
                setPostingPushHidden(
                    responseData.data.posts?.filter((post) => post.status === "hidden")
                );
                setPostingPushPublished(
                    responseData.data.posts?.filter((post) => post.status === "published")
                );
                setPostingPushLimited(
                    responseData.data.posts?.filter((post) => post.status === "limited")
                );
                if (Array.isArray(responseData.data.posts)) {
                    setAuctionData(responseData.data.posts.filter((post) => post.typePost === "auction"));
                } else {
                    setAuctionData([]);
                }
            } else {
                console.error(`HTTP error Post! Status: ${response.status}`);
            }

            if (responseCmt.ok) {
                const responseDataCmt = await responseCmt.json();
                setAllCmt(responseDataCmt.data.postingComments);
            } else {
                console.error(`HTTP error Comment! Status: ${responseCmt.status}`);
            }

            if (responseLike.ok) {
                const responseDataLike = await responseLike.json();
                setIsLiked(responseDataLike.data);
            } else {
                console.error(`HTTP error Like! Status: ${responseLike.status}`);
            }

            if (responseProfile.ok) {
                const responseDataProfile = await responseProfile.json();
                setUserProfile(responseDataProfile);
            } else {
                console.error(`HTTP error Profile! Status: ${responseProfile.status}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Kết thúc quá trình tải dữ liệu
        }
    };


    return (
        <AuthContext.Provider
            value={{
                postingPush,
                setPostingPush,
                allCmt,
                setAllCmt,
                fetchAllData,
                singlePage,
                setSinglePage,
                isLiked,
                setIsLiked,
                accessToken,
                setAccessToken,
                userProfile,
                setUserProfile,
                postingPushHidden,
                setPostingPushHidden,
                postingPushPublished,
                setPostingPushPublished,
                postingPushLimited,
                setPostingPushLimited,
                isLoading,
                setIsLoading,
                auctionData, setAuctionData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
