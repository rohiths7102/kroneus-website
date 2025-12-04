import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last Updated: 2025</p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <p className="text-xl text-slate-300 mb-8">
            KRONEUS ("we", "our", "us") is committed to safeguarding your personal information. 
            This Privacy Policy explains how we collect, use and protect data when you interact with our website and services.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Information We Collect</h2>
          <p className="text-slate-300 mb-4">We may collect:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Your name, email address and contact details</li>
            <li>Information submitted in forms (demo requests, inquiries, partnerships)</li>
            <li>Technical information such as IP address, device type, browser data and analytics</li>
          </ul>
          <p className="text-slate-300 mb-8">We do not collect sensitive personal information unless voluntarily provided.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">How We Use Your Information</h2>
          <p className="text-slate-300 mb-4">Your data is used to:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Respond to inquiries and provide requested services</li>
            <li>Improve our website, products and security</li>
            <li>Send product updates, announcements or relevant notifications</li>
            <li>Maintain internal records, compliance and security monitoring</li>
          </ul>
          <p className="text-slate-300 mb-8">We do not sell or lease your personal information to third parties.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Data Sharing</h2>
          <p className="text-slate-300 mb-4">Data may be shared with:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Trusted service providers (hosting, analytics, communication tools)</li>
            <li>Regulatory authorities if required by law</li>
          </ul>
          <p className="text-slate-300 mb-8">All partners are obligated to maintain strict confidentiality and robust security controls.</p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Data Security</h2>
          <p className="text-slate-300 mb-4">KRONEUS applies industry-standard security measures, including:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Encryption in transit and at rest</li>
            <li>Strict access controls</li>
            <li>Zero Trust validation principles</li>
            <li>Continuous monitoring and anomaly detection</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Your Rights</h2>
          <p className="text-slate-300 mb-4">Depending on your region, you may request:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Access to your personal data</li>
            <li>Correction or deletion</li>
            <li>Restriction or objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p className="text-slate-300 mb-8">
            For requests, contact: <a href="mailto:security@kroneuszerotrust.com" className="text-cyan-400 hover:text-cyan-300">security@kroneuszerotrust.com</a>
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Policy Updates</h2>
          <p className="text-slate-300 mb-8">
            This policy may be updated to reflect legal or operational changes. The latest version will always appear on this page.
          </p>
        </div>
      </div>
    </div>
  )
}
