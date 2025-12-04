import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-12">Last Updated: 2025</p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <p className="text-xl text-slate-300 mb-8">
            Welcome to KRONEUS. By accessing this website or using our services, you agree to these Terms.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Use of the Website</h2>
          <p className="text-slate-300 mb-4">You agree not to:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Attack, disrupt or attempt to reverse-engineer our systems</li>
            <li>Use automated tools to scrape data without permission</li>
            <li>Misrepresent your identity or affiliation with KRONEUS</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Intellectual Property</h2>
          <p className="text-slate-300 mb-8">
            All branding, content, designs and technology described on this site belong to KRONEUS.
            You may not copy, distribute or reuse our materials without written consent.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Product Information</h2>
          <p className="text-slate-300 mb-8">
            SELA and all KRONEUS technologies are presented for information purposes.
            Use of our software requires a separate agreement, contract or pilot program approval.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">No Warranty</h2>
          <p className="text-slate-300 mb-4">The website is provided "as is." We do not guarantee that:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>The site will be error-free or uninterrupted</li>
            <li>Content is always accurate or complete</li>
            <li>The site is free of harmful elements</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Limitation of Liability</h2>
          <p className="text-slate-300 mb-4">KRONEUS is not responsible for:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Losses caused by website downtime</li>
            <li>Misuse or misinterpretation of content</li>
            <li>Errors, omissions or third-party interactions</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Third-Party Links</h2>
          <p className="text-slate-300 mb-8">
            Our website may link to external services or resources.
            KRONEUS is not responsible for the content or policies of those sites.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Changes to Terms</h2>
          <p className="text-slate-300 mb-8">
            Terms may be updated at any time.
            Continued use of the site signifies your acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  )
}
