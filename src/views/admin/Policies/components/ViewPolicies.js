import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Text,
  VStack,
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
  HStack,
  Divider,
  Badge,
  Tooltip,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Spacer,
  Center,
  useToast
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, DownloadIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import Card from 'components/card/Card.js';

// Sample data for policies with icons
import HomeInsuranceIcon from 'assets/img/insurences/HomeInsuranceIcon.png';
import CarInsuranceIcon from 'assets/img/insurences/CarInsuranceIcon.png';
import HealthInsuranceIcon from 'assets/img/insurences/HealthInsuranceIcon.png';
import TravelInsuranceIcon from 'assets/img/insurences/TravelInsuranceIcon.png';
import LifeInsuranceIcon from 'assets/img/insurences/LifeInsuranceIcon.png';
import DisabilityInsuranceIcon from 'assets/img/insurences/DisabilityInsuranceIcon.png';
import PetInsuranceIcon from 'assets/img/insurences/PetInsuranceIcon.png';

const samplePolicies = [
  {
    id: 1,
    name: 'Home Insurance',
    type: 'Home',
    status: 'Active',
    coverage: 'Comprehensive',
    expiration: '2025-06-01',
    details: 'Coverage for damages to the home and personal belongings.',
    icon: HomeInsuranceIcon,
  },
  {
    id: 2,
    name: 'Car Insurance',
    type: 'Car',
    status: 'Expired',
    coverage: 'Full',
    expiration: '2023-12-15',
    details: 'Coverage for car accidents, theft, and damages.',
    icon: CarInsuranceIcon,
  },
  {
    id: 3,
    name: 'Health Insurance',
    type: 'Health',
    status: 'Active',
    coverage: 'Medical Expenses',
    expiration: '2024-09-10',
    details: 'Coverage for medical expenses and hospital stays.',
    icon: HealthInsuranceIcon,
  },
  {
    id: 4,
    name: 'Travel Insurance',
    type: 'Travel',
    status: 'Active',
    coverage: 'Trip Protection',
    expiration: '2024-11-30',
    details: 'Coverage for trip cancellations and emergencies while traveling.',
    icon: TravelInsuranceIcon,
  },
  {
    id: 5,
    name: 'Life Insurance',
    type: 'Life',
    status: 'Active',
    coverage: 'Life Coverage',
    expiration: '2026-05-20',
    details: 'Coverage for life insurance and related benefits.',
    icon: LifeInsuranceIcon,
  },
  {
    id: 6,
    name: 'Disability Insurance',
    type: 'Disability',
    status: 'Active',
    coverage: 'Income Protection',
    expiration: '2026-07-15',
    details: 'Provides income replacement in case of disability.',
    icon: DisabilityInsuranceIcon,
  },
  {
    id: 7,
    name: 'Pet Insurance',
    type: 'Pet',
    status: 'Active',
    coverage: 'Comprehensive',
    expiration: '2024-10-30',
    details: 'Coverage for veterinary bills, accidents, and illnesses.',
    icon: PetInsuranceIcon,
  },
];

const ViewPolicies = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [editPolicy, setEditPolicy] = useState(null);
  const [policies, setPolicies] = useState(samplePolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const toast = useToast();

  const filteredPolicies = policies
    .filter(
      (policy) =>
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === '' || policy.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'expiration') return new Date(a.expiration) - new Date(b.expiration);
      return 0;
    });

  const handleViewDetails = (policy) => {
    setSelectedPolicy(policy);
    onOpen();
  };

  const handleEditPolicy = (policy) => {
    setEditPolicy(policy);
    setValue('name', policy.name);
    setValue('type', policy.type);
    setValue('status', policy.status);
    setValue('coverage', policy.coverage);
    setValue('expiration', policy.expiration);
    setValue('details', policy.details);
    setValue('icon', policy.icon);
    onOpen();
  };

  const handleAddNewPolicy = () => {
    setEditPolicy(null);
    reset();
    onOpen();
  };

  const onSubmit = (data) => {
    if (editPolicy) {
      // Update existing policy
      setPolicies((prevPolicies) =>
        prevPolicies.map((policy) =>
          policy.id === editPolicy.id
            ? { ...policy, ...data }
            : policy
        )
      );
      toast({ title: 'Policy updated.', status: 'success' });
    } else {
      // Add new policy
      const newPolicy = {
        id: policies.length + 1,
        ...data,
      };
      setPolicies([...policies, newPolicy]);
      toast({ title: 'Policy added.', status: 'success' });
    }
    onClose();
  };

  return (
    <Card p="6" borderWidth="1px" borderRadius="lg" shadow="md">
      <VStack align="start" spacing="20px">
        <Text fontSize="2xl" fontWeight="bold">
          Active Policies
        </Text>

        {/* Search and Filter */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing="20px" width="100%">
          <InputGroup>
            <Input
              placeholder="Search by policy name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search policies"
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
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </Select>
          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="expiration">Expiration Date</option>
          </Select>
        </Stack>

        {/* Add New Policy Button */}
        <Button
          colorScheme="teal"
          leftIcon={<AddIcon />}
          onClick={handleAddNewPolicy}
        >
          Add New Policy
        </Button>

        {/* Policies Table */}
        <Box width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Policy Name</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Expiration</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPolicies.map((policy) => (
                <Tr key={policy.id}>
                  <Td>
                    <HStack spacing={4}>
                      <Image boxSize="60px" src={policy.icon} alt={policy.type} />
                      <Text fontSize="lg">{policy.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{policy.type}</Td>
                  <Td>
                    <Badge colorScheme={policy.status === 'Active' ? 'green' : 'red'}>
                      {policy.status}
                    </Badge>
                  </Td>
                  <Td>{policy.expiration}</Td>
                  <Td>
                    <HStack spacing={3}>
                      <Tooltip label="View Details">
                        <Button
                          size="sm"
                          leftIcon={<EditIcon />}
                          onClick={() => handleViewDetails(policy)}
                        >
                          View
                        </Button>
                      </Tooltip>
                      <Tooltip label="Edit Policy">
                        <Button
                          size="sm"
                          leftIcon={<EditIcon />}
                          onClick={() => handleEditPolicy(policy)}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                      <Tooltip label="Download Policy">
                        <Button size="sm" leftIcon={<DownloadIcon />}>
                          Download
                        </Button>
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Policy Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editPolicy ? 'Edit Policy' : 'Add New Policy'}</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="4" align="start">
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Policy Name</FormLabel>
                    <Input
                      id="name"
                      placeholder="Policy Name"
                      {...register('name', { required: 'This field is required' })}
                    />
                    {errors.name && <Text color="red.500">{errors.name.message}</Text>}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <Select id="type" placeholder="Select type" {...register('type', { required: 'This field is required' })}>
                      <option value="Home">Home</option>
                      <option value="Car">Car</option>
                      <option value="Health">Health</option>
                      <option value="Travel">Travel</option>
                      <option value="Life">Life</option>
                      <option value="Disability">Disability</option>
                      <option value="Pet">Pet</option>
                    </Select>
                    {errors.type && <Text color="red.500">{errors.type.message}</Text>}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select id="status" placeholder="Select status" {...register('status', { required: 'This field is required' })}>
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                    </Select>
                    {errors.status && <Text color="red.500">{errors.status.message}</Text>}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="coverage">Coverage</FormLabel>
                    <Input
                      id="coverage"
                      placeholder="Coverage details"
                      {...register('coverage', { required: 'This field is required' })}
                    />
                    {errors.coverage && <Text color="red.500">{errors.coverage.message}</Text>}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="expiration">Expiration Date</FormLabel>
                    <Input
                      id="expiration"
                      type="date"
                      {...register('expiration', { required: 'This field is required' })}
                    />
                    {errors.expiration && <Text color="red.500">{errors.expiration.message}</Text>}
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="details">Details</FormLabel>
                    <Textarea
                      id="details"
                      placeholder="Policy details"
                      {...register('details')}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="icon">Icon URL</FormLabel>
                    <Input
                      id="icon"
                      placeholder="Icon URL"
                      {...register('icon')}
                    />
                  </FormControl>
                </VStack>
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

export default ViewPolicies;