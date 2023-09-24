import { useState } from "react";
import axios from 'axios';
import debounce from "lodash/debounce"

import { urls, baseURL } from "../settings/urls";


// used in the drop down to search users 
export default function useFriendTechUserList(){

    const [ userList, setUserList ] = useState([])

    const debounedSearch = debounce(async (twitterUsername) => {

        const url = `${baseURL}/friend-trader/${urls.friendTechUserList}/?twitterUsername=${twitterUsername}`;
        try {
            const userDataRes = await axios.get(url);
            console.log(userDataRes.data)
            setUserList(userDataRes.data);
            } catch (e) {
                console.log(e);
        }
    }, 300)

    return { userList, debounedSearch, setUserList }
}