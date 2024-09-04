import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
  InputGroup,
  InputLeftElement,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';

// Import ikon
import HomeInsuranceIcon from 'assets/img/insurences/HomeInsuranceIcon.png';
import CarInsuranceIcon from 'assets/img/insurences/CarInsuranceIcon.png';
import HealthInsuranceIcon from 'assets/img/insurences/HealthInsuranceIcon.png';

// Przykładowe dane premium
const initialPremiums = [
  {
    id: 1,
    policyNumber: 'POL12345',
    type: 'Home Insurance',
    amount: '$120.00',
    dueDate: '2024-09-15',
    paymentMethod: 'Credit Card',
    icon: HomeInsuranceIcon,
  },
  {
    id: 2,
    policyNumber: 'POL67890',
    type: 'Car Insurance',
    amount: '$80.00',
    dueDate: '2024-09-20',
    paymentMethod: 'Bank Transfer',
    icon: CarInsuranceIcon,
  },
  {
    id: 3,
    policyNumber: 'POL11223',
    type: 'Health Insurance',
    amount: '$150.00',
    dueDate: '2024-09-25',
    paymentMethod: 'Debit Card',
    icon: HealthInsuranceIcon,
  }
];

const PremiumsOverview = () => {
  const [premiums, setPremiums] = useState(initialPremiums);
  const [filteredPremiums, setFilteredPremiums] = useState(initialPremiums);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPremium, setSelectedPremium] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    type: '',
    paymentMethod: '',
  });
  const toast = useToast();

  const handleEdit = (premium) => {
    setSelectedPremium(premium);
    setFormData({
      policyNumber: premium.policyNumber,
      type: premium.type,
      amount: premium.amount,
      dueDate: premium.dueDate,
      paymentMethod: premium.paymentMethod,
    });
    onOpen();
  };

  const handleSave = () => {
    setPremiums(premiums.map(premium =>
      premium.id === selectedPremium.id ? { ...premium, ...formData } : premium
    ));
    setFilteredPremiums(premiums.map(premium =>
      premium.id === selectedPremium.id ? { ...premium, ...formData } : premium
    ));
    toast({ title: 'Premium details updated.', status: 'success' });
    onClose();
  };

  const handleAddPremium = () => {
    setShowAddModal(true);
    setFormData({
      policyNumber: '',
      type: '',
      amount: '',
      dueDate: '',
      paymentMethod: '',
    });
  };

  const handleAddSave = () => {
    const newPremium = {
      id: premiums.length + 1,
      ...formData,
      icon: getIconForType(formData.type)
    };
    setPremiums([...premiums, newPremium]);
    setFilteredPremiums([...filteredPremiums, newPremium]);
    toast({ title: 'Premium added.', status: 'success' });
    setShowAddModal(false);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Home Insurance': return HomeInsuranceIcon;
      case 'Car Insurance': return CarInsuranceIcon;
      case 'Health Insurance': return HealthInsuranceIcon;
      default: return '';
    }
  };

  const handleSearch = () => {
    setFilteredPremiums(premiums.filter(premium => 
      premium.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      premium.type.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setFilteredPremiums(premiums.filter(premium =>
      (filter.type ? premium.type === filter.type : true) &&
      (filter.paymentMethod ? premium.paymentMethod === filter.paymentMethod : true)
    ));
  };

  return (
    <SimpleGrid columns={{ base: 1 }} spacing='20px' height="800px" mb='20px' width='750px' mx='auto'>
      <Box mx="-50px" px="50px">
        <Card p='6' shadow='md'>
          <HStack justify='space-between' mb='4'>
            <Text fontSize='2xl' fontWeight='bold'>Premiums Overview</Text>
            <Button colorScheme='teal' leftIcon={<AddIcon />} onClick={handleAddPremium}>
              Add Premium
            </Button>
          </HStack>
          
          {/* Search and Filter */}
          <Box mb='4'>
            <HStack spacing='4' mb='4'>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input
                  placeholder='Search by Policy Number or Type'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </InputGroup>
              <Button onClick={handleSearch}>Search</Button>
            </HStack>
            
            <HStack spacing='4'>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select name='type' value={filter.type} onChange={handleFilterChange}>
                  <option value=''>All</option>
                  <option value='Home Insurance'>Home Insurance</option>
                  <option value='Car Insurance'>Car Insurance</option>
                  <option value='Health Insurance'>Health Insurance</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Payment Method</FormLabel>
                <Select name='paymentMethod' value={filter.paymentMethod} onChange={handleFilterChange}>
                  <option value=''>All</option>
                  <option value='Credit Card'>Credit Card</option>
                  <option value='Debit Card'>Debit Card</option>
                  <option value='Bank Transfer'>Bank Transfer</option>
                  <option value='PayPal'>PayPal</option>
                </Select>
              </FormControl>
            </HStack>
          </Box>

          <VStack spacing={4} align='stretch'>
            {filteredPremiums.map((premium) => (
              <Box
                key={premium.id}
                p='6'
                borderWidth='1px'
                borderColor='gray.200'
                borderRadius='md'
                display='flex'
                alignItems='center'
                shadow='sm'
                width='100%'  // Ustawi szerokość karty na 100% dostępnej przestrzeni
              >
                <Image boxSize='60px' src={premium.icon} alt={premium.type} mr='6' />
                <VStack align='start' spacing='2' width='100%'>
                  <Text fontWeight='bold' fontSize='lg'>{premium.type}</Text>
                  <HStack justifyContent="space-between" width='100%'>
                    <Text>Policy Number: {premium.policyNumber}</Text>
                    <Text fontWeight="bold">{premium.amount}</Text>
                  </HStack>
                  <HStack justifyContent="space-between" width='100%'>
                    <Text>Due Date: {premium.dueDate}</Text>
                    <Text>Payment Method: {premium.paymentMethod}</Text>
                  </HStack>
                  <Button size="sm" colorScheme='teal' onClick={() => handleEdit(premium)}>
                    Edit
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>

          {/* Edit Premium Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Premium Details</ModalHeader>
              <ModalBody>
                <VStack spacing={4} align='stretch'>
                  <FormControl id='policyNumber'>
                    <FormLabel>Policy Number</FormLabel>
                    <Input
                      value={formData.policyNumber || ''}
                      onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='type'>
                    <FormLabel>Type</FormLabel>
                    <Input
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='amount'>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='dueDate'>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type='date'
                      value={formData.dueDate || ''}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='paymentMethod'>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      value={formData.paymentMethod || ''}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option value=''>Select a method</option>
                      <option value='Credit Card'>Credit Card</option>
                      <option value='Debit Card'>Debit Card</option>
                      <option value='Bank Transfer'>Bank Transfer</option>
                      <option value='PayPal'>PayPal</option>
                    </Select>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={handleSave}>
                  Save
                </Button>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Add Premium Modal */}
          <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Premium</ModalHeader>
              <ModalBody>
                <VStack spacing={4} align='stretch'>
                  <FormControl id='policyNumber'>
                    <FormLabel>Policy Number</FormLabel>
                    <Input
                      value={formData.policyNumber || ''}
                      onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='type'>
                    <FormLabel>Type</FormLabel>
                    <Input
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='amount'>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='dueDate'>
                    <FormLabel>Due Date</FormLabel>
                    <Input
                      type='date'
                      value={formData.dueDate || ''}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id='paymentMethod'>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      value={formData.paymentMethod || ''}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option value=''>Select a method</option>
                      <option value='Credit Card'>Credit Card</option>
                      <option value='Debit Card'>Debit Card</option>
                      <option value='Bank Transfer'>Bank Transfer</option>
                      <option value='PayPal'>PayPal</option>
                    </Select>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={handleAddSave}>
                  Add
                </Button>
                <Button variant='outline' onClick={() => setShowAddModal(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card>
      </Box>
    </SimpleGrid>
  );
};

export default PremiumsOverview;
