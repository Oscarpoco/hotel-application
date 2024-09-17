import React from 'react';
import '../Styling/Privacy.css';


export default function Privacy({handleOpenPrivacy}){

    

    return(
        <div className="privacy-layout">
            <div className='privacy'>
                <h1>Privacy Policy</h1>
                <h3>Effective Date: 7 September 2024</h3>

                <p>This Privacy Policy explains how Rest Hotely collects, uses, discloses, and safeguards your information when you use our website [yourwebsite.com], mobile application, and services (the "Service"). Please read this privacy policy carefully.</p>

                <h2>Information We Collect</h2>
                <h3>We may collect the following types of information:</h3>

                <p>Name, email address, phone number, profile picture, and payment information.</p>
                <p>Non-Personal Information: Browser type, device information, IP address, and other technical details.</p>
                <p>Cookies and Tracking Technologies: We may use cookies and other tracking technologies to improve user experience and gather analytics.</p>

                <h2>How We Use Your Information</h2>
                <h3>We use the information we collect for the following purposes:</h3>

                <p>To provide and maintain our Service.</p>
                <p>To process transactions and communicate with you.</p>
                <p>To improve our Service and customize user experience.</p>
                <p>To respond to customer service requests and provide technical support.</p>
                <p>To send periodic emails or updates related to the Service.</p>

                <h2>Sharing Your Information</h2>
                <h3>We may share your information with third parties in the following cases:</h3>

                <p>With service providers that help us operate our business.</p>
                <p>If required by law or legal process.</p>
                <p>In connection with the sale or merger of our company.</p>

                <h2>Data Security</h2>
                <h3>We use reasonable security measures to protect your information from unauthorized access, disclosure, or destruction. However, no security system is foolproof, and we cannot guarantee the absolute security of your data.</h3>

                <h2>Your Rights</h2>
                <h3>You have the right to:</h3>

                <p>Access, update, or delete your personal information.</p>
                <p>Opt-out of certain data collection practices.</p>
                
                <h2>Contact Us</h2>
                <h3>If you have any questions about this Privacy Policy, please contact us at resthot@support.co.za.</h3>


                <h1>Terms and Conditions</h1>
                <h3>Effective Date: 7 September 2024</h3>

                These Terms and Conditions ("Terms") govern your access to and use of the Rest Hotely website, mobile app, and services (the "Service"). By using the Service, you agree to comply with and be bound by these Terms.

                <h2>Use of the Service</h2>
                <h3>You agree to use the Service in compliance with all applicable laws and regulations. You may not use the Service to:</h3>

                <p>Engage in any unlawful or harmful activity.</p>
                <p>Distribute viruses, malware, or any other harmful code.</p>
                <p>Interfere with the security, integrity, or performance of the Service.</p>

                <h2>User Accounts</h2>
                <p>To use certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized access or use of your account.</p>

                <h3>Intellectual Property</h3>
                <p>All content, trademarks, and logos displayed on the Service are the property of rest hotely or third-party licensors. You may not reproduce, distribute, or create derivative works from the content without our prior written permission.</p>

                <h3>Termination</h3>
                <p>We may terminate or suspend your access to the Service at any time, for any reason, including if you violate these Terms. Upon termination, your right to use the Service will immediately cease.</p>

                <h3>Limitation of Liability</h3>
                <p>To the fullest extent permitted by law, Rest hotely will not be liable for any damages arising out of your use of the Service, including direct, indirect, incidental, or consequential damages.</p>

                <h3>Governing Law</h3>
                <p>These Terms are governed by the laws of South Africa, without regard to its conflict of law principles.</p>

                <h2>Contact Us</h2>
                <h3>If you have any questions about this Privacy Policy, please contact us at resthot@support.co.za.</h3>


                <h1>User Data Policy</h1>
                <h3>Effective Date: 7 September 2024</h3>

                <p> Rest Hotely values your privacy and is committed to safeguarding your personal data. This User Data Policy outlines how we collect, store, and use the data we receive from you.</p>

                <h2>Data Collection</h2>
                <h3>We collect user data to provide, operate, and improve our services. The data we collect includes:</h3>

                <p> Personal Identifiable Information (PII): Such as name, email address, and other information you provide when creating an account or using the Service.</p>
                <p>Usage Data: Information on how you interact with our website or app, including the pages you visit, the actions you take, and your preferences.</p>

                <h2>Data Usage</h2>
                <h3>The user data we collect is used for the following purposes:</h3>

                <p>To provide you with access to the Service.</p>
                <p>To personalize your experience on the platform.</p>
                <p>To improve and optimize our products and services.</p>
                <p>To send updates, notifications, or promotional content (you can opt out at any time).</p>

                <h2>Data Sharing and Third-Party Access</h2>
                <p>We may share your data with trusted third-party vendors who assist us in operating the Service. However, we do not sell or rent your personal data to third parties for their marketing purposes.</p>

                <h2>Data Storage and Retention</h2>
                <p>We store your data securely using industry-standard protocols. Your data will be retained for as long as your account is active or as needed to provide you with the Service. You may request the deletion of your data at any time by contacting us.</p>

                <h2>Data Rights</h2>
                <h3>You have the right to:</h3>

                <p>Access the personal data we hold about you.</p>
                <p>Request the correction or deletion of your data.</p>
                <p>Restrict or object to the processing of your data.</p>
                <p>Request that your data be exported to another service.</p>

                <h2>Changes to This Policy</h2>
                <p> We may update this User Data Policy from time to time. Any changes will be posted on this page, and the "Effective Date" will be updated.</p>

                <h2>Contact Us</h2>
                <h3>If you have any questions about this Privacy Policy, please contact us at resthot@support.co.za.</h3>
                <div className = "privacy-button"><button onClick={handleOpenPrivacy}>Return to the application</button></div>
            </div>
        </div>
    )
}