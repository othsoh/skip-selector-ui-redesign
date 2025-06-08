import React from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Skip } from './types';
import { Layout } from './components';
import { SkipSelector } from './components/SkipSelector/SkipSelector';

function App() {
  const handleSkipSelect = (skip: Skip) => {
    console.log('Selected skip:', skip);
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SkipSelector
          postcode="NR32"
          area="Lowestoft"
          onSkipSelect={handleSkipSelect}
        />
      </Layout>
    </>
  );
}

export default App;
