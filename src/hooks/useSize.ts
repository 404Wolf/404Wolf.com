import { useState, useEffect } from 'react';

const useSize = (): [number, number] => {
    const [windowWidth, setWindowWidth] = useState(null);
    const [windowHeight, setWindowHeight] = useState(null);    

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);
    
    return [windowWidth, windowHeight]
}
 
export default useSize;