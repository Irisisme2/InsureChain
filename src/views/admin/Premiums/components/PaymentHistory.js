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
    <Card p='6' shadow='md'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>Payment History</Text>
      
      {/* Search, Filter and Date Range */}
      <VStack spacing={4} align='stretch' mb='4'>
        <HStack spacing={4}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='Search by date, amount, or policy'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button onClick={handleSearch} colorScheme='blue'>Search</Button>
        </HStack>

        <HStack spacing={4}>
          <Select
            placeholder='Filter by payment method'
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            <option value='Credit Card'>Credit Card</option>
            <option value='PayPal'>PayPal</option>
            <option value='Bank Transfer'>Bank Transfer</option>
          </Select>
        </HStack>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </FormControl>
        </HStack>
      </VStack>

      {/* Payments Table */}
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>
              <HStack>
                <Text>Date</Text>
                <IconButton
                  aria-label='Sort by date'
                  icon={<ArrowUpDownIcon />}
                  onClick={() => handleSort('date')}
                />
              </HStack>
            </Th>
            <Th>
              <HStack>
                <Text>Amount</Text>
                <IconButton
                  aria-label='Sort by amount'
                  icon={<ArrowUpDownIcon />}
                  onClick={() => handleSort('amount')}
                />
              </HStack>
            </Th>
            <Th>Method</Th>
            <Th>Policy</Th>
            <Th>Details</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentPayments.map((payment) => (
            <Tr key={payment.id}>
              <Td>{payment.date}</Td>
              <Td>${payment.amount.toFixed(2)}</Td>
              <Td>{payment.method}</Td>
              <Td>{payment.policy}</Td>
              <Td>{payment.details}</Td>
              <Td>
                <HStack>
                  <IconButton
                    aria-label='View Details'
                    icon={<ViewIcon />}
                    onClick={() => handleViewDetails(payment)}
                  />
                  <IconButton
                    aria-label='Download Receipt'
                    icon={<DownloadIcon />}
                    onClick={() => handleDownload(payment.id)}
                  />
                  <IconButton
                    aria-label='Delete Payment'
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(payment.id)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex mt='4' justify='space-between' align='center'>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {Math.ceil(filteredPayments.length / itemsPerPage)}
        </Text>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredPayments.length / itemsPerPage)))}
          isDisabled={currentPage === Math.ceil(filteredPayments.length / itemsPerPage)}
        >
          Next
        </Button>
      </Flex>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Payment Details</ModalHeader>
            <ModalBody>
              <Text><strong>Date:</strong> {selectedPayment.date}</Text>
              <Text><strong>Amount:</strong> ${selectedPayment.amount.toFixed(2)}</Text>
              <Text><strong>Method:</strong> {selectedPayment.method}</Text>
              <Text><strong>Policy:</strong> {selectedPayment.policy}</Text>
              <Text><strong>Details:</strong> {selectedPayment.details}</Text>
              <Text><strong>Notes:</strong> {selectedPayment.notes}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default PaymentHistory;
