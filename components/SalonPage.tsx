

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { topSalons, salonServices, availableTimeSlots, videos } from '../services/mockData';
import { getServiceSuggestions, getBeauticianSuggestions } from '../services/geminiService';
import type { Page } from '../App';
import type { Salon, Beautician, Video } from '../types';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon, VolumeOffIcon, VolumeUpIcon, HeartIcon } from './IconComponents';

const SalonCard: React.FC<{ salon: Salon, onSelect: () => void }> = ({ salon, onSelect }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={salon.imageUrl} alt={salon.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold">{salon.name}</h3>
            <p className="text-sm text-gray-500">{salon.location}</p>
            <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1 font-bold">{salon.rating}</span>
                <span className="ml-2 text-gray-600">({salon.reviews} reviews)</span>
            </div>
            <button onClick={onSelect} className="mt-4 w-full bg-rose-500 text-white py-2 rounded-lg font-semibold hover:bg-rose-600">
                View Details
            </button>
        </div>
    </div>
);

const Calendar: React.FC<{
    selectedDate: string | null;
    onDateSelect: (date: string) => void;
    availableDates: string[];
}> = ({ selectedDate, onDateSelect, availableDates }) => {
    const [viewDate, setViewDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const handlePrevMonth = () => {
        setViewDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1));
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            date.setHours(0, 0, 0, 0);
            const dateString = date.toISOString().split('T')[0];
            const isAvailable = availableDates.includes(dateString);
            const isPast = date < today;
            const isSelected = selectedDate === dateString;

            let buttonClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-colors ";
            if (isPast) {
                buttonClasses += "text-gray-400 cursor-not-allowed";
            } else if (isAvailable) {
                buttonClasses += isSelected ? "bg-rose-500 text-white font-bold" : "bg-rose-100 text-rose-800 hover:bg-rose-200";
            } else {
                 buttonClasses += "text-gray-400 cursor-not-allowed";
            }

            days.push(
                <button key={i} disabled={isPast || !isAvailable} onClick={() => onDateSelect(dateString)} className={buttonClasses}>
                    {i}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth}><ChevronLeftIcon className="h-6 w-6" /></button>
                <h3 className="font-bold text-lg">{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={handleNextMonth}><ChevronRightIcon className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {renderDays()}
            </div>
        </div>
    );
};

const VideoShoppingCard: React.FC<{ video: Video }> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const handleMouseEnter = () => {
        videoRef.current?.play().catch(e => console.error("Video play failed:", e));
    };
    const handleMouseLeave = () => {
        videoRef.current?.pause();
    };

    return (
        <div className="relative w-48 h-72 flex-shrink-0 bg-black rounded-lg overflow-hidden snap-start shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <video
                ref={videoRef}
                src={video.videoUrl}
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black/60 to-transparent w-full">
                <div className="flex items-center">
                    <img src={video.avatarUrl} alt={video.user} className="w-8 h-8 rounded-full border-2 border-white" />
                    <p className="ml-2 font-bold text-white text-sm truncate">{video.user}</p>
                </div>
                <p className="text-white text-xs mt-1 line-clamp-2">{video.description}</p>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="absolute top-2 right-2 z-10 bg-black/40 p-1 rounded-full">
                {isMuted ? <VolumeOffIcon className="h-4 w-4 text-white" /> : <VolumeUpIcon className="h-4 w-4 text-white" />}
            </button>
        </div>
    );
};


const SalonPage: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
    const [view, setView] = useState<'list' | 'booking' | 'confirmation'>('list');
    
    // Search State
    const [city, setCity] = useState('');
    const [locationRequested, setLocationRequested] = useState(false);
    
    // Booking State
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedBeautician, setSelectedBeautician] = useState<Beautician | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    // AI State
    const [isSuggestingServices, setIsSuggestingServices] = useState(false);
    const [serviceRecommendations, setServiceRecommendations] = useState<Array<{ serviceName: string; reason: string; }> | null>(null);
    const [isSuggestingBeauticians, setIsSuggestingBeauticians] = useState(false);
    const [suggestedBeauticianIds, setSuggestedBeauticianIds] = useState<number[]>([]);

    useEffect(() => {
        if (selectedService && selectedSalon) {
            const fetchSuggestions = async () => {
                setIsSuggestingBeauticians(true);
                setSuggestedBeauticianIds([]);
                const beauticianData = selectedSalon.beauticians.map(b => ({ id: b.id, name: b.name, specialty: b.specialty, rating: b.rating }));
                const suggestedIds = await getBeauticianSuggestions(selectedService, beauticianData);
                setSuggestedBeauticianIds(suggestedIds);
                setIsSuggestingBeauticians(false);
            };
            fetchSuggestions();
        }
    }, [selectedService, selectedSalon]);
    
    const sortedBeauticians = useMemo(() => {
        if (!selectedSalon) return [];
        if (suggestedBeauticianIds.length === 0) {
            return selectedSalon.beauticians;
        }
        return [...selectedSalon.beauticians].sort((a, b) => {
            const aIndex = suggestedBeauticianIds.indexOf(a.id);
            const bIndex = suggestedBeauticianIds.indexOf(b.id);
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });
    }, [selectedSalon, suggestedBeauticianIds]);

    const handleGetServiceRecommendations = async () => {
        setIsSuggestingServices(true);
        setServiceRecommendations(null);
        // In a real app, this profile would come from user data.
        const userProfile = "I'm a young professional looking for a trendy but low-maintenance style for a casual weekend.";
        const recommendations = await getServiceSuggestions(userProfile, salonServices);
        setServiceRecommendations(recommendations);
        setIsSuggestingServices(false);
    };

    const handleSelectSalon = (salon: Salon) => {
        setSelectedSalon(salon);
        setView('booking');
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset time when date changes
    }

    const handleConfirmBooking = () => {
        if (!selectedService || !selectedBeautician || !selectedDate || !selectedTime) {
            alert('Please complete all selections.');
            return;
        }
        setView('confirmation');
    };
    
    const handleReset = () => {
        setView('list');
        setSelectedSalon(null);
        setSelectedService(null);
        setSelectedBeautician(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setServiceRecommendations(null);
        setSuggestedBeauticianIds([]);
    };

    if (view === 'confirmation' && selectedSalon && selectedDate) {
        return (
            <div className="p-4 md:p-8 max-w-lg mx-auto text-center">
                 <h1 className="text-3xl font-bold mb-4 text-emerald-600">Booking Confirmed!</h1>
                 <div className="bg-white p-6 rounded-lg shadow-md text-left space-y-3">
                    <p><strong className="font-semibold">Salon:</strong> {selectedSalon.name}</p>
                    <p><strong className="font-semibold">Service:</strong> {selectedService}</p>
                    <p><strong className="font-semibold">Beautician:</strong> {selectedBeautician?.name}</p>
                    <p><strong className="font-semibold">Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong className="font-semibold">Time:</strong> {selectedTime}</p>
                 </div>
                 <button onClick={handleReset} className="mt-8 w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600">
                    Book Another Appointment
                </button>
            </div>
        );
    }
    
    if (view === 'booking' && selectedSalon) {
        return (
            <div className="p-4 md:p-8 max-w-2xl mx-auto">
                <button onClick={handleReset} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
                    <ArrowLeftIcon className="h-5 w-5"/>
                    Back to Salons
                </button>
                <h1 className="text-3xl font-bold mb-2">{selectedSalon.name}</h1>
                <p className="text-gray-500 mb-6">{selectedSalon.location}</p>

                <div className="space-y-6">
                    {/* Service Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                             <h2 className="text-xl font-semibold">1. Select a Service</h2>
                             <button onClick={handleGetServiceRecommendations} disabled={isSuggestingServices} className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 disabled:text-gray-400">
                                <SparklesIcon className={`h-5 w-5 ${isSuggestingServices ? 'animate-pulse' : ''}`} />
                                {isSuggestingServices ? 'Thinking...' : 'Get AI Recommendations'}
                             </button>
                        </div>
                        {serviceRecommendations && (
                            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4 space-y-2">
                                <h3 className="font-bold text-purple-800">✨ AI Suggestions For You:</h3>
                                {serviceRecommendations.map(rec => (
                                    <div key={rec.serviceName}>
                                        <p><strong className="font-semibold text-purple-700">{rec.serviceName}:</strong> <span className="text-purple-600">{rec.reason}</span></p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {salonServices.map(service => (
                                <button key={service.name} onClick={() => setSelectedService(service.name)} className={`p-4 border rounded-lg text-center font-medium ${selectedService === service.name ? 'bg-rose-500 text-white border-rose-500' : 'hover:border-rose-400'}`}>
                                    <service.icon className={`h-8 w-8 mx-auto mb-2 ${selectedService === service.name ? 'text-white' : 'text-rose-500'}`}/>
                                    {service.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Beautician Selection */}
                    {selectedService && (
                    <div>
                        <h2 className="text-xl font-semibold mb-3">2. Choose a Beautician</h2>
                         {isSuggestingBeauticians && <p className="text-center text-gray-500 mb-3">Finding the best beautician for you...</p>}
                         <div className="flex flex-wrap gap-4">
                            {sortedBeauticians.map(b => (
                                <button key={b.id} onClick={() => { setSelectedBeautician(b); setSelectedDate(null); setSelectedTime(null); }} className={`relative flex items-center gap-3 p-2 border rounded-full ${selectedBeautician?.id === b.id ? 'bg-rose-500 text-white border-rose-500' : 'hover:border-rose-400'}`}>
                                    {suggestedBeauticianIds.includes(b.id) && (
                                        <span className="absolute -top-2 -right-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">Recommended ✨</span>
                                    )}
                                    <img src={b.imageUrl} alt={b.name} className="w-10 h-10 rounded-full" />
                                    <div className="text-left">
                                        <p className="font-semibold">{b.name}</p>
                                        <div className={`flex items-center space-x-1 text-xs ${selectedBeautician?.id === b.id ? 'text-rose-100' : 'text-gray-500'}`}>
                                            <span>{b.specialty}</span>
                                            <span>•</span>
                                            <span className="text-yellow-400">⭐</span>
                                            <span className="font-bold">{b.rating}</span>
                                            <span>({b.reviews})</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                    
                    {/* Date & Time Slot Selection */}
                    {selectedBeautician && (
                         <div>
                            <h2 className="text-xl font-semibold mb-3">3. Select Date & Time</h2>
                            <Calendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                                availableDates={selectedBeautician.availableDates}
                            />
                            {selectedDate && (
                                <div className="mt-4">
                                    <h3 className="font-semibold mb-3">Available times for {new Date(selectedDate).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric' })}:</h3>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {availableTimeSlots.map(slot => (
                                            <button key={slot.time} onClick={() => setSelectedTime(slot.time)} className={`relative p-3 border rounded-lg font-medium ${selectedTime === slot.time ? 'bg-rose-500 text-white border-rose-500' : 'hover:border-rose-400'}`}>
                                                {slot.time}
                                                {slot.demand === 'high' && <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">Popular</span>}
                                                {slot.demand === 'low' && <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">Quiet</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button onClick={handleConfirmBooking} disabled={!selectedTime} className="mt-8 w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 disabled:bg-gray-400">
                    Confirm Booking
                </button>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 space-y-12">
            <section>
                <h1 className="text-3xl font-bold text-center">Find a Salon Near You</h1>

                {!locationRequested && (
                     <div className="text-center my-8">
                        <button 
                            onClick={() => setLocationRequested(true)} 
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                        >
                            Use Current Location or Enter City
                        </button>
                    </div>
                )}

                {locationRequested && (
                    <div className="my-8 max-w-md mx-auto">
                        <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g., New York" 
                            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                )}
            </section>

             <section onClick={() => setCurrentPage('ai-beauty-advisor')} className="cursor-pointer group bg-gradient-to-br from-rose-400 to-orange-500 p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow text-center">
                <HeartIcon className="h-10 w-10 mx-auto mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-bold text-2xl">AI Beauty Advisor</h3>
                <p className="text-sm opacity-90 mt-1">Get personalized skincare & haircare advice before you book.</p>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Top Salons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topSalons.map(salon => <SalonCard key={salon.id} salon={salon} onSelect={() => handleSelectSalon(salon)} />)}
                </div>
            </section>

             <section>
                <h2 className="text-2xl font-bold mb-4">Video Shopping</h2>
                <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory -mx-4 px-4">
                    {videos.slice(0, 3).map(video => <VideoShoppingCard key={video.id} video={video} />)}
                </div>
            </section>
        </div>
    );
};

export default SalonPage;
