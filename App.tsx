import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SalonPage from './components/SalonPage';
import ShopPage from './components/ShopPage';
import VideoPage from './components/VideoPage';
import TryOnPage from './components/TryOnPage';
import OutfitGeneratorPage from './components/OutfitGeneratorPage';
import ProfilePage from './components/ProfilePage';
import SellerDashboardPage from './components/SellerDashboardPage';
import ChoicePage from './components/ChoicePage';
import CustomerLoginPage from './components/CustomerLoginPage';
import CustomerSignupPage from './components/CustomerSignupPage';
import SellerLoginPage from './components/SellerLoginPage';
import SellerSignupPage from './components/SellerSignupPage';
import MessagesPage from './components/MessagesPage';
import AIFitCheckPage from './components/AIFitCheckPage';
import CreateReelPage from './components/CreateReelPage';
import OrderPage from './components/OrderPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import AIChatStylistPage from './components/AIChatStylistPage';
import AIPersonalStylistPage from './components/AIPersonalStylistPage';
import AIBeautyAdvisorPage from './components/AIBeautyAdvisorPage';
import AIVirtualClosetPage from './components/AIVirtualClosetPage';
import AITrendAnalyzerPage from './components/AITrendAnalyzerPage';
import { Product } from './types';

export type Page = 
  // App Pages
  'home' | 'salon' | 'video' | 'order' | 'profile' | 'shop' | 'try-on' | 
  'outfit-generator' | 'streetwear' | 'trending' | 'top-salons' | 'seller-dashboard' |
  'messages' | 'fit-check' | 'create-reel' | 'product-details' | 'privacy-policy' | 
  'ai-chat-stylist' | 'ai-personal-stylist' | 'ai-beauty-advisor' | 'ai-virtual-closet' | 'trend-analyzer' |
  // Auth Pages
  'choice' | 'customer-login' | 'customer-signup' | 'seller-login' | 'seller-signup';

export type UserType = 'customer' | 'seller';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('choice');
  const [tryOnProductImageUrl, setTryOnProductImageUrl] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleSelectProductForTryOn = (imageUrl: string) => {
    setTryOnProductImageUrl(imageUrl);
    setCurrentPage('try-on');
  };

  const handleSelectProductForDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleLogin = (type: UserType) => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentPage('home');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentPage('choice');
  };

  const renderAppPages = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
      case 'salon':
      case 'top-salons':
        return <SalonPage setCurrentPage={setCurrentPage} />;
      case 'streetwear':
      case 'trending':
        return <ShopPage pageType={currentPage} onSelectProductForTryOn={handleSelectProductForTryOn} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
      case 'shop':
        return <ShopPage pageType={currentPage} onSelectProductForTryOn={handleSelectProductForTryOn} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
      case 'video':
        return <VideoPage setCurrentPage={setCurrentPage} onSelectProduct={handleSelectProductForDetails} />;
      case 'try-on':
        return <TryOnPage setCurrentPage={setCurrentPage} productImageUrl={tryOnProductImageUrl} />;
      case 'outfit-generator':
        return <OutfitGeneratorPage setCurrentPage={setCurrentPage} />;
      case 'ai-chat-stylist':
        return <AIChatStylistPage setCurrentPage={setCurrentPage} />;
      case 'ai-personal-stylist':
        return <AIPersonalStylistPage setCurrentPage={setCurrentPage} onSelectProductForTryOn={handleSelectProductForTryOn} />;
      case 'ai-beauty-advisor':
        return <AIBeautyAdvisorPage setCurrentPage={setCurrentPage} />;
      case 'ai-virtual-closet':
        return <AIVirtualClosetPage setCurrentPage={setCurrentPage} />;
      case 'trend-analyzer':
        return <AITrendAnalyzerPage setCurrentPage={setCurrentPage} />;
      case 'fit-check':
        return <AIFitCheckPage setCurrentPage={setCurrentPage} />;
      case 'create-reel':
        return <CreateReelPage setCurrentPage={setCurrentPage} />;
      case 'messages':
        return <MessagesPage setCurrentPage={setCurrentPage} />;
      case 'order':
        return <OrderPage setCurrentPage={setCurrentPage} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProductForTryOn={handleSelectProductForTryOn} onSelectProduct={handleSelectProductForDetails} />;
      case 'product-details':
        return selectedProduct ? <ProductDetailsPage product={selectedProduct} setCurrentPage={setCurrentPage} onSelectProductForTryOn={handleSelectProductForTryOn} /> : <HomePage setCurrentPage={setCurrentPage} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <ProfilePage setCurrentPage={setCurrentPage} userType={userType} handleLogout={handleLogout} />;
      case 'seller-dashboard':
        // Ensure only sellers can access this
        return userType === 'seller' ? <SellerDashboardPage setCurrentPage={setCurrentPage} /> : <HomePage setCurrentPage={setCurrentPage} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} wishlist={wishlist} toggleWishlist={toggleWishlist} onSelectProduct={handleSelectProductForDetails} />;
    }
  };
  
  const renderAuthPages = () => {
      switch (currentPage) {
          case 'choice':
            return <ChoicePage setCurrentPage={setCurrentPage} />;
          case 'customer-login':
            return <CustomerLoginPage setCurrentPage={setCurrentPage} handleLogin={() => handleLogin('customer')} />;
          case 'customer-signup':
            return <CustomerSignupPage setCurrentPage={setCurrentPage} handleSignup={() => handleLogin('customer')} />;
          case 'seller-login':
            return <SellerLoginPage setCurrentPage={setCurrentPage} handleLogin={() => handleLogin('seller')} />;
          case 'seller-signup':
            return <SellerSignupPage setCurrentPage={setCurrentPage} handleSignup={() => handleLogin('seller')} />;
          default:
            return <ChoicePage setCurrentPage={setCurrentPage} />;
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {isAuthenticated ? (
        <>
          <Header setCurrentPage={setCurrentPage} />
          <main className="flex-grow pt-16 pb-20">
            {renderAppPages()}
          </main>
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      ) : (
        <main className="flex-grow">
            {renderAuthPages()}
        </main>
      )}
    </div>
  );
};

export default App;