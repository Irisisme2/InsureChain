import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  List,
  ListItem,
  Link,
  VStack,
  HStack,
  Image,
  useBreakpointValue
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

// Local Icons
import TravelInsuranceIcon from 'assets/img/insurences/HealthInsuranceIcon.png';
import HealthInsuranceIcon from 'assets/img/insurences/HealthInsuranceIcon.png';
import HomeInsuranceIcon from 'assets/img/insurences/HomeInsuranceIcon.png';
import CarInsuranceIcon from 'assets/img/insurences/CarInsuranceIcon.png';

// Payment Option Icons (converted SVGs)
import CreditCardIcon from 'assets/img/premiums/CreditCard.webp';
import PayPalIcon from 'assets/img/premiums/PaypalIcon.png'
import BankTransferIcon from 'assets/img/premiums/BankTransfer.png';
import CryptoPaymentIcon from 'assets/img/premiums/Crypto.png';


const upcomingPremiums = [
  { dueDate: '2024-09-10', amount: '$150.00', paymentLink: '#', coverage: 'Travel Insurance for Trip to Europe', icon: TravelInsuranceIcon },
  { dueDate: '2024-09-25', amount: '$200.00', paymentLink: '#', coverage: 'Health Insurance Premium', icon: HealthInsuranceIcon },
];

const paymentHistory = [
  { date: '2024-08-15', amount: '$100.00', status: 'Completed', coverage: 'Travel Insurance', icon: TravelInsuranceIcon },
  { date: '2024-07-20', amount: '$120.00', status: 'Completed', coverage: 'Home Insurance', icon: HomeInsuranceIcon },
  { date: '2024-06-10', amount: '$90.00', status: 'Failed', coverage: 'Car Insurance', icon: CarInsuranceIcon },
];

const paymentOptions = [
  { method: 'Credit Card', icon: CreditCardIcon },
  { method: 'PayPal', icon: PayPalIcon }, 
  { method: 'Bank Transfer', icon: BankTransferIcon },
  { method: 'Crypto Payment', icon: CryptoPaymentIcon }
];

const PremiumManagement = () => {
  return (
    <Box width={{ base: '100%', }} mx='auto' spacing='20px' mb='20px'>
      
      {/* Upcoming Premiums Card */}
      <Card width='100%' p='6'shadow='md' mb='20px'>
        <Text fontSize='2xl' fontWeight='bold' mb='4'>Upcoming Premiums</Text>
        <List spacing={4}>
          {upcomingPremiums.map((premium, index) => (
            <ListItem key={index} p='4' borderWidth='1px' borderColor='gray.200' borderRadius='md'>
              <HStack spacing={4}>
                <Image boxSize='70px' src={premium.icon} alt={premium.coverage} />
                <VStack align='start' spacing={1}>
                  <Text fontWeight='bold'>Due Date: {premium.dueDate}</Text>
                  <Text>Amount: {premium.amount}</Text>
                  <Link href={premium.paymentLink} color='teal.500' isExternal>
                    Pay Now
                  </Link>
                  <Text fontSize='sm' color='gray.500'>{premium.coverage}</Text>
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Card>
      
      {/* Payment History Card */}
      <Card width='100%' p='6'  shadow='md' mb='20px'>
        <Text fontSize='2xl' fontWeight='bold' mb='4'>Payment History</Text>
        <List spacing={4}>
          {paymentHistory.map((payment, index) => (
            <ListItem key={index} p='4' borderWidth='1px' borderColor='gray.200' borderRadius='md'>
              <HStack spacing={4}>
                <Image boxSize='70px' src={payment.icon} alt={payment.coverage} />
                <VStack align='start' spacing={1}>
                  <Text fontWeight='bold'>Date: {payment.date}</Text>
                  <Text>Amount: {payment.amount}</Text>
                  <Text>Status: {payment.status}</Text>
                  <Text fontSize='sm' color='gray.500'>{payment.coverage}</Text>
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Payment Options Card */}
      <Card width='100%' p='6' shadow='md'>
        <Text fontSize='2xl' fontWeight='bold' mb='4'>Payment Options</Text>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing='20px'>
          {paymentOptions.map((option, index) => (
            <Box key={index} p='4' borderWidth='1px' borderRadius='lg' textAlign='center' shadow='sm'>
              <Image boxSize='80px' src={option.icon} alt={option.method} mb='2' />
              <Text fontSize='lg'>{option.method}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Card>
    </Box>
  );
};

export default PremiumManagement;