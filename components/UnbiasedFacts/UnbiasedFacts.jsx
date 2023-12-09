'use client';
import anime from 'animejs/lib/anime.es.js';
import './UnbiasedFactsWidget.css';
import { useState, useEffect } from 'react';

export default function UnbiasedFacts() {
  const [facts, setFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://voxium-af7be-default-rtdb.firebaseio.com/unbiased_political_facts.json');
      if (!response.ok) {
        console.error('Error fetching data');
        return;
      }
      const data = await response.json();
      setFacts(data);
      setCurrentFact(data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && facts.length > 0) {
      const animateFact = () => {
        // Fade out animation
        anime({
          targets: '.fact_container',
          opacity: 0,
          duration: 1000,
          easing: 'easeInOutQuad',
          complete: function () {
            // Change the fact after fade-out
            const nextIndex = (factIndex + 1) % facts.length;
            setCurrentFact(facts[nextIndex]);
            setFactIndex(nextIndex);

            // Fade in animation
            anime({
              targets: '.fact_container',
              opacity: 1,
              duration: 1000,
              easing: 'easeInOutQuad'
            });
          }
        });
      };

      // Interval to change the fact
      const interval = setInterval(animateFact, 6000); // Change every 6 seconds

      return () => clearInterval(interval);
    }
  }, [loading, facts, factIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Unbiased Facts</h1>
      <div className="fact_container" style={{ opacity: 0 }}>
        <p className="fact_contents">{currentFact.shortened}</p>
        <p className="fact_source">
          <a href={currentFact.url} target="_blank" rel="noopener noreferrer">
            Source: {currentFact.source}
          </a>
        </p>
      </div>
    </div>
  );
}
