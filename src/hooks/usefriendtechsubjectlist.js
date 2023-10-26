import { useState, useEffect, useRef } from "react";
import { debounce } from 'lodash'; 

import api from '../settings/api';
import { useTheme } from "../context/ThemeContext";

export default function useFriendTechSubjectList(){

    const [ subjects, setSubjects ] = useState([])
    const [update, setUpdate] = useState(0); 
    const [ pageData, setPageData ] = useState({
      next: null,
      previous: null,
      count: null
    })
    const isLoadingRef = useRef(true);
    const pageDataRef = useRef(pageData);

    const { setShowLogin, user } = useTheme() 

    const getData = async () => {

        const url = `friend-trader/friend-tech-user/`;
        try {
            const userDataRes = await api.get(url);
            setSubjects(userDataRes.data.results);
            let nextPageData = {
              next: `${url}?page=${userDataRes.data.next}`,
              previous: `${url}/?page=${userDataRes.data.previous}`,
              count: userDataRes.data.count
            }
            setPageData(nextPageData)
            isLoadingRef.current = false;
            setUpdate(prev => prev + 1);
            } catch (e) {
                console.log(e);
        }
    }


    const toggleFavorite = async (subject) => {
      if (!user){
        setShowLogin(true)
        return
      }
      try{
        if (subject.is_watched){
          const watchRes = await api.delete(`/friend-trader/watchlist/remove-watch/`, {data: {friend_tech_user_id: subject.id}})
          setSubjects(prevSubjects =>{
              return prevSubjects.map(currSubject => currSubject.id === subject.id ? {...currSubject, is_watched: false} : currSubject
          )
          })
        } else{
          const watchRes = await api.post(`/friend-trader/watchlist/`, {friend_tech_user: subject.id})
          setSubjects(prevSubjects =>{
              return prevSubjects.map(currSubject => currSubject.id === subject.id ? {...currSubject, is_watched: true} : currSubject
          )
          })
        }
      }
      catch (e){
        console.log(e)
    }
    };


    const fetchNextPage = async () => {
      const url = `friend-trader/friend-tech-user/`;
      isLoadingRef.current = true;
      setUpdate(prev => prev + 1);  
      let newDataRes;
      try {
          newDataRes = await api.get(pageDataRef.current.next);
          setSubjects(prevSubjects => {
            return [...prevSubjects, ...newDataRes.data.results]
          });
          setPageData({
            next: `${url}?page=${newDataRes.data.next}`,
            previous: `${url}/?page=${newDataRes.data.previous}`,
            count: newDataRes.data.count
          });
      } catch (e) {
          console.log(e);
      } finally {
            isLoadingRef.current = false;
            setUpdate(prev => prev + 1); 
        }
    };

    
    useEffect(() => {
      getData()
      return () => {
        setSubjects([])
      }
    }, [])

    useEffect(() => {
      pageDataRef.current = pageData;
    }, [pageData]);

    useEffect(() => {
        const checkScrollPosition = debounce(() => {
          if (!isLoadingRef.current && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) && pageDataRef.current.next) {
              isLoadingRef.current = true;
              fetchNextPage();
          }
      }, 100);  // Debounce for 100ms
    
        window.addEventListener('scroll', checkScrollPosition);
        
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    

    return { subjects, isLoadingRef, toggleFavorite }
}