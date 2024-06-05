import React, { useEffect, useState } from 'react';
import { getTopCryptos } from '../services/api/crypto';
import { addPortfolioItem } from '../services/api/portfolio';
import CryptoItem from './CryptoItem';
import AddToPortfolioModal from './AddToPortfolioModal';
import {
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  quote: {
    THB: {
      price: number;
    };
  };
  logo: string;
}

const defaultCrypto: Crypto = {
  id: 0,
  name: 'Bitcoin',
  symbol: 'BTC',
  quote: {
    THB: {
      price: 0,
    },
  },
  logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
};

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>(Array(100).fill(defaultCrypto));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);

  const handleAddToPortfolio = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    onOpen();
  };

  const saveToPortfolio = async (amount: number, purchasePrice: number) => {
    const newItem = await addPortfolioItem(selectedCrypto!.name, amount, purchasePrice);
    console.log(newItem);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getTopCryptos();
      console.log(data)
      setCryptos(data);
    };
    // fetchCryptos();
  }, []);

  return (
    <Stack style={{ display: 'flex', flexDirection: 'column' }} spacing='12px'>
      <HStack>
        <Input size='sm' width='100%' maxWidth='500px' placeholder='Search crypto'></Input>
      </HStack>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Symbol</Th>
              <Th>Name</Th>
              <Th>Price (BAHT)</Th>
              <Th>Change 24h</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
          {cryptos && cryptos.map(crypto => (
            <CryptoItem key={crypto.id} crypto={crypto} onAdd={handleAddToPortfolio} />
          ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedCrypto && (
        <AddToPortfolioModal
          crypto={selectedCrypto}
          isOpen={isOpen}
          onClose={onClose}
          onSave={saveToPortfolio}
        />
      )}
    </Stack>
  );
};

export default CryptoList;
