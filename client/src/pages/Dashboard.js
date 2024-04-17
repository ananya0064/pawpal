/*import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))


    console.log('filteredGenderedUsers ', filteredGenderedUsers)
    return (
        <>
            {user &&
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">

                            {filteredGenderedUsers && filteredGenderedUsers.map((genderedUser) =>
                                <TinderCard
                                    className="swipe"
                                    key={genderedUser.user_id}
                                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                    <div
                                        style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                                        className="card">
                                        <h3>{genderedUser.first_name}</h3>
                                    </div>
                                </TinderCard>
                            )}

                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default Dashboard

import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState([]);
    const [lastDirection, setLastDirection] = useState('');
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            });
            getUser();
        } catch (err) {
            console.log(err);
        }
    };

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

    const filteredGenderedUsers = genderedUsers.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id));

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers.length > 0 ? (
                                filteredGenderedUsers.map((genderedUser) =>
                                    <TinderCard
                                        className="swipe"
                                        key={genderedUser.user_id}
                                        onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                        <div
                                            style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                                            className="card">
                                            <h3>{genderedUser.first_name}</h3>
                                            {Additional user details can be displayed here}
                                        </div>
                                    </TinderCard>
                                )
                            ) : (
                                <div>No more users to swipe!</div>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;

import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState([]);
    const [lastDirection, setLastDirection] = useState('');
    const [loading, setLoading] = useState(true);
    const [swipedUsers, setSwipedUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            });
            getUser();
        } catch (err) {
            console.log(err);
        }
    };

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
        setSwipedUsers([...swipedUsers, swipedUserId]);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

    const filteredGenderedUsers = genderedUsers.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id) && !swipedUsers.includes(genderedUser.user_id));

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers.length > 0 ? (
                                filteredGenderedUsers.map((genderedUser) =>
                                    <TinderCard
                                        className="swipe"
                                        key={genderedUser.user_id}
                                        preventSwipe={['up', 'down']} // Only allow left and right swiping
                                        onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                        <div
                                            style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                                            className="card">
                                            <h3>{genderedUser.first_name}</h3>
                                            
                                        </div>
                                    </TinderCard>
                                )
                            ) : (
                                <div>No more users to swipe!</div>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;*/

import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState([]);
    const [lastDirection, setLastDirection] = useState('');
    const [loading, setLoading] = useState(true);
    const [swipedUsers, setSwipedUsers] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [filteredGenderedUsers, setFilteredGenderedUsers] = useState([]);

    const userId = cookies.UserId;

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: { userId }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);

    useEffect(() => {
        // Filter out already swiped users
        const filteredGenderedUsers = genderedUsers.filter(genderedUser => !swipedUsers.includes(genderedUser.user_id));
        setFilteredGenderedUsers(filteredGenderedUsers);
    }, [swipedUsers, genderedUsers]);

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            });
            getUser();
        } catch (err) {
            console.log(err);
        }
    };

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
        setSwipedUsers([...swipedUsers, swipedUserId]);
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="dashboard">
                    <ChatContainer user={user} />
                    <div className="swipe-container">
                        <div className="card-container">
                            {filteredGenderedUsers.length > 0 ? (
                                filteredGenderedUsers.map((genderedUser) =>
                                    <TinderCard
                                        className="swipe"
                                        key={genderedUser.user_id}
                                        preventSwipe={['up', 'down']} // Only allow left and right swiping
                                        onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                        onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                        <div
                                            style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                                            className="card">
                                            <h3>{genderedUser.first_name}</h3>
                                            {/* Additional user details can be displayed here */}
                                        </div>
                                    </TinderCard>
                                )
                            ) : (
                                <div>No more users to swipe!</div>
                            )}
                            <div className="swipe-info">
                                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;

