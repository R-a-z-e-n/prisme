import React from 'react';
import type { Page } from '../App';
import { ArrowLeftIcon } from './IconComponents';

interface PrivacyPolicyPageProps {
  setCurrentPage: (page: Page) => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <button onClick={() => setCurrentPage('profile')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black font-medium">
        <ArrowLeftIcon className="h-5 w-5"/>
        Back to Profile
      </button>
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy for Priisme</h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: 29/9/2025</p>

        <div className="prose max-w-none text-gray-700">
          <p>Welcome to Priisme ("we," "us," or "our"). We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This Privacy Policy explains how we collect, use, share, and protect your information when you use our mobile application, website, and related services (collectively, the "Services").</p>
          <p>By creating an account or using our Services, you agree to the collection and use of information in accordance with this policy.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">1. Information We Collect</h2>
          <p>We collect various types of information to provide and improve our Services for you.</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">a) Information You Provide to Us:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Information:</strong> When you register as a customer or a seller, we collect personal information such as your full name, email address, phone number, and a password.</li>
            <li><strong>Profile Information:</strong> You may choose to provide additional information for your public profile, such as a profile picture, location, and personal description.</li>
            <li><strong>User-Generated Content:</strong>
              <ul className="list-disc pl-5 mt-2">
                <li><strong>Photos and Videos:</strong> We collect images and videos you upload for features like AI Fit Check, Virtual AR Try-On, and when you Create a Reel. This may include images of your face and body.</li>
                <li><strong>Text and Preferences:</strong> We collect your inputs for our AI Outfit Generator, including style preferences, occasion, and preferred colors.</li>
              </ul>
            </li>
            <li><strong>Communications:</strong> We collect information when you communicate with other users through our messaging feature or contact our support team.</li>
            <li><strong>Reviews and Ratings:</strong> We collect any reviews or ratings you provide for products, salons, or beauticians.</li>
            <li><strong>Transaction Information:</strong> When you place an order or book a service, we collect details about the transaction, such as the products purchased, service details, shipping address, and date/time of the transaction. (Note: We use secure third-party payment processors and do not store your full credit card or financial details).</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">b) Information We Collect Automatically:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Usage Data:</strong> We collect information about how you interact with our Services, such as pages visited, features used, time spent on the app, and your interactions with content and other users.</li>
            <li><strong>Device Information:</strong> We collect information about the device you use to access our Services, including IP address, device model, operating system, unique device identifiers, and browser type.</li>
            <li><strong>Location Information:</strong> With your explicit consent, we may collect your precise geolocation data to help you find nearby salons and services. You can disable this permission at any time in your device settings.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">c) Cookies and Similar Technologies:</h3>
          <p>We use cookies and similar tracking technologies to track activity on our Services and hold certain information. This helps us personalize your experience, remember your preferences, and analyze our traffic.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">2. How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>To Provide and Maintain Our Service:</strong> To create and manage your account, process transactions, fulfill orders, and facilitate salon bookings.</li>
            <li><strong>To Power AI-Driven Features:</strong>
              <ul className="list-disc pl-5 mt-2">
                  <li>Your images are processed by our AI models to provide the AI Fit Check and enable the Virtual AR Try-On experience.</li>
                  <li>Your style preferences are used by our AI to generate personalized Outfit Suggestions.</li>
                  <li>Your profile information and preferences may be used to provide personalized Salon Service and Beautician Recommendations.</li>
              </ul>
            </li>
            <li><strong>To Personalize Your Experience:</strong> To show you relevant content, products, reels, and salon recommendations tailored to your interests.</li>
            <li><strong>For Communication:</strong> To send you service-related notifications, order updates, promotional messages (from which you can opt-out), and to respond to your inquiries.</li>
            <li><strong>For Analytics and Improvement:</strong> To understand our user base and usage patterns, allowing us to improve the functionality, design, and performance of our Services.</li>
            <li><strong>For Safety and Security:</strong> To detect and prevent fraud, spam, abuse, and other harmful activities, and to enforce our Terms of Service.</li>
            <li><strong>For Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-2">3. How We Share Your Information</h2>
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-2">
              <li><strong>With Salons, Beauticians, and Sellers:</strong> When you book a service or place an order, we share necessary information (like your name, contact details, and service/order details) with the respective service provider to facilitate the transaction.</li>
              <li><strong>With Service Providers and Partners:</strong> We work with third-party companies that help us operate our business, such as payment processors, delivery and logistics partners, cloud hosting services, and analytics providers. We only provide them with the information necessary to perform their services.</li>
              <li><strong>With AI Service Providers:</strong> To provide our AI-powered features, we may send your inputs (such as images or text prompts) to third-party AI service providers, like Google's Gemini API, for processing. These providers are bound by their own privacy policies and security obligations.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
              <li><strong>In Case of Business Transfer:</strong> If Priisme is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-6 mb-2">4. Your Rights and Choices</h2>
          <p>You have rights and choices regarding your personal information:</p>
          <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access and Update:</strong> You can review and update your account information at any time through your profile settings.</li>
              <li><strong>Device Permissions:</strong> You can manage permissions for camera, microphone, and location services through your mobile device's settings. Please note that disabling certain permissions may affect the functionality of some features.</li>
              <li><strong>Marketing Communications:</strong> You can opt out of receiving promotional emails or messages by following the unsubscribe instructions included in those communications.</li>
              <li><strong>Data Deletion:</strong> You can request the deletion of your account and associated data by contacting us. We will process your request subject to any legal or regulatory retention requirements.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-2">5. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. We use encryption, firewalls, and secure server facilities to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>
          
          <h2 className="text-xl font-bold mt-6 mb-2">6. Children's Privacy</h2>
          <p>Our Services are not intended for use by anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with personal data, please contact us.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">7. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. We encourage you to review this Privacy Policy periodically for any changes.</p>

          <h2 className="text-xl font-bold mt-6 mb-2">8. Contact Us</h2>
          <p>If you have any questions, concerns, or grievances regarding this Privacy Policy, please contact us at:</p>
          <p>Email: priism2025@gmail.com</p>
          <p>Grievance Officer: Chandu</p>
          <p>priisme@2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;