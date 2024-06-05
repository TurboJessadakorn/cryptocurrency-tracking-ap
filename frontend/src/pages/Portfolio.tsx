import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getPortfolio } from '../services/api/portfolio';

interface PortfolioItem {
  id: number;
  name: string;
  amount: number;
  history: { date: string, price: number }[];
}

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 1, name: 'Bitcoin', amount: 2, history: [{ date: '2024-01-01', price: 30000 }, { date: '2024-02-01', price: 32000 }, { date: '2024-02-01', price: 1700 }] },
    { id: 2, name: 'Ethereum', amount: 5, history: [{ date: '2024-01-01', price: 1500 }, { date: '2024-02-01', price: 1700 }] },
  ]);

  const [selectedCrypto, setSelectedCrypto] = useState<PortfolioItem | null>(null);

  const handleCryptoClick = (crypto: PortfolioItem) => {
    setSelectedCrypto(crypto);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      const data = await getPortfolio();
      setPortfolio(data);
    };

    fetchPortfolio();
  }, []);
  
  return (
    <div className="pageContent">
      <div style={{ maxWidth: '1500px', width: '100%', padding: '20px 0' }}>
        <HStack bg='#1D1E29' w='100%' borderRadius='md' h='100%'>
          <VStack spacing={4} w='30%' p={4} align='start' h='100%'>
            <Text fontWeight='700' fontSize='20px'>Your Cryptocurrencies</Text>
            {portfolio && portfolio.map((crypto) => (
              <Box shadow='md' key={crypto.id} bg='#27293A' borderRadius='md' p={4} w='100%' onClick={() => handleCryptoClick(crypto)} cursor='pointer'>
                <Text fontWeight='bold'>{crypto.name}</Text>
                <Text textAlign='right'>{crypto.amount}</Text>
                <Text mt='auto'>{crypto.history[crypto.history.length - 1].date}</Text>
              </Box>
            ))}
          </VStack>

          {/* Right side: Display history of selected cryptocurrency */}
          <VStack flex='1' p={4} bg='#1F2130' h='100%' minH={'60vH'}>
            {selectedCrypto ? (
              <>
                <div style={{ borderBottom: '1px solid white', width:'100%' }}>
                  <Text fontWeight='700' fontSize='20px'>{selectedCrypto.name} History</Text>
                </div>
                <VStack align='start' spacing={3} mt={4} w='100%'>
                  {selectedCrypto.history.map((entry, index) => (
                    <Box shadow='md' key={index} bg='#27293A' borderRadius='md' p={4} w='100%'>
                      <Text>{entry.date}</Text>
                      <Text>{entry.price} THB</Text>
                    </Box>
                  ))}
                </VStack>
              </>
            ) : (
              <Text>Select a cryptocurrency to see its history</Text>
            )}
          </VStack>
        </HStack>
      </div>
    </div>
  );
};

export default Portfolio;