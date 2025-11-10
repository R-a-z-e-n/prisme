import React, { useState, useRef, useEffect } from 'react';
import { videos, allProducts } from '../services/mockData';
import type { Video, Comment, Product } from '../types';
import type { Page } from '../App';
import { HeartIcon, HeartFilledIcon, CommentIcon, ShareIcon, RepostIcon, PlusIcon, VolumeOffIcon, VolumeUpIcon, ShoppingCartIcon } from './IconComponents';

interface VideoPageProps {
  setCurrentPage: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

const CommentModal: React.FC<{ comments: Comment[], onClose: () => void }> = ({ comments, onClose }) => {
    return (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-end" onClick={onClose}>
            <div className="bg-white w-full rounded-t-2xl p-4 max-h-[60%]" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-center mb-4 border-b pb-2">Comments</h3>
                <div className="space-y-4 overflow-y-auto max-h-[40vh]">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3">
                            <img src={comment.avatarUrl} alt={comment.user} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-sm">{comment.user}</p>
                                <p className="text-gray-700">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-4 border-t pt-2">
                    <input type="text" placeholder="Add a comment..." className="w-full bg-gray-100 border-none rounded-full px-4 py-2 focus:ring-purple-500" />
                </div>
            </div>
        </div>
    );
};

const ShopTheLookModal: React.FC<{ productIds: number[], onClose: () => void, onSelectProduct: (product: Product) => void }> = ({ productIds, onClose, onSelectProduct }) => {
    const products = allProducts.filter(p => productIds.includes(p.id));
    
    return (
         <div className="absolute inset-0 bg-black/50 z-20 flex items-end" onClick={onClose}>
            <div className="bg-white w-full rounded-t-2xl p-4 max-h-[60%]" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-center mb-4 border-b pb-2">Shop The Look</h3>
                 <div className="space-y-4 overflow-y-auto max-h-[40vh]">
                    {products.length > 0 ? products.map(product => (
                        <div key={product.id} onClick={() => onSelectProduct(product)} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md"/>
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-gray-500">{product.price}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 py-4">No products featured in this video.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const VideoCard: React.FC<{ video: Video, isVisible: boolean, onCommentClick: (comments: Comment[]) => void, onShopClick: (productIds: number[]) => void }> = ({ video, isVisible, onCommentClick, onShopClick }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [reposted, setReposted] = useState(false);
    const [repostCount, setRepostCount] = useState(video.reposts);
    
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            videoRef.current?.play();
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setProgress(0);
            }
        }
    }, [isVisible]);
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const handleRepost = () => {
        setReposted(!reposted);
        setRepostCount(reposted ? repostCount - 1 : repostCount + 1);
    };
    
    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const { currentTime, duration } = videoRef.current;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        }
    };
    
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && videoRef.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            videoRef.current.currentTime = videoRef.current.duration * percentage;
        }
    };


    const formatCount = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };
    
    return (
        <div className="relative h-full w-full snap-start rounded-lg overflow-hidden">
            <video 
                ref={videoRef}
                src={video.videoUrl} 
                loop 
                playsInline
                className="w-full h-full object-cover"
                onClick={(e) => e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause() }
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="absolute bottom-2 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                <div className="flex items-center mb-2">
                    <img src={video.avatarUrl} alt={video.user} className="w-10 h-10 rounded-full border-2 border-white" />
                    <p className="ml-3 font-bold text-white">{video.user}</p>
                </div>
                <p className="text-white text-sm">{video.description}</p>
            </div>
            <div className="absolute bottom-20 right-2 flex flex-col items-center space-y-4 text-white">
                 <button onClick={handleLike} className="flex flex-col items-center">
                    {liked ? <HeartFilledIcon className="h-8 w-8 text-red-500" /> : <HeartIcon className="h-8 w-8" />}
                    <span className="text-xs font-semibold">{formatCount(likeCount)}</span>
                </button>
                 <button onClick={() => onCommentClick(video.comments)} className="flex flex-col items-center">
                    <CommentIcon className="h-8 w-8" />
                    <span className="text-xs font-semibold">{formatCount(video.commentsCount)}</span>
                </button>
                <button onClick={handleRepost} className="flex flex-col items-center">
                    <RepostIcon className={`h-8 w-8 transition-colors ${reposted ? 'text-green-400' : ''}`} />
                    <span className="text-xs font-semibold">{formatCount(repostCount)}</span>
                </button>
                 {video.videoProducts && video.videoProducts.length > 0 && (
                    <button onClick={() => onShopClick(video.videoProducts || [])} className="flex flex-col items-center bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <ShoppingCartIcon className="h-7 w-7" />
                    </button>
                )}
            </div>
            
            <button onClick={handleMuteToggle} className="absolute bottom-4 left-4 z-10 bg-black/40 p-2 rounded-full">
                {isMuted ? <VolumeOffIcon className="h-6 w-6 text-white" /> : <VolumeUpIcon className="h-6 w-6 text-white" />}
            </button>
            
            <div 
                ref={progressRef}
                onClick={handleSeek}
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30 cursor-pointer group"
            >
                <div 
                    style={{ width: `${progress}%` }}
                    className="h-full bg-white transition-all duration-100"
                />
            </div>

        </div>
    );
};


const VideoPage: React.FC<VideoPageProps> = ({ setCurrentPage, onSelectProduct }) => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [modalComments, setModalComments] = useState<Comment[]>([]);
    const [showShopModal, setShowShopModal] = useState(false);
    const [modalProducts, setModalProducts] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCommentClick = (comments: Comment[]) => {
        setModalComments(comments);
        setShowCommentModal(true);
    };

    const handleShopClick = (productIds: number[]) => {
        setModalProducts(productIds);
        setShowShopModal(true);
    }

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, clientHeight } = containerRef.current;
            const index = Math.round(scrollTop / clientHeight);
            setCurrentVideo(index);
        }
    };

    return (
        <div className="relative h-[calc(100vh-8rem)] bg-black">
            <button onClick={() => setCurrentPage('create-reel')} className="absolute top-4 right-4 z-10 bg-white/30 backdrop-blur-sm p-2 rounded-full">
                <PlusIcon className="h-6 w-6 text-white" />
            </button>
            <div ref={containerRef} onScroll={handleScroll} className="relative h-full w-full max-w-md mx-auto snap-y snap-mandatory overflow-y-scroll">
                {videos.map((video, index) => <VideoCard key={video.id} video={video} isVisible={index === currentVideo} onCommentClick={handleCommentClick} onShopClick={handleShopClick} />)}
            </div>
            {showCommentModal && <CommentModal comments={modalComments} onClose={() => setShowCommentModal(false)} />}
            {showShopModal && <ShopTheLookModal productIds={modalProducts} onClose={() => setShowShopModal(false)} onSelectProduct={onSelectProduct} />}
        </div>
    );
};

export default VideoPage;
