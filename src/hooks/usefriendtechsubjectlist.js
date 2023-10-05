import { useState, useEffect, useRef } from "react";
import { debounce } from 'lodash'; 

import api from '../settings/api';


export default function useFriendTechSubjectList(){

    const [ subjects, setSubjects ] = useState([])
    const [ pageData, setPageData ] = useState({
      next: null,
      previous: null,
      count: null
    })
    const isLoadingRef = useRef(true);
    const pageDataRef = useRef(pageData);

    const getData = async () => {

        const url = `friend-trader/friend-tech-user/`;
        try {
            const userDataRes = await api.get(url);
            console.log(userDataRes)
            setSubjects(userDataRes.data.results);
            let nextPageData = {
              next: userDataRes.data.next,
              previous: userDataRes.data.previous,
              count: userDataRes.data.count
            }
            setPageData(nextPageData)
            isLoadingRef.current = false;
            } catch (e) {
                console.log(e);
        }
    }

    const fetchNextPage = async () => {
      
      // Lock fetching as soon as we start fetching the next page
      isLoadingRef.current = true;
      let newDataRes;
      try {
          console.log(pageDataRef.current.next)
          newDataRes = await api.get(pageDataRef.current.next);
          console.log(newDataRes.data);
          
          setSubjects(prevSubjects => {
            
            console.log(prevSubjects)
            console.log(newDataRes.data.results)
            
            return [...prevSubjects, ...newDataRes.data.results]
          });
          setPageData({
              next: newDataRes.data.next,
              previous: newDataRes.data.previous,
              count: newDataRes.data.count
          });
      } catch (e) {
          console.log(e);
      } finally {
            // Unlock fetching once done, regardless of success or failure
            isLoadingRef.current = false;
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
        console.log(pageData)
        const checkScrollPosition = debounce(() => {
          if (!isLoadingRef.current && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) && pageDataRef.current.next) {
              isLoadingRef.current = true; // Set the lock
              fetchNextPage();
          }
      }, 100);  // Debounce for 100ms
    
        window.addEventListener('scroll', checkScrollPosition);
        
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    

    return { subjects }
}