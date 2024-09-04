import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  Image,
  Badge,
  Tooltip,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  VStack,
  HStack,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DownloadIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import Card from 'components/card/Card.js';

// Sample data for claims
import ClaimDoc1 from 'assets/docs/claim1.docx'; // Example document
import ClaimDoc2 from 'assets/docs/claim2.docx'; // Example document
import ClaimDoc3 from 'assets/docs/claim3.docx'; // Example document
import ClaimDoc4 from 'assets/docs/claim4.docx'; // Example document

const sampleClaims = [
  {
    id: 1,
    claimNumber: 'CLM001',
    amount: '$5000',
    description: 'Damage to vehicle due to accident.',
    status: 'Pending',
    date: '2024-08-10',
    documents: [ClaimDoc1],
  },
  {
    id: 2,
    claimNumber: 'CLM002',
    amount: '$2000',
    description: 'Medical expenses due to illness.',
    status: 'Approved',
    date: '2024-07-15',
    documents: [ClaimDoc2],
  },
  {
    id: 3,
    claimNumber: 'CLM003',
    amount: '$7500',
    description: 'Property damage from a natural disaster.',
    status: 'Rejected',
    date: '2024-06-25',
    documents: [ClaimDoc3],
  },
  {
    id: 4,
    claimNumber: 'CLM004',
    amount: '$3000',
    description: 'Theft of personal belongings.',
    status: 'Pending',
    date: '2024-05-20',
    documents: [ClaimDoc4],
  },
  // Add more claims as needed
];

const MyClaims = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [editClaim, setEditClaim] = useState(null);
  const [claims, setClaims] = useState(sampleClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const toast = useToast();

  const filteredClaims = claims
    .filter(
      (claim) =>
        claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === '' || claim.status === filterStatus)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize);

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    onOpen();
  };

  const handleEditClaim = (claim) => {
    setEditClaim(claim);
    setValue('claimNumber', claim.claimNumber);
    setValue('amount', claim.amount);
    setValue('description', claim.description);
    setValue('status', claim.status);
    setValue('date', claim.date);
    onOpen();
  };

  const handleAddNewClaim = () => {
    setEditClaim(null);
    reset();
    onOpen();
  };

  const handleDeleteClaim = (claimId) => {
    setClaims((prevClaims) => prevClaims.filter(claim => claim.id !== claimId));
    toast({ title: 'Claim deleted.', status: 'success' });
  };

  const onSubmit = (data) => {
    if (editClaim) {
      // Update existing claim
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === editClaim.id
            ? { ...claim, ...data }
            : claim
        )
      );
      toast({ title: 'Claim updated.', status: 'success' });
    } else {
      // Add new claim
      const newClaim = {
        id: claims.length + 1,
        ...data,
      };
      setClaims([...claims, newClaim]);
      toast({ title: 'Claim added.', status: 'success' });
    }
    onClose();
  };

  return (
    <Card p="6" borderWidth="1px" borderRadius="lg" shadow="md">
      <VStack align="start" spacing="20px">
        <Text fontSize="2xl" fontWeight="bold">
          My Claims
        </Text>

        {/* Search and Filter */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing="20px" width="100%">
          <InputGroup>
            <Input
              placeholder="Search by claim number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search claims"
                icon={<SearchIcon />}
                onClick={() => {}}
              />
            </InputRightElement>
          </InputGroup>
          <Select
            placeholder="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Select>
          <Button
            colorScheme="teal"
            leftIcon={<AddIcon />}
            onClick={handleAddNewClaim}
          >
            Add New Claim
          </Button>
        </Stack>

        {/* Claims Table */}
        <Box width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Claim Number</Th>
                <Th>Amount</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredClaims.map((claim) => (
                <Tr key={claim.id}>
                  <Td>{claim.claimNumber}</Td>
                  <Td>{claim.amount}</Td>
                  <Td>{claim.description}</Td>
                  <Td>
                    <Badge colorScheme={claim.status === 'Approved' ? 'green' : claim.status === 'Rejected' ? 'red' : 'yellow'}>
                      {claim.status}
                    </Badge>
                  </Td>
                  <Td>{claim.date}</Td>
                  <Td>
                    <HStack spacing={3}>
                      <Tooltip label="View Details">
                        <Button
                          size="sm"
                          leftIcon={<EditIcon />}
                          onClick={() => handleViewDetails(claim)}
                        >
                          View
                        </Button>
                      </Tooltip>
                      <Tooltip label="Edit Claim">
                        <Button
                          size="sm"
                          leftIcon={<EditIcon />}
                          onClick={() => handleEditClaim(claim)}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                      <Tooltip label="Download Documents">
                        <Button size="sm" leftIcon={<DownloadIcon />}>
                          Download
                        </Button>
                      </Tooltip>
                      <Tooltip label="Delete Claim">
                        <IconButton
                          size="sm"
                          colorScheme="red"
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          onClick={() => handleDeleteClaim(claim.id)}
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Pagination */}
          <Flex mt="4" justify="center">
            {/* Pagination component needs to be implemented */}
          </Flex>
        </Box>

        {/* Claim Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editClaim ? 'Edit Claim' : 'Add New Claim'}</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="4">
                  <FormControl isInvalid={errors.claimNumber}>
                    <FormLabel>Claim Number</FormLabel>
                    <Input
                      {...register('claimNumber', { required: 'This field is required' })}
                      placeholder="Enter claim number"
                    />
                    {errors.claimNumber && <Text color="red.500">{errors.claimNumber.message}</Text>}
                  </FormControl>

                  <FormControl isInvalid={errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      {...register('amount', { required: 'This field is required' })}
                      placeholder="Enter amount"
                    />
                    {errors.amount && <Text color="red.500">{errors.amount.message}</Text>}
                  </FormControl>

                  <FormControl isInvalid={errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      {...register('description', { required: 'This field is required' })}
                      placeholder="Enter description"
                    />
                    {errors.description && <Text color="red.500">{errors.description.message}</Text>}
                  </FormControl>

                  <FormControl isInvalid={errors.status}>
                    <FormLabel>Status</FormLabel>
                    <Select
                      {...register('status', { required: 'This field is required' })}
                      placeholder="Select status"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </Select>
                    {errors.status && <Text color="red.500">{errors.status.message}</Text>}
                  </FormControl>

                  <FormControl isInvalid={errors.date}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      {...register('date', { required: 'This field is required' })}
                    />
                    {errors.date && <Text color="red.500">{errors.date.message}</Text>}
                  </FormControl>
                </VStack>
                <Flex mt="4" align="center" justify="space-between">
                  <Button
                    colorScheme="teal"
                    type="submit"
                  >
                    {editClaim ? 'Save Changes' : 'Add Claim'}
                  </Button>
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                </Flex>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default MyClaims;
