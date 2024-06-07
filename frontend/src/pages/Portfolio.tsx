import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getPortfolio } from '../services/api/portfolio';
import { getTopCryptos } from '../services/api/crypto';

interface PortfolioItem {
  id: number;
  name: string;
  logo: string;
  symbol: string;
  amount: number;
  history: { date: string, price: number, amount: number }[];
}

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  quote: {
    THB: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    };
  };
  logo: string;
  isFavorite: boolean;
}

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [currentPrices, setCurrentPrices] = useState<{ [symbol: string]: number }>({});
  const [selectedCrypto, setSelectedCrypto] = useState<PortfolioItem | null>(null);

  const handleCryptoClick = (crypto: PortfolioItem) => {
    setSelectedCrypto(crypto);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
        if (data.length > 0) {
          setSelectedCrypto(data[0]); // Set the first item as the selected crypto
        }
      } catch (error) {

      }
    };
    const fetchCurrentPrices = async () => {
      try {
        const data = await getTopCryptos();
        const prices = data.reduce((acc: { [key: string]: number }, crypto: Crypto) => {
          acc[crypto.symbol] = crypto.quote.THB.price;
          return acc;
        }, {});
        setCurrentPrices(prices);
      } catch (error) {
        console.error("Failed to fetch top cryptos:", error);
      }
    };

    fetchPortfolio();
    fetchCurrentPrices();
  }, []);

  const groupHistoryByDate = (history: { date: string, price: number, amount: number }[]) => {
    return history.reduce((acc, item) => {
      (acc[item.date] = acc[item.date] || []).push(item);
      return acc;
    }, {} as { [key: string]: { date: string, price: number, amount: number }[] });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return 'Today';
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const calculateProfitLossPercentage = (amount: number, purchasePrice: number, currentPrice: number) => {
    const profitLoss = ((currentPrice - purchasePrice) / purchasePrice) * 100;
    return Math.abs(profitLoss).toFixed(2);
  };

  return (
    <div className="pageContent">
      <div style={{ maxWidth: '1500px', width: '100%', padding: '20px 0' }}>
        <HStack bg='#1D1E29' w='100%' borderRadius='md' h='100%'>
          
          {/* Left side: Display list of cryptocurrencies */}
          <VStack spacing={4} w='30%' p={6} align='start' h='100%'>
            <Text fontWeight='700' fontSize='20px'>Your Cryptocurrencies</Text>
            {portfolio && portfolio.map((crypto) => (
              <Box shadow='lg' key={crypto.id} bg='#27293A' borderRadius='md' p={4} w='100%' onClick={() => handleCryptoClick(crypto)} cursor='pointer'>
                <HStack h='100%' align='start'>
                  <HStack spacing={2} w='50%' align='center'>
                    <img src={crypto.logo} alt={`${crypto.name} logo`} style={{ width: '32px', height: '32px' }} />
                    <Text fontWeight='bold'>{crypto.name}</Text>
                  </HStack>
                  <VStack w='50%' align='end'>
                    <Text textAlign='right' fontSize={'18px'} fontWeight='semibold'>{(crypto.amount).toFixed(2)} <span style={{ color: '#debfff', fontSize: '14px', fontWeight: '600' }} >{crypto.symbol}</span></Text>
                    <Text mt='auto' color='#debfff' fontSize={'14px'} fontWeight='semibold'>{(crypto.amount * crypto.history[0].price).toFixed(2)} THB</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
            {!portfolio &&(
              <Box shadow='lg' bg='#27293A' borderRadius='md' p={4} w='100%' cursor='pointer'>
                <HStack h='100%' align='start'>
                  <HStack spacing={2} w='100%' align='center'>
                    <Text fontWeight='bold'>No cryptocurrencies in your portfolio</Text>
                  </HStack>
                </HStack>
              </Box>
            )}
          </VStack>

          {/* Right side: Display history of selected cryptocurrency */}
          <VStack flex='1' p={6} bg='#1F2130' h='100%' minH={'60vH'}>
            {selectedCrypto ? (
              <>
                <HStack style={{ width: '100%' }} justify={'space-between'} align={'start'}>
                  <HStack>
                    <img src={selectedCrypto.logo} alt={`${selectedCrypto.name} logo`} style={{ width: '40px', height: '40px' }} />
                    <Text fontWeight='700' fontSize='22px'>{selectedCrypto.name}</Text>
                  </HStack>
                  <VStack align={'end'} pr={2}>
                    <Text>Current Balance</Text>
                    <Text fontWeight='700' fontSize='20px'>
                      {currentPrices[selectedCrypto.symbol] ? (
                        `${(selectedCrypto.amount * currentPrices[selectedCrypto.symbol]).toFixed(2)} THB`
                      ) : 'Loading...'}
                    </Text>
                  </VStack>
                </HStack>
                <Divider mt={2}></Divider>
                <VStack align='start' spacing={3} mt={4} w='100%'>
                  {Object.entries(groupHistoryByDate(selectedCrypto.history)).map(([date, histories], index) => (
                    <Box key={index} w='100%'>
                      <Text fontWeight='bold' mb={3}>{formatDate(date)}</Text>
                      {histories.map((history, idx) => (
                        <Box shadow='base' key={idx} bg='#27283A' borderRadius='md' p={4} w='100%' mb={2}>
                          <HStack justifyContent={'space-between'} align={'start'}>
                            <VStack align={'start'} justify={'start'}>
                              <HStack style={{ width: '100%' }} align={'center'}>
                                <img src={selectedCrypto.logo} alt={`${selectedCrypto.name} logo`} style={{ width: '24px', height: '24px' }} />
                                <Text fontWeight='700' fontSize='20px'>{selectedCrypto.name}</Text>
                              </HStack>
                              <Text style={{ color: '#debfff', fontSize: '14px', fontWeight: '600' }} >{history.amount} {selectedCrypto.symbol}</Text>
                            </VStack>
                            <VStack align={'end'}>
                              <Text style={{ color: currentPrices[selectedCrypto.symbol] > history.price ? '#93f997' : '#fe7a73', fontWeight: '600' }}>{calculateProfitLossPercentage(history.amount, history.price, currentPrices[selectedCrypto.symbol])}% {currentPrices[selectedCrypto.symbol] > history.price ? '▲' : '▼'}</Text>
                              <Text style={{ color: '#debfff', fontWeight: '600' }}>{(history.price * history.amount).toFixed(2)} THB</Text>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </VStack>
              </>
            ) : (
              <></>
            )}
          </VStack>
        </HStack>
      </div>
    </div>
  );
};

export default Portfolio;