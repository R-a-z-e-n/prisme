
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon } from './IconComponents';

interface CreateReelPageProps {
    setCurrentPage: (page: Page) => void;
}

const CreateReelPage: React.FC<CreateReelPageProps> = ({ setCurrentPage }) => {
    const [step, setStep] = useState<'record' | 'preview'>('record');
    const [isRecording, setIsRecording] = useState(false);
    const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    }, []);

    useEffect(() => {
        const startCamera = async () => {
            if (streamRef.current) return;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing media devices:", err);
                setError("Could not access camera/microphone. Please check permissions.");
            }
        };

        if (step === 'record') {
             startCamera();
        }

        return () => {
           if(step === 'record') {
             stopStream();
           }
        };
    }, [step, stopStream]);
    
    const handleStartRecording = () => {
        if (!streamRef.current) return;
        setIsRecording(true);
        const recordedChunks: Blob[] = [];
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            setVideoBlobUrl(URL.createObjectURL(blob));
            setStep('preview');
            stopStream();
        };
        mediaRecorderRef.current.start();
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    
    const handlePost = () => {
        alert("Reel posted successfully! (This is a demo)");
        setCurrentPage('video');
    };
    
    const handleRetake = () => {
        setVideoBlobUrl(null);
        setStep('record');
    }

    if (error) {
        return (
             <div className="p-4 md:p-8 text-center">
                 <button onClick={() => setCurrentPage('video')} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
                    <ArrowLeftIcon className="h-5 w-5"/>
                    Back to Reels
                </button>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="w-full h-[calc(100vh-4rem)] bg-black text-white flex flex-col items-center justify-center p-4">
           {step === 'record' && (
                <div className="relative w-full max-w-md h-full flex flex-col items-center justify-between">
                    <div className="w-full flex justify-start">
                        <button onClick={() => setCurrentPage('video')} className="bg-white/20 p-2 rounded-full">
                            <ArrowLeftIcon className="h-6 w-6"/>
                        </button>
                    </div>
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-auto max-h-[70%] rounded-lg object-cover transform -scale-x-100"></video>
                    <div className="p-4">
                        <button 
                            onClick={isRecording ? handleStopRecording : handleStartRecording} 
                            className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500' : 'bg-transparent'}`}
                            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                        >
                           {isRecording && <div className="w-8 h-8 bg-white rounded-md"></div>}
                        </button>
                    </div>
                </div>
           )}
           {step === 'preview' && videoBlobUrl && (
                <div className="w-full max-w-md h-full flex flex-col items-center gap-4">
                     <h2 className="text-2xl font-bold">Preview & Post</h2>
                    <video src={videoBlobUrl} autoPlay loop controls className="w-full h-auto max-h-[50%] rounded-lg"></video>
                    <textarea placeholder="Write a caption..." className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24" />
                    <div className="w-full grid grid-cols-2 gap-4">
                         <button onClick={handleRetake} className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700">
                            Retake
                        </button>
                        <button onClick={handlePost} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90">
                            Post
                        </button>
                    </div>
                </div>
           )}
        </div>
    );
};

export default CreateReelPage;
