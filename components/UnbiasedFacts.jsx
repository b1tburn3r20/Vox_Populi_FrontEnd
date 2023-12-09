'use client';

import { useState, useEffect } from 'react';

export default function UnbiasedFacts() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://voxium-af7be-default-rtdb.firebaseio.com/unbiased_political_facts.json');
      if (!response.ok) {
        console.error('Error fetching data');
        return;
      }
      const data = await response.json();
      setFacts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Unbiased Facts</h1>
      {facts.map((fact, index) => (
        <div key={index}>
          <h2>{fact.shortened}</h2>
          <p>{fact.summary}</p>
          <a href={fact.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
