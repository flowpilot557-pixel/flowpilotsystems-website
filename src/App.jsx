import { Routes, Route } from 'react-router-dom'
import ParticleField from './components/ParticleField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import HandoverExample from './components/HandoverExample'
import WhatsIncluded from './components/WhatsIncluded'
import HermesSection from './components/HermesSection'
import ConnectedData from './components/ConnectedData'
import UseCases from './components/UseCases'
import Pricing from './components/Pricing'
import EarlyAdvantage from './components/EarlyAdvantage'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ApplyPage from './pages/ApplyPage'

function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <HandoverExample />
        <WhatsIncluded />
        <HermesSection />
        <ConnectedData />
        <UseCases />
        <Pricing />
        <EarlyAdvantage />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="bg-bg text-body">
      <ParticleField />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
    </div>
  )
}

export default App
