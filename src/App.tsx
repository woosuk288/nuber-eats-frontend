import React from 'react';
import "./styles/styles.css";

import { ApolloProvider } from '@apollo/client';
import { client } from "./apollo";

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="bg-red-300">
      <h1 className="text-xl text-white">Hello Tailwind</h1>
    </div>
    </ApolloProvider>
  );
}

export default App;
