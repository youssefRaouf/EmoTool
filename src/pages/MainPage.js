import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react"
import { getTweets } from '../Services/api.js';
import styled from "styled-components";
import Visualization from "../Components/Visualization"
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Label = styled.div`
    color: black;
    font-size: 20px;
    margin-left: 60px;
    margin-top: 10px;
    margin-bottom: -20px;
    align-self: flex-start;
    margin-right: 30px;
`;

const Tab = styled.div`
    cursor: pointer;
    font-size: 18px;
    color: black;
    margin: 10px 15px 10px 10px;
    display: flex;
    align-items: center;
    width: 201px;
    justify-content: center;
    padding-bottom: 3px;
`;

const LogoutBtn = styled.div`
    cursor: pointer;
    color: red;
    font-size: 18px;
    margin: 10px 10px 10px 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;        
`;

const MainPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [tweets, setTweets] = useState(location.state?.tweets || [])
    const [tab, setTab] = useState(0);
    const [duration, setDuration] = useState('week');
    const getTweetsForCachedUser = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).providerData[0].uid;
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenSecret = localStorage.getItem('accessTokenSecret');
        const response = await getTweets({
            userId,
            accessToken,
            accessTokenSecret
        })
        setTweets(response)
    }

    useEffect(() => {
        if (!location.state?.tweets) {
            getTweetsForCachedUser()
        }
    }, [location.state?.tweets])

    const TweetsByweek = useMemo(() => {
        const tweetsByweek = {
            labels: [format(addDays(new Date(), -6), "ccc"), format(addDays(new Date(), -5), "ccc"), format(addDays(new Date(), -4), "ccc"), format(addDays(new Date(), -3), "ccc"), format(addDays(new Date(), -2), "ccc"), format(addDays(new Date(), -1), "ccc"), format(new Date(), "ccc")],
            sadness: [0, 0, 0, 0, 0, 0, 0],
            anger: [0, 0, 0, 0, 0, 0, 0],
            fear: [0, 0, 0, 0, 0, 0, 0],
            joy: [0, 0, 0, 0, 0, 0, 0],
            surprise: [0, 0, 0, 0, 0, 0, 0],
            disgust: [0, 0, 0, 0, 0, 0, 0],
            neutral: [0, 0, 0, 0, 0, 0, 0],
        }
        tweets.forEach((tweet) => {
            const result = formatDistanceToNowStrict(
                new Date(tweet.date)
            )
            if (!result.includes('months') && !result.includes('years')) {
                if (result.includes('days')) {
                    const arr = result.split(' ')
                    if (arr[0] <= 6) {
                        tweetsByweek[tweet.label][6 - arr[0]] = tweetsByweek[tweet.label][6 - arr[0]] + 1
                    }
                } else {
                    tweetsByweek[tweet.label][6] = tweetsByweek[tweet.label][6] + 1
                }
            }
        })
        return tweetsByweek
    }, [tweets])

    const TweetsByMonth = useMemo(() => {
        const tweetsByMonth = {
            labels: [format(addDays(new Date(), -29), "d-L"), format(addDays(new Date(), -23), "d-L"), format(addDays(new Date(), -17), "d-L"), format(addDays(new Date(), -11), "d-L"), `${format(addDays(new Date(), -5), "d-L")}-now`],
            sadness: [0, 0, 0, 0, 0],
            anger: [0, 0, 0, 0, 0],
            fear: [0, 0, 0, 0, 0],
            joy: [0, 0, 0, 0, 0],
            surprise: [0, 0, 0, 0, 0],
            disgust: [0, 0, 0, 0, 0],
            neutral: [0, 0, 0, 0, 0],
        }
        tweets.forEach((tweet) => {
            const result = formatDistanceToNowStrict(
                new Date(tweet.date)
            )
            if (!result.includes('years') && !result.includes('months')) {
                if (result.includes('days')) {
                    const arr = result.split(' ')
                    if (arr[0] <= 5) {
                        tweetsByMonth[tweet.label][4] = tweetsByMonth[tweet.label][4] + 1
                    }
                    else if (arr[0] <= 11) {
                        tweetsByMonth[tweet.label][3] = tweetsByMonth[tweet.label][3] + 1
                    }
                    else if (arr[0] <= 17) {
                        tweetsByMonth[tweet.label][2] = tweetsByMonth[tweet.label][2] + 1
                    }
                    else if (arr[0] <= 23) {
                        tweetsByMonth[tweet.label][1] = tweetsByMonth[tweet.label][1] + 1
                    }
                    else {
                        tweetsByMonth[tweet.label][0] = tweetsByMonth[tweet.label][0] + 1
                    }
                } else {
                    tweetsByMonth[tweet.label][4] = tweetsByMonth[tweet.label][4] + 1
                }
            }
        })
        return tweetsByMonth
    }, [tweets])

    const TweetsByYear = useMemo(() => {
        const tweetsByYear = {
            labels: [format(addMonths(new Date(), -11), "L-Y"), format(addMonths(new Date(), -10), "L-Y"), format(addMonths(new Date(), -9), "L-Y"), format(addMonths(new Date(), -8), "L-Y"), format(addMonths(new Date(), -7), "L-Y"), format(addMonths(new Date(), -6), "L-Y"), format(addMonths(new Date(), -5), "L-Y"), format(addMonths(new Date(), -4), "L-Y"), format(addMonths(new Date(), -3), "L-Y"), format(addMonths(new Date(), -2), "L-Y"), format(addMonths(new Date(), -1), "L-Y"), format(new Date(), "L-Y")],
            sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            anger: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            joy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            disgust: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            neutral: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
        tweets.forEach((tweet) => {
            const result = formatDistanceToNowStrict(
                new Date(tweet.date)
            )
            if (!result.includes('years')) {
                if (result.includes('months')) {
                    const arr = result.split(' ')
                    tweetsByYear[tweet.label][11 - arr[0]] = tweetsByYear[tweet.label][11 - arr[0]] + 1
                } else {
                    tweetsByYear[tweet.label][11] = tweetsByYear[tweet.label][11] + 1
                }
            }
        })
        return tweetsByYear
    }, [tweets])

    const logout = useCallback(() => {
        localStorage.setItem('user', null)
        navigate('/')
    }, [navigate])

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };
    return (
        <div>
            <HeaderContainer>
                <Label>EmoTool</Label>
                <Tab onClick={() => setTab(0)} style={{ borderBottom: tab === 0 ? "1px solid red" : 0 }}>Home</Tab>
                <Tab onClick={() => setTab(1)} style={{ borderBottom: tab === 1 ? "1px solid red" : 0 }}>Filters</Tab>
                <Tab onClick={() => setTab(2)} style={{ borderBottom: tab === 2 ? "1px solid red" : 0 }}>Status</Tab>
                <LogoutBtn onClick={logout}>Logout</LogoutBtn>
            </HeaderContainer>
            {tab === 0 && <Visualization graphTweets={duration === "week" ? TweetsByweek : duration === "month" ? TweetsByMonth : TweetsByYear} duration={duration} handleDurationChange={handleDurationChange} />}
            {tab===1 && <div>Put filters here</div>}
            {tab===2 && <div>Put status here</div>}
        </div>
    );
}

export default MainPage;