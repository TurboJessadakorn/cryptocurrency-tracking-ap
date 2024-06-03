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
  Text
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
  const [purchasePrice, setPurchasePrice] = useState<number>(0);

  const handleSave = () => {
    onSave(amount, purchasePrice);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ bgColor: '#191B1E', color: 'white' }}>
        <ModalHeader>Add {crypto?.name} to your Portfolio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>{crypto?.name}</Text>
            <Text>{crypto?.quote.THB.price}</Text>
            <FormControl>
              <FormLabel>Amount Owned</FormLabel>
              <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Purchase Price</FormLabel>
              <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(parseFloat(e.target.value))} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddToPortfolioModal;
