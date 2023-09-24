import { useState, useEffect } from "react";

import api from '../settings/api';

export default function useFriendTechSubjectList(){

    const [ subjects, setSubjects ] = useState([])

    const getData = async () => {

        const url = `friend-trader/friend-tech-user/`;
        try {
            const userDataRes = await api.get(url);
            console.log(userDataRes.data)
            setSubjects(userDataRes.data.results);
            } catch (e) {
                console.log(e);
        }
    }
    
    useEffect(() => {
      getData()
    
      return () => {
        setSubjects([])
      }

    }, [])
    

    return { subjects }
}