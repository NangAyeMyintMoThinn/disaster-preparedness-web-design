import React from "react";
import "./HistoryPage.css";
import MainHeader from "../components/MainHeader";
import MainFooter from '../components/MainFooter';


const disasterData = [
  {
    title: "Extremely Severe Cyclonic Storm Nargis (2008)",
    images: ["/images/cyclone/6.jpg", "/images/cyclone/9.jfif", "/images/cyclone/3.jpg", "/images/cyclone/4.jpg", "/images/cyclone/5.jpg"],
    details: [
      "The category three cyclone Nargis struck Myanmar on 2nd and 3rd May 2008 with wind speeds of up to 200 km/h accompanied by heavy rain. The damage was most severe in the delta region, where the effects of the extreme winds were compounded by a 12-foot storm surge.",
      "On May 2 and 3, 2008, Cyclone Nargis made landfall near Yangon with winds of up to 200 km/h. The cyclone swept across the Irrawaddy River valley, causing a storm surge and heavy rain. The damage was most severe in the Irrawaddy Delta. The cyclone destroyed livelihoods and disrupted economic activities ",
      "An estimated 130,000 to 140,000 people died. 53,836 people were reported missing. 19,359 people were injured. 2.4 million people were severely affected. 800,000 people were displaced. The cyclone caused an estimated $4,057 million in damages",
      "The UN, ASEAN, and the Government of Myanmar formed a Tripartite Core Group to coordinate relief efforts. The TCG agreed to conduct a Post Nargis Joint Assessment to determine the full scale of the impact. It took more than two years for the areas struck by Cyclone Nargis to recover ",
      "In the 10 years since the storm, Myanmar has made significant progress on disaster preparedness. But the government's relationship with international and local relief agencies remains fraught - potentially putting future lives at risk.",
    ],
  },
  {
    title: "Floods in Myanmar",
    images: ["/images/floods/9.jpg","/images/floods/1.jfif", "/images/floods/2.jfif", "/images/floods/10.jpg", "/images/floods/4.jfif", "/images/floods/8.jpg"],
    details: [
        "In Myanmar, the threat of flooding usually occurs in three waves each year: June, August and late September to October with biggest danger arriving in August as peak monsoon rains occur around that time. In general, the catchment areas of major rivers in the north and central zone are prone to riverine floods.",
      "Heavy monsoon rains led to severe flooding, affecting over a million people. The disaster highlighted the importance of disaster preparedness and response. Infrastructure and homes were submerged, causing economic hardships.",
      "Riverine floods: These are the most common type of flood in Myanmar. They take place when the monsoon troughs or low pressure waves superimpose on the general monsoon pattern resulting in intense rainfall over significant strategic areas of the river catchments.",
      "In September 2024, Typhoon Yagi caused heavy rains and severe flooding across nine states and regions, including Southern and Eastern Shan, Kayah, Mandalay, Naypyidaw, Magway, Kayin, Bago, and Mon.",
      "As floodwaters spread they can threaten lives, inundate properties and businesses, destroy belongings, damage vital infrastructure and prevent access to essential public services. Often the effects of flood are long term and can be very costly, disruptive and distressing for communities involved.",
      "Be aware that floods can cause power outages; pollute drinking water systems; lead to crop loss; displace people from their homes; and damage homes, buildings and infrastructure.",
    ],
  },
  {
    title: "Earthquakes in Myanmar",
    images: ["/images/earthquake/1.jpg", "/images/earthquake/6.avif", "/images/earthquake/3.jpg", "/images/earthquake/4.jpg", "/images/earthquake/7.avif"],
    details: [
        "The seismotectonics of the region indicates that earthquakes in Myanmar mostly have originated along an active subduction zone (Andaman Megathrust Zone) in the west and along a large transform fault zone (Sagaing Fault Zone) in the middle part of the country.",
        "The Kyaukkyan Fault lies on the western Shan Plateau. The fault is the easternmost of a series of major, broadly north-south- trending Cenozoic structural features within Myanmar includ- ing the Indo-Myanmar Ranges, the Central Basin, the Sagaing Fault and the Shan Scarp Fault Zone (e.g. Hla Maung 1987).",
        "1930 Bago earthquake. An earthquake affected Myanmar on 5 May 1930 with a moment magnitude (Mw ) 7.4. The shock occurred 35 km (22 mi) beneath the surface with a maximum Rossi-Forel intensity of IX (Devastating tremor).",
      "Myanmar is seismically active, with significant earthquakes occurring in recent years. Building resilience and improved infrastructure are key to earthquake preparedness. Seismic activity has caused loss of life and damage to heritage sites.",
      "Along the western coast, offshore Rahkine State, the Sunda Megathrust, where the Indian plate dives beneath the Burma plate is capable of producing large events and tsunamis like the 2004 earthquake.",
    ],
  },
];

const HistoryPage = () => {
  return (
    <div className="history-page">
    <MainHeader/>

      {/* Disaster Section */}
      <section className="disaster-section">
        {disasterData.map((disaster, index) => (
          <div className="disaster-group" key={index}>
            <h2>{disaster.title}</h2>
            {disaster.images.map((image, i) => (
              <article className="disaster-card" key={i}>
                <img src={image} alt={`${disaster.title} - Image ${i + 1}`} />
                <div className="disaster-info">
                  <p>{disaster.details[i % disaster.details.length]}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </section>

      {/* Key Features Section */}
      <section className="key-features">
        <h2>Key Features of Disaster Management</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Early Warning Systems</h3>
            <p>Advanced technologies to forecast and alert communities.</p>
          </div>
          <div className="feature-item">
            <h3>Community Preparedness</h3>
            <p>Engaging locals to create disaster action plans.</p>
          </div>
          <div className="feature-item">
            <h3>Infrastructure Resilience</h3>
            <p>Building stronger structures to withstand disasters.</p>
          </div>
        </div>
      </section>

      <MainFooter/>
    </div>
  );
};

export default HistoryPage;
