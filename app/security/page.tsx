import Link from 'next/link'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold text-white mb-4">Security</h1>
        <p className="text-slate-400 mb-12">Last Updated: 2025</p>

        <div className="prose prose-invert prose-cyan max-w-none">
          <p className="text-xl text-slate-300 mb-8">
            Security is the core foundation of KRONEUS. Our mission is to protect organizations operating 
            AI-powered systems through Zero Trust, continuous validation and intelligent enforcement.
          </p>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Security Principles</h2>
          
          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Zero Trust by Design</h3>
          <p className="text-slate-300 mb-8">
            Nothing is trusted by default — not users, devices or AI agents.
            Every request is authenticated, authorized and continuously verified.
          </p>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Defense in Depth</h3>
          <p className="text-slate-300 mb-8">
            Multiple independent layers safeguard data, infrastructure and agent behavior.
          </p>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Secure Development Lifecycle</h3>
          <p className="text-slate-300 mb-4">All KRONEUS technologies undergo:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Threat modeling</li>
            <li>Code review</li>
            <li>Automated testing</li>
            <li>Vulnerability scanning</li>
          </ul>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Encryption</h3>
          <p className="text-slate-300 mb-4">All data is encrypted:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>In transit (TLS 1.2+)</li>
            <li>At rest with secure cryptographic standards</li>
          </ul>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Access Control</h3>
          <p className="text-slate-300 mb-4">We enforce:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Least-privilege access</li>
            <li>Role-based permissions</li>
            <li>Multi-factor authentication across internal systems</li>
          </ul>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">Continuous Monitoring</h3>
          <p className="text-slate-300 mb-4">Our systems detect:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Anomalous behavior</li>
            <li>Unauthorized actions</li>
            <li>Policy violations</li>
            <li>Potential misuse by AI agents or integrated systems</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Responsible Disclosure</h2>
          <p className="text-slate-300 mb-8">
            If you discover a vulnerability, report it responsibly to:{' '}
            <a href="mailto:security@kroneuszerotrust.com" className="text-cyan-400 hover:text-cyan-300">
              security@kroneuszerotrust.com
            </a>
          </p>
          <p className="text-slate-300 mb-4">We will:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>Confirm receipt</li>
            <li>Investigate quickly</li>
            <li>Collaborate on remediation</li>
            <li>Acknowledge researchers where appropriate</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Incident Response</h2>
          <p className="text-slate-300 mb-4">KRONEUS maintains:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>A documented incident response plan</li>
            <li>Automated monitoring and alerting</li>
            <li>Containment and recovery procedures for security events</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Compliance Alignment</h2>
          <p className="text-slate-300 mb-4">We align with global best practices, including:</p>
          <ul className="text-slate-300 space-y-2 mb-8">
            <li>ISO 27001 cybersecurity standards</li>
            <li>NIST Zero Trust Architecture</li>
            <li>GDPR and international privacy regulations</li>
          </ul>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Commitment</h2>
          <p className="text-slate-300 mb-8">
            Security is not optional — it is the core of KRONEUS.
            We continuously improve our systems to maintain the highest standards of protection for AI-powered environments.
          </p>
        </div>
      </div>
    </div>
  )
}
