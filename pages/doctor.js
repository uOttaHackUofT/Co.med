import React, { useState } from 'react';

const Quadrant = ({ title, children }) => (
  <div style={{ border: '1px solid black', padding: '10px' }}>
    <h2>{title}</h2>
    {children}
  </div>
);

const QuadrantPage = () => {
  const [quadrant1Content, setQuadrant1Content] = useState('');
  const quadrant2Content = 'This is patient data!';
  const quadrant3Content = `Triage Level: 0`;
  const [quadrant4Content, setQuadrant4Content] = useState('');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100vh' }}>
      <Quadrant title="Co:med Doctor View">
      </Quadrant>
      <Quadrant title="Patient Data">
        <div>{quadrant2Content}</div>
      </Quadrant>
    <Quadrant title="Recommended Triage Level">
        <div>{quadrant3Content}</div>
    </Quadrant>
    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
        <Quadrant title="Co:med Response">
            {/* Add content or components for the additional row here */}
        </Quadrant>
        <Quadrant title="Ask Co.med">
        <textarea
          value={quadrant4Content}
          onChange={(e) => setQuadrant4Content(e.target.value)}
        />
        </Quadrant>
    </div>
  </div>
  );
};

export default QuadrantPage;
