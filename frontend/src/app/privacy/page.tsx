import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="card prose prose-slate">
        <p>
          At VoteSmart India, we respect your privacy. This application does not store personal data or voter identity information. 
          All EPIC lookup requests are processed in real-time and not logged. We use minimal cookies only to remember your language 
          preferences for a better user experience.
        </p>
      </div>
    </div>
  );
}
