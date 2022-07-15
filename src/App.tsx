import React from 'react';
import { createTheme, WuiProvider } from '@welcome-ui/core';
import { Flex } from '@welcome-ui/flex'
import { Box } from '@welcome-ui/box'

import { Header } from './components/Header';
import { PullRequestList } from './components/PullRequestList';

const theme = createTheme();

function App() {
  return (
    <WuiProvider theme={theme}>
      <Flex justifyContent="center" wrap="wrap">
        <Box>
          <Header />
          <PullRequestList />
        </Box>
      </Flex>
    </WuiProvider>
  );
}

export default App;
