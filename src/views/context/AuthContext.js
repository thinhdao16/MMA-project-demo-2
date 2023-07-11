import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../context/firebase';
import axios from 'axios';
// import { DataContext } from '../../pages/DataContext';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [buildings, setBuildings] = useState([]);
    const buildingsData = buildings.data;
    const [posting, setPosting] = useState([]);
    const [imgPostDraft, setImgPostDraft] = useState(null);
    const [allCmt, setAllCmt] = useState([]);
    const [isLiked, setIsLiked] = useState([]);
    const [chooseWant, setChooseWant] = useState([]);
    const [point, setPoint] = useState([]);
    const [isPendingUpdated, setIsPendingUpdated] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [reloadUserProfile, setReloadUserProfile] = useState(null);
    const [postingPush, setPostingPush] = useState([]);




    return (
        <AuthContext.Provider
            value={{
                postingPush, setPostingPush
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
