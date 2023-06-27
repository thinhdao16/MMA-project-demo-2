// import React, { createContext, useEffect, useState } from 'react';
// import { auth } from '../context/firebase';
// import axios from 'axios';
// // import { DataContext } from '../../pages/DataContext';

// export const AuthContext = createContext();

// export function AuthContextProvider({ children }) {
//     const [user, setUser] = useState({});
//     const [accessToken, setAccessToken] = useState('');
//     const [buildings, setBuildings] = useState([]);
//     const buildingsData = buildings.data;
//     const [posting, setPosting] = useState([]);
//     const [imgPostDraft, setImgPostDraft] = useState(null);
//     const [allCmt, setAllCmt] = useState([]);
//     const [isLiked, setIsLiked] = useState([]);
//     const [chooseWant, setChooseWant] = useState([]);
//     const [point, setPoint] = useState([]);
//     const [isPendingUpdated, setIsPendingUpdated] = useState(null);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [userProfile, setUserProfile] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [reloadUserProfile, setReloadUserProfile] = useState(null);
//     const [postingPush, setPostingPush] = useState([]);

//     const googleSignIn = async () => {
//         try {
//             await GoogleSignin.configure();
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             const token = await userInfo.idToken;
//             setAccessToken(token);
//             setUser(userInfo.user);
//         } catch (error) {
//             console.log('Google Sign-In Error:', error);
//         }
//     };


//     const logOut = () => {
//         signOut(auth);
//         // Clear local storage or handle logout logic
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             if (currentUser && currentUser.email) {
//                 currentUser.getIdToken().then((token) => {
//                     setAccessToken(token);
//                 });
//             }
//         });

//         const fetchData = async () => {
//             try {
//                 const storedBuildings = JSON.parse(
//                     await AsyncStorage.getItem('buildings')
//                 );
//                 const storedApartments = JSON.parse(
//                     await AsyncStorage.getItem('account_start')
//                 );
//                 const token = JSON.parse(
//                     await AsyncStorage.getItem('access_token')
//                 )?.data;

//                 if (storedBuildings) {
//                     setBuildings(storedBuildings);
//                 } else {
//                     axios
//                         .get('http://localhost:3000/getBuildings')
//                         .then((response) => {
//                             setBuildings(response.data);
//                             AsyncStorage.setItem(
//                                 'buildings',
//                                 JSON.stringify(response.data)
//                             );
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                         });
//                 }
//             } catch (error) {
//                 console.log('error', error);
//             }
//         };

//         fetchData();

//         return () => {
//             unsubscribe();
//         };
//     }, [reloadUserProfile]);

//     return (
//         <AuthContext.Provider
//             value={{
//                 setIsPendingUpdated,
//                 isPendingUpdated,
//                 selectedPost,
//                 setSelectedPost,
//                 point,
//                 setPoint,
//                 openModal,
//                 setOpenModal,
//                 userProfile,
//                 setUserProfile,
//                 reloadUserProfile,
//                 setReloadUserProfile,
//                 postingPush,
//                 setPostingPush,
//                 googleSignIn,
//                 logOut,
//                 user,
//                 accessToken,
//                 buildingsData,
//                 posting,
//                 setPosting,
//                 imgPostDraft,
//                 setImgPostDraft,
//                 allCmt,
//                 setAllCmt,
//                 isLiked,
//                 setIsLiked,
//                 chooseWant,
//                 setChooseWant,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }
