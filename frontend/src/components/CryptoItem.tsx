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
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
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

const getColorAndTriangle = (percentChange: number) => {
  const color = percentChange >= 0 ? ' #93f997' : '#fe7a73';
  const triangle = percentChange >= 0 ? '▲' : '▼';
  return { color, triangle };
};

const CryptoItem: React.FC<CryptoItemProps> = ({ crypto, onAdd, onToggleFavorite }) => {

  return (
    <>
      <Td>
          <StarIcon onClick={() => onToggleFavorite(crypto.id)} color={crypto.isFavorite ? 'yellow' : 'gray'} cursor={'pointer'}></StarIcon>
      </Td>
      <Td>
      <HStack spacing={2}>
          <img src={crypto.logo} alt={`${crypto.name} logo`} style={{ width: '32px', height: '32px' }} />
          <p>{crypto.name} {crypto.symbol}</p>
        </HStack>
      </Td>
      <Td>{crypto.quote.THB.price.toFixed(2)} THB</Td>
      <Td color={getColorAndTriangle(crypto.quote.THB.percent_change_1h).color}>
        {getColorAndTriangle(crypto.quote.THB.percent_change_1h).triangle} {crypto.quote.THB.percent_change_1h.toFixed(2)}%
      </Td>
      <Td color={getColorAndTriangle(crypto.quote.THB.percent_change_24h).color}>
        {getColorAndTriangle(crypto.quote.THB.percent_change_24h).triangle} {crypto.quote.THB.percent_change_24h.toFixed(2)}%
      </Td>
      <Td color={getColorAndTriangle(crypto.quote.THB.percent_change_7d).color}>
        {getColorAndTriangle(crypto.quote.THB.percent_change_7d).triangle} {crypto.quote.THB.percent_change_7d.toFixed(2)}%
      </Td>

      <Td>
        <Button color={'white'} bg={'#5142FF'} _hover={{ bg: '8379fd'}} onClick={() => onAdd(crypto)}>
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
