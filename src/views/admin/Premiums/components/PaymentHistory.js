import React, { useState, useMemo } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  useToast,
  HStack,
  SimpleGrid,
  Flex,
  Spacer,
  Badge,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { SearchIcon, DownloadIcon, ViewIcon, DeleteIcon, EditIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const samplePayments = [
  { id: 1, date: '2024-08-15', amount: 100.00, method: 'Credit Card', policy: 'Travel Insurance', details: 'Detailed description of payment 1', notes: '' },
  { id: 2, date: '2024-07-20', amount: 120.00, method: 'PayPal', policy: 'Home Insurance', details: 'Detailed description of payment 2', notes: '' },
  { id: 3, date: '2024-06-10', amount: 90.00, method: 'Bank Transfer', policy: 'Car Insurance', details: 'Detailed description of payment 3', notes: '' },
  // Add more sample data as needed
];

const PaymentHistory = () => {
  const [payments, setPayments] = useState(samplePayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearch = () => {
    toast({ title: 'Search functionality not implemented yet.', status: 'info' });
  };

  const handleDownload = (id) => {
    toast({ title: `Downloading receipt for payment ID: ${id}`, status: 'success' });
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
    toast({ title: 'Payment deleted successfully.', status: 'success' });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPayments = useMemo(() => {
    const sortablePayments = [...payments];
    sortablePayments.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortablePayments;
  }, [payments, sortConfig]);

  const filteredPayments = sortedPayments.filter(payment =>
    (payment.date.includes(searchTerm) ||
    payment.amount.toString().includes(searchTerm) ||
    payment.policy.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterMethod ? payment.method === filterMethod : true) &&
    (!startDate || new Date(payment.date) >= startDate) &&
    (!endDate || new Date(payment.date) <= endDate)
  );

  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

  return (
    <Card p='6'  shadow='md'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>Payment History</Text>
      
      {/* Search, Filter and Date Range */}
      <VStack spacing={4} align='stretch' mb='4'>
        <InputGroup>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input
            placeholder='Search by date, amount, or policy'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl>
            <FormLabel>Filter by Payment Method</FormLabel>
            <Select
              placeholder='Select payment method'
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
            >
              <option value='Credit Card'>Credit Card</option>
              <option value='PayPal'>PayPal</option>
              <option value='Bank Transfer'>Bank Transfer</option>
            </Select>
          </FormControl>

          <HStack>
            <Box>
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                isClearable
                placeholderText='Select start date'
                customInput={<Input />}
              />
            </Box>
            <Box>
              <FormLabel>End Date</FormLabel>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                isClearable
                placeholderText='Select end date'
                customInput={<Input />}
              />
            </Box>
          </HStack>
        </SimpleGrid>
      </VStack>

      {/* Table */}
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>
              <Button variant="link" onClick={() => handleSort('date')}>
                Date <ArrowUpDownIcon />
              </Button>
            </Th>
            <Th>
              <Button variant="link" onClick={() => handleSort('amount')}>
                Amount <ArrowUpDownIcon />
              </Button>
            </Th>
            <Th>
              <Button variant="link" onClick={() => handleSort('method')}>
                Method <ArrowUpDownIcon />
              </Button>
            </Th>
            <Th>
              <Button variant="link" onClick={() => handleSort('policy')}>
                Policy <ArrowUpDownIcon />
              </Button>
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentPayments.map(payment => (
            <Tr key={payment.id}>
              <Td>{payment.date}</Td>
              <Td>${payment.amount.toFixed(2)}</Td>
              <Td>{payment.method}</Td>
              <Td>{payment.policy}</Td>
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="View Details">
                    <IconButton
                      aria-label="View Details"
                      icon={<ViewIcon />}
                      onClick={() => handleViewDetails(payment)}
                      size='sm'
                    />
                  </Tooltip>
                  <Tooltip label="Download Receipt">
                    <IconButton
                      aria-label="Download Receipt"
                      icon={<DownloadIcon />}
                      onClick={() => handleDownload(payment.id)}
                      size='sm'
                    />
                  </Tooltip>
                  <Tooltip label="Delete Payment">
                    <IconButton
                      aria-label="Delete Payment"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(payment.id)}
                      size='sm'
                      colorScheme='red'
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <HStack spacing={4} mt='4' justify="space-between">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>{`Page ${currentPage} of ${Math.ceil(filteredPayments.length / itemsPerPage)}`}</Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPayments.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(filteredPayments.length / itemsPerPage)}
        >
          Next
        </Button>
        <Spacer />
        <FormControl maxW="150px">
          <FormLabel>Items per page</FormLabel>
          <NumberInput
            defaultValue={itemsPerPage}
            min={1}
            max={20}
            onChange={(value) => setItemsPerPage(parseInt(value, 10))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>

      {/* View Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Details</ModalHeader>
          <ModalBody>
            {selectedPayment && (
              <VStack spacing={4} align='stretch'>
                <Text><strong>Date:</strong> {selectedPayment.date}</Text>
                <Text><strong>Amount:</strong> ${selectedPayment.amount.toFixed(2)}</Text>
                <Text><strong>Method:</strong> {selectedPayment.method}</Text>
                <Text><strong>Policy:</strong> {selectedPayment.policy}</Text>
                <Text><strong>Details:</strong> {selectedPayment.details}</Text>
                <FormControl>
                  <FormLabel>Add Notes</FormLabel>
                  <Input
                    placeholder="Add your notes here"
                    value={selectedPayment.notes}
                    onChange={(e) => {
                      const updatedPayment = { ...selectedPayment, notes: e.target.value };
                      setPayments(payments.map(payment =>
                        payment.id === selectedPayment.id ? updatedPayment : payment
                      ));
                    }}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default PaymentHistory;
