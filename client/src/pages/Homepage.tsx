import React, { useState } from 'react';
import { ChevronDown, FileText, Users, Globe, CheckCircle, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

const Homepage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes DAN different from traditional peer review?",
      answer: "DAN uses autonomous AI agents to provide fast, transparent, and reproducible research verification on-chain. Unlike traditional peer review which can take months, DAN provides immediate feedback with verifiable certificates stored as NFTs."
    },
    {
      question: "How does the AI verification process work?",
      answer: "Our AI agents analyze your research paper, code, and datasets for methodology soundness, reproducibility, and novelty. The entire process is automated and transparent, with all results recorded on the blockchain."
    },
    {
      question: "What types of research can I submit?",
      answer: "DAN accepts research papers across all scientific disciplines, especially those with accompanying code and datasets. We prioritize reproducible research with clear methodology and open-source components."
    },
    {
      question: "Are the verification certificates recognized?",
      answer: "DAN certificates are blockchain-based NFTs that provide verifiable proof of research quality and reproducibility. They're increasingly recognized by DAOs, funding organizations, and progressive research institutions."
    },
    {
      question: "How much does it cost to submit research?",
      answer: "Submission fees vary based on the complexity of your research and the level of verification required. Basic verification starts at a minimal gas fee, while comprehensive reproducibility checks may require additional costs."
    }
  ];

  const stats = [
    {
      icon: <FileText className="w-6 h-6" />,
      number: "2,500+",
      label: "Papers Verified",
      description: "Our platform has successfully verified over 2,500 research papers with reproducible results."
    },
    {
      icon: <Award className="w-6 h-6" />,
      number: "4.8/5",
      label: "Average Quality Score",
      description: "Researchers consistently produce high-quality, reproducible science on our network."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      number: "80+",
      label: "Countries",
      description: "Our network spans across continents, connecting researchers globally."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     <Navbar/>

      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Verifiable Science,
              <br />
              Simplified
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our autonomous AI agent network evaluates research quality, verifies reproducibility, and mints on-chain certificates—bringing transparency and trust to scientific research.
            </p>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute top-0 right-0 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
              Demo for free →
            </div>
            
            {/* Main Visual */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
              <div className="relative">
                {/* Glowing accent line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
                
                {/* Central Icon */}
                <div className="relative flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-40 h-40 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <Sparkles className="w-20 h-20 text-teal-400" />
                    </div>
                  </div>
                </div>

                {/* Mesh texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-4">
              <CheckCircle className="w-4 h-4 text-teal-500" />
              <span className="text-sm text-gray-600">Why us?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Thousands,
              <br />
              Engineered for Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to innovation and quality has earned the trust of researchers worldwide. 
              Built on blockchain technology, our platform ensures transparency and reproducibility.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 text-gray-700">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h4>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Timeless Elegance Section */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-[500px] md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <div className="relative">
                    {/* Certificate mockup */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm transform rotate-3 hover:rotate-0 transition-transform">
                      <div className="flex items-center justify-between mb-6">
                        <Award className="w-12 h-12 text-indigo-600" />
                        <span className="text-sm font-mono text-gray-500">#NFT-001</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Certificate</h3>
                      <p className="text-sm text-gray-600 mb-4">Quantum Computing Research</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Score:</span>
                          <span className="font-bold text-green-600">94/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Reproducible:</span>
                          <span className="font-bold text-green-600">✓ Yes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full w-fit mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">On-chain verification</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Blockchain-Backed
                  <br />
                  Credibility
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Elevate your research with verifiable on-chain certificates. Our AI agents provide transparent evaluation and mint NFT credentials that prove quality, reproducibility, and scientific rigor—credentials that travel with your work forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 mb-4">
              <span className="text-sm text-gray-600">Welcome to Beyond FAQ!</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Know
              <br />
              About DAN
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Get your research verified now!
              </h2>
              <p className="text-gray-600">Submit your paper and receive blockchain-backed certification</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-full"
            >
              Get Started - Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
            <Footer/>
    </div>
  );
};

export default Homepage;