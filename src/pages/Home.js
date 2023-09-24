import React from 'react';
import SubjectTable from '../components/subjecttable';
import { useTheme } from '../context/ThemeContext';


function Home() {
    const { theme } = useTheme();

    return (
        <div className={`flex justify-center h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>
            <div className="w-4/5">
                <SubjectTable/>
            </div>
        </div>
    );
}

export default Home;
