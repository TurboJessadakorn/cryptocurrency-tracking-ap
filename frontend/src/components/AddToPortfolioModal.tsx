import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  HStack,
  Box,
  useToast,
} from '@chakra-ui/react';

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


interface AddToPortfolioModalProps {
  crypto: Crypto | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: number, purchasePrice: number) => void;
}

const AddToPortfolioModal: React.FC<AddToPortfolioModalProps> = ({ crypto, isOpen, onClose, onSave }) => {
  const [amount, setAmount] = useState<number>(0);
  const [purchasePrice, setPurchasePrice] = useState<number>(crypto?.quote.THB.price || 0);
  const toast = useToast();

  const handleSave = () => {
    if (amount > 0) {
      onSave(amount, purchasePrice);
      onClose();
    } else {
      toast({
        title: 'Invalid quantity',
        description: 'Quantity cannot be 0.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const totalSpend = amount * purchasePrice;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ bgColor: '#191B1E', color: 'white' }}>
        <ModalHeader>{`Add ${crypto?.name} to your Portfolio`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <HStack>
              <img src={crypto?.logo} alt={`${crypto?.name} logo`} style={{ width: '32px', height: '32px' }} />
              <span>{crypto?.name}</span>
            </HStack>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel>Price per Coin</FormLabel>
              <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(parseFloat(e.target.value))} />
            </FormControl>
            <Box mt={4} p={2}>
              <Text>Total Spend: {totalSpend.toFixed(2)} THB</Text>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button color={'white'} bg={'#5142FF'} _hover={{ bg: '8379fd'}} onClick={handleSave} w={'100%'} mb={3}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddToPortfolioModal;