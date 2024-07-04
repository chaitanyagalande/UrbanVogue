import './Hero.css';
import hero_image from '../Assets/hero_shirt.png';

const scrollToLatestCollection = () => {
  const latestCollectionSection = document.getElementById('new-collections');
  if (latestCollectionSection) {
    latestCollectionSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>
          UrbanVogue: Where Style Meets Elegance
        </h2>
        <div className="hero-collections">
          <p>- Discover the latest trends in fashion at UrbanVogue.</p><br />
          <p>- Our curated collection combines modern aesthetics with timeless elegance, 
            ensuring you always look your best. Whether you're dressing up for a special occasion or 
            embracing casual chic, UrbanVogue has you covered.</p>
        </div>
        <div className="hero-latest-btn">
          <div onClick={scrollToLatestCollection}>New Collections</div>
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="fashion model" />
      </div>
    </div>
  );
};

export default Hero;
