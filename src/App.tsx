import React from 'react';
import './index.css';
import { Skip } from './types';
import { Layout } from './components';
import { SkipSelector } from './components/SkipSelector/SkipSelector';

function App() {
  const handleSkipSelect = (skip: Skip) => {
    console.log('Selected skip:', skip);
  };

  return (
    <Layout>
      <SkipSelector
        postcode="NR32"
        area="Lowestoft"
        onSkipSelect={handleSkipSelect}
      />
    </Layout>
  );
}

export default App;
