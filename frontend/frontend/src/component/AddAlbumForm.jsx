import React, { useContext, useEffect, useState } from 'react';
import { addAlbum } from '../apis/album';
import axios from 'axios';
import { AlbumContext } from '../context/AlbumState';
import { userMusic } from '../apis/music';
import clsx from 'clsx';
import { UserContext } from '../context/UserState';

const AddAlbumForm = () => {
    const { userData } = useContext(UserContext)

    // Ensure userData is available before proceeding



    const { albums, setAlbums, musics, setMusics } = useContext(AlbumContext);
    const [albumName, setAlbumName] = useState("");
    const [userMusics, setUserMusics] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState([]);

    useEffect(() => {
        console.log(userData, "artist ko userdata updated");
    }, [userData, albumName]); // Log userData on change

    useEffect(() => {
        console.log(userMusics, "changed musics"); // Log when userMusics state updates
    }, [userMusics]);

    const toggleMusic = (name) => {
        if (!selectedMusic.includes(name)) {
            setSelectedMusic((prev) => [...prev, name]);
        } else {
            setSelectedMusic((prev) => prev.filter((f) => f !== name));
        }
    };

    useEffect(() => {
        const Music = async () => {
            try {
                const response = await userMusic({
                    userId: userData?.user?.id
                });
                setUserMusics(() => [...response.data.musics]);
                console.log(response, "my music");
            } catch (error) {
                console.log(error);
            }
        };
        Music();
    }, []);

    const handleAlbumForm = (e) => {
        e.preventDefault();
        const Album = async () => {
            console.log(userData, "userdatassss");
            try {
                const response = await addAlbum({
                    name: albumName,
                    musicIds: selectedMusic,
                    artistId: userData.user.id // Use userData from context
                });
                console.log(response, "albumform response");
                setAlbums((prev) => [
                    ...prev,
                    {
                        name: albumName,
                        user: userData?.user?.id,
                        musics: selectedMusic.map((music) => ({ name: music }))
                    }
                ]);
                console.log(albums, "album state value");
            } catch (error) {
                console.log(error);
            }
        };
        Album();
    };

    useEffect(() => {
        console.log(albums, "checking albums"); // Log albums state updates
    }, [albums]);

    return (
        <div>
            <form onSubmit={handleAlbumForm}>
                <input
                    onChange={(e) => setAlbumName(e.target.value)}
                    value={albumName}
                    className="border-2"
                    type="text"
                />
                <ul className="mb-8">
                    <h1>the music</h1>
                    {userMusics.map((music) => (
                        <li
                            className={clsx(
                                "cursor-pointer",
                                selectedMusic.includes(music.name) ? "text-red-600" : ""
                            )}
                            onClick={() => {
                                toggleMusic(music.name);
                            }}
                        >
                            {music.name}
                        </li>
                    ))}
                </ul>
                <button type="submit">Add Album</button>
            </form>
            <h1>selected songs</h1>
            <div className="mb-5">
                {selectedMusic.map((song, index) => (
                    <p key={index}>{song}</p>
                ))}
            </div>
        </div>
    );
};

export default AddAlbumForm;


// import React, { useContext, useEffect, useState } from 'react'
// import { addAlbum } from '../apis/album'
// import axios from 'axios'
// import { AlbumContext } from '../context/AlbumState'
// import { userMusic } from '../apis/music'
// import clsx from 'clsx'
// import { UserContext } from '../context/UserState'

// const AddAlbumForm = () => {
//     const { userData } = useContext(UserContext)
//     useEffect(() => {
//         console.log(userData, "userData updated");
//     }, [userData]);  // Ensure this logs when userData changes
//     if (!userData) {
//         return <div>Loading...</div> // Handle loading or wait for user data
//     }
//     const { albums, setAlbums, musics, setMusics } = useContext(AlbumContext)
//     const [albumName, setAlbumName] = useState("")
//     const [userMusics, setUserMusics] = useState([])
//     const [selectedMusic, setSelectedMusic] = useState([])
//     useEffect(() => {
//         console.log(userMusics)

//     }, [userMusics])
//     const toggleMusic = (name) => {
//         if (!selectedMusic.includes(name)) {
//             setSelectedMusic((prev) => [...prev, name])
//         }
//         else {
//             setSelectedMusic((prev) => prev.filter((f) => f !== name));



//         }

//     }
//     useEffect(() => {
//         const Music = async () => {
//             try {
//                 const response = await userMusic({
//                     userId: userData?.user?.id
//                 })
//                 setUserMusics(() => [...response.data.musics])
//                 console.log(response, "my music")

//             }
//             catch (error) {
//                 console.log(error)
//             }
//         }
//         Music()

//     }, [])
//     const handleAlbumForm = (e) => {
//         e.preventDefault()
//         const Album = async () => {
//             console.log(userData, "userdatassss")
//             try {
//                 const response = await addAlbum({
//                     name: albumName,
//                     musicIds: selectedMusic,
//                     artistId: userData.user.id

//                 })
//                 console.log(response, "albumform response")
//                 console.log(albums)
//                 setAlbums((prev) => [...prev, {
//                     name: albumName, user: localStorage.getItem("id"), musics: selectedMusic.map((music) => ({ name: music }))
//                 }])
//                 console.log(albums, "album state value")


//             }
//             catch (error) {
//                 console.log(error)
//             }
//         }
//         Album()

//     }
//     useEffect(() => {
//         console.log(albums, "checking albums")
//     }, [albums])

//     return (
//         <div>
//             <form onSubmit={handleAlbumForm}>
//                 <input onChange={(e) => setAlbumName(e.target.value)} value={albumName} className='border-2' type='text' />
//                 <ul className=' mb-8'>
//                     <h1>the music</h1>
//                     {userMusics.map((music) => (
//                         <li className={clsx("cursor-pointer", selectedMusic.includes(music.name) ? "text-red-600" : "")} onClick={() => { toggleMusic(music.name) }} >{music.name}</li>
//                     ))}
//                 </ul>
//                 <button type='submit'>Add Album</button>        </form>
//             <h1 >selected songs</h1>
//             <div className='mb-5'>
//                 {selectedMusic.map((song) => (<p>{song}</p>))}

//             </div>
//         </div>
//     )
// }

// export default AddAlbumForm