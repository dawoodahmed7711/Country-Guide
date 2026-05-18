import { useState , useEffect } from 'react'
import './App.css'

const hotspots = [
  {
    id: 1,
    desh: "Iceland",
    region: "Europe • Reykjavik",
    status: "Active",
    img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=80",
  },
  {
    id: 2,
    desh: "Singapore",
    region: "Asia • Singapore",
    status: "Stable",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
  },
  {
    id: 3,
    desh: "UAE",
    region: "Middle East • Abu Dhabi",
    status: "Growth",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
  },
  {
    id: 4,
    desh: "Norway",
    region: "Europe • Oslo",
    status: "Leader",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
];

function App() {
  const [input, setInput] = useState("Pakistan")
  const [country , setCountry] = useState(null)
  const [image  , setImage] = useState(null)

  
   const fetchcountry = async()=>{
     const API_KEY = "OpxRvNNbLEBnfXuDmYiADZLWfXlKsxFMbGQmIaTfP3vLaAtMR9eatK4P"; 
 
 
  const newres = await fetch(`https://api.pexels.com/v1/search?query=${input}&per_page=1`,
    {
      headers : {
        Authorization : 'OpxRvNNbLEBnfXuDmYiADZLWfXlKsxFMbGQmIaTfP3vLaAtMR9eatK4P'
      }
    }
  )
  const newresult = await newres.json()
    const response = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    const result= await response.json()
    setCountry(result[0])
    setImage(newresult.photos[0].src.large)
    console.log(newresult)
    console.log(result)
   }
   useEffect(()=>{
    fetchcountry()
   },[])


  return (
    <>
     <div className="page">
 
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🌐 <span>GeoScope</span></div>
        <ul className="nav-links">
          <li><a href="#" className="active">Discover</a></li>
          <li><a href="#">Regions</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Compare</a></li>
        </ul>
        <div className="nav-icons">
          <span>🌐</span>
          <span>⚙️</span>
          <span>👤</span>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="hero">
        <h1>Explore the <span className="highlight">Pulse</span> of Our Planet</h1>
        <p>Access real-time demographics, economic indicators, and cultural insights from every corner of the globe with our unified intelligence platform.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search any country..."
          spellCheck="false"
          value={input} 
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter") {
              fetchcountry()
            }
          }}/>
          <span></span>
          <button onClick={fetchcountry} className='search'><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
         
      </section>
 
      {/* MAIN SECTION */}
      <div className="main-section">
 
        {/* Featured Country */}
        <div className="featured-card">
          <img
            
          
        src={image}
            alt="Japan"
          />
          <div className="featured-info">
            <p className="featured-label">⭐ Featured Country</p>
            <h2>{country?.name.common}</h2>
            <div className="info-grid">
              <div className="info-item"><label>Capital</label><span>{country?.capital[0]}</span></div>
              <div className="info-item"><label>Currency</label><span>{Object.values(country?.currencies || {})[0]?.name} {Object.values(country?.currencies || {})[0]?.symbol}</span></div>
              <div className="info-item"><label>Continent</label><span>{country?.continents[0]}</span></div>
              <div className="info-item"><label>Timezone</label><span>{country?.timezones[0]}</span></div>
              <div className="info-item"><label>Population</label><span>{country?.population}</span></div>
              <div className="info-item"><label>Languages</label><span>{Object.values(country?.languages || {}).join(",")}</span></div>
            </div>
            <button className="btn">View Detailed Intelligence →</button>
          </div>
        </div>
 
        {/* Right Column */}
        <div className="right-col">
 
          {/* Economic Status */}
          <div className="side-card">
            <h3>📈 Economic Status</h3>
            <div className="stat-row"><span>GDP Growth</span><span className="stat-value blue">+1.4%</span></div>
            <div className="stat-row"><span>Inflation</span><span className="stat-value orange">3.2%</span></div>
            <div className="stat-row"><span>Unemployment</span><span className="stat-value blue">2.6%</span></div>
          </div>
 
          {/* Regional Hub */}
          <div className="side-card">
            <h3>🏛️ Regional Hub</h3>
            <p className="hub-text">Strategic importance in East Asian geopolitics and global trade.</p>
            <div className="avatar-row">
              <div className="avatar">👤</div>
              <div className="avatar">👤</div>
              <div className="avatar count">+12</div>
            </div>
          </div>
 
        </div>
      </div>
 
      {/* HOTSPOTS */}
      <section className="hotspots-section">
        <div className="hotspots-header">
          <div>
            <h2>Global Hotspots</h2>
            <p>Real-time data from trending regions</p>
          </div>
          <a href="#">View All Regions →</a>
        </div>
 
        <div className="hotspots-grid">
          {hotspots.map((country) => (
            <div className="hotspot-card" key={country.id}>
              <img src={country.img} alt={country.desh} />
              <div className="hotspot-body">
                <h4>{country.desh}</h4>
                <p>{country.region}</p>
                <div className="hotspot-footer">
                  <span className="status">{country.status}</span>
                  <span>ℹ️</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* FOOTER */}
      <footer>
        <div>
          <div className="logo">🌐 <span>GeoScope</span></div>
          <p className="footer-copy">© 2024 GeoScope Global Intelligence. Data-driven exploration.</p>
        </div>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">API Docs</a>
          <a href="#">Support</a>
        </div>
      </footer>
 
    </div>
    </>
  )
}

export default App
