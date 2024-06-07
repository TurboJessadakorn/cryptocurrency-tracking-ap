import React, { useEffect, useState } from "react";
import { getTopCryptos } from "../services/api/crypto";
import { addPortfolioItem } from "../services/api/portfolio";
import CryptoItem from "./CryptoItem";
import AddToPortfolioModal from "./AddToPortfolioModal";
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
  Spinner,
  Td,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

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

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [isLoadingCryptos, setIsLoadingCryptos] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);

  const handleAddToPortfolio = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    onOpen();
  };

  const saveToPortfolio = async (amount: number, purchasePrice: number) => {
    const newItem = await addPortfolioItem(
      selectedCrypto!.name,
      selectedCrypto!.logo,
      selectedCrypto!.symbol,
      amount,
      purchasePrice
    );
    console.log(newItem);
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      setIsLoadingCryptos(true);
      try {
        const data = await getTopCryptos();
        const cryptosWithFavorites = data.map((crypto: any) => ({
          ...crypto,
          isFavorite: false,
        }));
        setCryptos(cryptosWithFavorites);
      } catch (error) {
        console.error("Failed to fetch top cryptos:", error);
      }
      setIsLoadingCryptos(false);
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteCryptos") || "[]"
    );
    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) => ({
        ...crypto,
        isFavorite: savedFavorites.includes(crypto.id),
      }))
    );
  }, [cryptos]);

  const toggleFavorite = (id: number) => {
    setCryptos((prevCryptos) => {
      const updatedCryptos = prevCryptos.map((crypto) =>
        crypto.id === id
          ? { ...crypto, isFavorite: !crypto.isFavorite }
          : crypto
      );

      const favoriteIds = updatedCryptos
        .filter((crypto) => crypto.isFavorite)
        .map((crypto) => crypto.id);
      localStorage.setItem("favoriteCryptos", JSON.stringify(favoriteIds));

      return updatedCryptos;
    });
  };

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) {
      return 0;
    } else if (a.isFavorite) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <Stack style={{ display: "flex", flexDirection: "column" }} spacing="12px">
      <HStack>
        <Input
          size="sm"
          width="100%"
          maxWidth="500px"
          placeholder="Search crypto"
        ></Input>
      </HStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Price (BAHT)</Th>
              <Th>1h %</Th>
              <Th>24h %</Th>
              <Th>7d %</Th>
              <Th></Th>
            </Tr>
          </Thead>
          {isLoadingCryptos ? (
            <Tbody>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>
                <Spinner size="lg" speed='1s' />
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tbody>
          ) : (
            <Tbody>
              <AnimatePresence>
                {sortedCryptos.map((crypto) => (
                  <motion.tr
                    key={crypto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.8,
                    }}
                  >
                    <CryptoItem
                      key={crypto.id}
                      crypto={crypto}
                      onAdd={handleAddToPortfolio}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.tr>
                ))}
              </AnimatePresence>
            </Tbody>
          )}
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
