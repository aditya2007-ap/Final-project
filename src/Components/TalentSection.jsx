import React from 'react'
import { FaStar, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa'

const talentList = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Full Stack Engineer',
    rate: '₹1,200 / hr',
    rating: '4.9',
    reviews: '84',
    location: 'Bangalore, IN',
    img: '/team-01.webp',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS']
  },
  {
    name: 'Alexander Wright',
    role: 'UI/UX Product Designer',
    rate: '₹950 / hr',
    rating: '5.0',
    reviews: '62',
    location: 'Mumbai, IN',
    img: '/team-02.webp',
    skills: ['Figma', 'User Research', 'Mobile UI', 'Web Design']
  },
  {
    name: 'Priya Sharma',
    role: 'Python & ML Developer',
    rate: '₹1,500 / hr',
    rating: '4.8',
    reviews: '49',
    location: 'Delhi, IN',
    img: '/team-03.webp',
    skills: ['Python', 'PyTorch', 'FastAPI', 'Pandas']
  }
]

const TalentSection = () => {
  return (
    <div className="talent-section py-5 bg-white">
      <div className="container">
        {/* Section Title */}
        <div className="row text-center mb-5" data-aos="fade-down">
          <div className="col-lg-8 mx-auto">
            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">Featured Freelancers</span>
            <h2 className="display-6 fw-bold">Hire Top Vetted Talent</h2>
            <p className="text-muted">Explore top-rated professionals ready to tackle your complex projects.</p>
          </div>
        </div>

        {/* Talent Cards */}
        <div className="row g-4">
          {talentList.map((talent, index) => (
            <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <div className="card h-100 border rounded-4 p-4 shadow-sm hover-shadow transition">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={talent.img}
                    alt={talent.name}
                    className="rounded-circle object-fit-cover border border-2 border-primary-subtle"
                    style={{ width: '56px', height: '56px' }}
                  />
                  <div>
                    <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-1">
                      {talent.name} <FaCheckCircle className="text-primary fs-6" title="Verified Expert" />
                    </h5>
                    <span className="text-muted small">{talent.role}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 py-2 border-top border-bottom">
                  <span className="fw-bold text-color1">{talent.rate}</span>
                  <div className="d-flex align-items-center gap-1 text-warning small">
                    <FaStar /> <span className="fw-bold text-dark">{talent.rating}</span> ({talent.reviews})
                  </div>
                </div>

                <p className="small text-muted mb-3 d-flex align-items-center gap-1">
                  <FaMapMarkerAlt /> {talent.location}
                </p>

                <div className="d-flex flex-wrap gap-1 mb-4">
                  {talent.skills.map((skill, sIdx) => (
                    <span className="badge bg-light text-dark border me-1 mb-1" key={sIdx}>
                      {skill}
                    </span>
                  ))}
                </div>

                <button type="button" className="btn btn-outline-danger w-100 fw-bold rounded-pill">
                  View Full Profile &amp; Hire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TalentSection
