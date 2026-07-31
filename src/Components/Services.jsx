import React from 'react'
import { FaCode, FaPaintBrush, FaPenNib, FaChartLine, FaMobileAlt, FaDatabase, FaShieldAlt, FaBullhorn } from 'react-icons/fa'

const servicesList = [
  {
    icon: <FaCode className="text-primary fs-2 mb-3" />,
    title: 'Web & Software Development',
    desc: 'Custom web apps, React/Node.js solutions, e-commerce stores, API integrations, and full-stack software development.'
  },
  {
    icon: <FaPaintBrush className="text-danger fs-2 mb-3" />,
    title: 'UI/UX & Product Design',
    desc: 'User interface design, Figma wireframing, mobile app designs, branding systems, and modern web graphics.'
  },
  {
    icon: <FaMobileAlt className="text-success fs-2 mb-3" />,
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS and Android apps using React Native, Flutter, and native mobile technologies.'
  },
  {
    icon: <FaChartLine className="text-warning fs-2 mb-3" />,
    title: 'Digital Marketing & SEO',
    desc: 'Search engine optimization, Google Ads campaigns, social media growth strategies, and conversion analytics.'
  },
  {
    icon: <FaPenNib className="text-info fs-2 mb-3" />,
    title: 'Content Writing & Translation',
    desc: 'SEO blog writing, technical documentation, copywriting, proofreading, and multilingual translations.'
  },
  {
    icon: <FaDatabase className="text-purple fs-2 mb-3" style={{ color: '#8e56ff' }} />,
    title: 'Data Science & Analytics',
    desc: 'Data visualization, machine learning models, Python scripting, business intelligence reports, and scraping.'
  },
  {
    icon: <FaBullhorn className="text-danger fs-2 mb-3" />,
    title: 'Branding & Social Media',
    desc: 'Logo creation, brand identity guidelines, ad creative design, and social media account management.'
  },
  {
    icon: <FaShieldAlt className="text-success fs-2 mb-3" />,
    title: 'Cybersecurity & DevOps',
    desc: 'Cloud deployment, AWS/Docker setups, server security audits, CI/CD pipelines, and infrastructure management.'
  }
]

const Services = () => {
  return (
    <div className="services-page py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row text-center mb-5" data-aos="fade-down">
          <div className="col-lg-8 mx-auto">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">Our Marketplace Services</span>
            <h1 className="display-6 fw-bold">Comprehensive Freelance Solutions</h1>
            <p className="text-muted">
              Discover top-rated talent across key tech, design, marketing, and creative disciplines ready for contract hiring.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {servicesList.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index} data-aos="fade-up" data-aos-delay={((index % 4) + 1) * 100}>
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 service-card hover-top">
                <div className="card-body p-0">
                  {service.icon}
                  <h5 className="fw-bold mb-2">{service.title}</h5>
                  <p className="text-muted small mb-0">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
