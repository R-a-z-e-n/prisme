
import React, { useEffect, useRef, useState } from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon } from './IconComponents';

interface TryOnPageProps {
    setCurrentPage: (page: Page) => void;
    productImageUrl: string | null;
}

const TryOnPage: React.FC<TryOnPageProps> = ({ setCurrentPage, productImageUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    
    // The selected overlay is now determined by the prop. 
    // Fallback to a default image if no product is passed.
    const selectedOverlay = productImageUrl || 'https://i.imgur.com/k4p4c7H.png'; // Default sunglasses if no product is selected

    useEffect(() => {
        let stream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError("Could not access the camera. Please check permissions.");
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-full h-[calc(100vh-8rem)] bg-black">
            <button 
                onClick={() => setCurrentPage(productImageUrl ? 'shop' : 'home')} 
                className="absolute top-4 left-4 z-20 bg-white/50 p-2 rounded-full"
            >
                <ArrowLeftIcon className="h-6 w-6 text-black"/>
            </button>

            {error ? (
                <div className="flex items-center justify-center h-full text-white text-center p-4">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
                    {selectedOverlay && (
                         <img 
                            src={selectedOverlay}
                            alt="Product Try-On" 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-1/2 md:w-1/4"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TryOnPage;