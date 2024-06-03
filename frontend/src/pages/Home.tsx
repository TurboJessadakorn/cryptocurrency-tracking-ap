import React from 'react';
import CryptoList from '../components/CryptoList';
import { Box, Stack } from '@chakra-ui/react';

const Home: React.FC = () => {

  return (
    <div className="pageContent">
      <div style={{ maxWidth: '1400px', width: '100%', padding: '20px 0' }}>

        {/* <Box bg='#1F212F' w='100%' p={8} color='white' borderRadius='md' mb='30px'>
          <Stack spacing={'20px'}>
            <div>
              <h1 style={{ fontWeight: '700', fontSize: '25px' }}>Your Watch List</h1>
              <p style={{ marginTop: '5px', color: 'rgb(161, 167, 187)' }}>AAAAAAAAAAAAqqaaaaaa</p>
            </div>
          </Stack>
        </Box> */}

        <Box bg='#1F212F' w='100%' p={8} color='white' borderRadius='md'>
          <Stack spacing={'20px'}>
            <div>
              <h1 style={{ fontWeight: '700', fontSize: '25px' }}>Top 100 Cryptocurrency Prices</h1>
              <p style={{ marginTop: '5px', color: 'rgb(161, 167, 187)' }}>AAAAAAAAAAAAqqaaaaaa</p>
            </div>
            <CryptoList></CryptoList>
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default Home;
