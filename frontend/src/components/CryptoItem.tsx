import React from 'react';
import styled from 'styled-components';
import {
  Tr,
  Td,
  Button,
  HStack,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

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
  isFavorite: boolean;
}

interface CryptoItemProps {
  crypto: Crypto;
  onAdd: (crypto: Crypto) => void;
  onToggleFavorite: (id: number) => void;
}

const CryptoItem: React.FC<CryptoItemProps> = ({ crypto, onAdd, onToggleFavorite }) => {


  return (
    <>
      <Td>
          <StarIcon onClick={() => onToggleFavorite(crypto.id)} color={crypto.isFavorite ? 'yellow' : 'gray'} cursor={'pointer'}></StarIcon>
      </Td>
      <Td>
      <HStack spacing={2}>
          <img src={crypto.logo} alt={`${crypto.name} logo`} style={{ width: '32px', height: '32px' }} />
          <p>{crypto.symbol}</p>
        </HStack>
      </Td>
      <Td>{crypto.name}</Td>
      <Td>{crypto.quote.THB.price.toFixed(2)} THB</Td>
      <Td color='#CFA3FF'>{crypto.quote.THB.price.toFixed(2)} THB</Td>
      <Td>
        <Button colorScheme='cyan' variant='outline' onClick={() => onAdd(crypto)}>
          Add to Portfolio
        </Button>
      </Td>
    </>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  alignItems: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`;

export default CryptoItem;
