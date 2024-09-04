import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Badge,
  Button,
  Divider,
  Image,
  Progress,
  Flex,
  IconButton,
  Tooltip,
  Input,
  Select,
  Alert,
  AlertIcon,
  Collapse,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import Card from "components/card/Card.js"; // Import your custom Card component

// Importing insurance icons
import HomeInsuranceIcon from "assets/img/insurences/HomeInsuranceIcon.png";
import CarInsuranceIcon from "assets/img/insurences/CarInsuranceIcon.png";
import HealthInsuranceIcon from "assets/img/insurences/HealthInsuranceIcon.png";

// Sample data for policies with image references
const policies = [
  {
    id: 1,
    name: "Health Insurance",
    coverage: "Full Coverage",
    terms: "Annual",
    expirationDate: "2025-08-30",
    status: "active",
    icon: HealthInsuranceIcon,
    progress: 80,
    description: "Covers all medical expenses including hospitalization, surgery, and medication.",
  },
  {
    id: 2,
    name: "Car Insurance",
    coverage: "Liability Coverage",
    terms: "Monthly",
    expirationDate: "2024-09-15",
    status: "pending renewal",
    icon: CarInsuranceIcon,
    progress: 50,
    description: "Provides coverage for damages to other vehicles in the event of an accident.",
  },
  {
    id: 3,
    name: "Home Insurance",
    coverage: "Fire and Theft",
    terms: "Annual",
    expirationDate: "2023-12-10",
    status: "expired",
    icon: HomeInsuranceIcon,
    progress: 100,
    description: "Covers your home against damages due to fire and theft.",
  },
];

const PolicyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  useEffect(() => {
    // Fetch policies here if connected to an API
  }, [page]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  // Filter and Search Logic
  const filteredPolicies = policies
    .filter(
      (policy) =>
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus ? policy.status === filterStatus : true)
    );

  const handleRenewPolicy = (policyId) => {
    toast({
      title: "Policy Renewal",
      description: `Policy with ID ${policyId} has been renewed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditPolicy = (policy) => {
    setSelectedPolicy(policy);
    onOpenModal();
  };

  const handleDeletePolicy = (policyId) => {
    // Implement delete logic here
    toast({
      title: "Policy Deleted",
      description: `Policy with ID ${policyId} has been deleted.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const loadMorePolicies = () => {
    setLoading(true);
    // Fetch more policies from an API or simulate loading more policies
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      // Implement logic to determine if there are more policies to load
      // setHasMore(false) if there are no more policies
    }, 1000);
  };

  return (
    <Box  width="100%">
      {/* Policy Management Card */}
      <Card p={4} width="100%">
        {/* Header */}
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Policy Management
        </Text>

        {/* Search and Filter Controls */}
        <Flex mb={4} justifyContent="space-between" alignItems="center" flexDirection={{ base: "column", md: "row" }}>
          <Input
            placeholder="Search policies..."
            width={{ base: "100%", md: "200px" }}
            value={searchTerm}
            onChange={handleSearchChange}
            variant="filled"
            size="md"
            mb={{ base: 2, md: 0 }}
            icon={<SearchIcon />}
          />
          <Select
            placeholder="Filter by Status"
            width={{ base: "100%", md: "200px" }}
            value={filterStatus}
            onChange={handleFilterChange}
            variant="filled"
            size="md"
          >
            <option value="active">Active</option>
            <option value="pending renewal">Pending Renewal</option>
            <option value="expired">Expired</option>
          </Select>
        </Flex>

        {/* Notifications or Alerts */}
        <Alert status="warning" mb={4}>
          <AlertIcon />
          Some policies are pending renewal. Please review them.
        </Alert>

        {/* Policies Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} p={4} borderRadius="md" boxShadow="md">
              <Stack spacing={3} alignItems="center">
                {/* Icon representing the policy */}
                <Image src={policy.icon} alt={policy.name} boxSize="80px" mb={4} />

                {/* Policy Name and Details */}
                <Flex alignItems="center" justifyContent="space-between" width="100%">
                  <Text fontSize="lg" fontWeight="semibold">
                    {policy.name}
                  </Text>
                  <Flex>
                    <Tooltip label="Edit Policy" fontSize="md">
                      <IconButton
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                        aria-label="Edit"
                        onClick={() => handleEditPolicy(policy)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete Policy" fontSize="md">
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        aria-label="Delete"
                        onClick={() => handleDeletePolicy(policy.id)}
                      />
                    </Tooltip>
                  </Flex>
                </Flex>

                <Text fontSize="md">Coverage: {policy.coverage}</Text>
                <Text fontSize="md">Terms: {policy.terms}</Text>
                <Text fontSize="md">Expiration Date: {policy.expirationDate}</Text>

                {/* Progress Bar for Policy Status */}
                <Progress
                  value={policy.progress}
                  size="sm"
                  colorScheme={
                    policy.progress === 100
                      ? "red"
                      : policy.progress >= 75
                      ? "green"
                      : "orange"
                  }
                  mt={2}
                  width="100%"
                  borderRadius="md"
                />

                {/* Status Badge */}
                <Badge
                  colorScheme={
                    policy.status === "active"
                      ? "green"
                      : policy.status === "pending renewal"
                      ? "orange"
                      : "red"
                  }
                  mb={2}
                >
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </Badge>

                {/* Expand/Collapse Policy Details */}
                <Button onClick={() => setExpandedPolicy(policy.id === expandedPolicy ? null : policy.id)} size="sm">
                  {expandedPolicy === policy.id ? "Less Details" : "More Details"} {expandedPolicy === policy.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
                <Collapse in={expandedPolicy === policy.id} animateOpacity>
                  <Box p="4" mt={2} borderWidth="1px" borderRadius="md">
                    <Text fontSize="sm">Full Policy Details:</Text>
                    <Text fontSize="xs" color="gray.600" mt={2}>
                      {policy.description}
                    </Text>
                    {/* Policy Actions */}
                    <Button mt={2} colorScheme="blue" size="sm" onClick={() => handleRenewPolicy(policy.id)}>
                      Renew Policy
                    </Button>
                  </Box>
                </Collapse>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Load More Button */}
        {hasMore && (
          <Flex justifyContent="center" mt={4}>
            <Button onClick={loadMorePolicies} isLoading={loading}>
              Load More
            </Button>
          </Flex>
        )}
      </Card>

      <Divider my={8} />

      {/* Policy Details Modal */}
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form for editing policy details */}
            <Stack spacing={4}>
              <Input
                placeholder="Policy Name"
                value={selectedPolicy?.name || ""}
                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, name: e.target.value })}
              />
              <Input
                placeholder="Coverage"
                value={selectedPolicy?.coverage || ""}
                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, coverage: e.target.value })}
              />
              <Input
                placeholder="Terms"
                value={selectedPolicy?.terms || ""}
                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, terms: e.target.value })}
              />
              <Input
                placeholder="Expiration Date"
                value={selectedPolicy?.expirationDate || ""}
                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, expirationDate: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={selectedPolicy?.description || ""}
                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, description: e.target.value })}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => {
              // Save policy changes here
              toast({
                title: "Policy Updated",
                description: `Policy with ID ${selectedPolicy.id} has been updated.`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              onCloseModal();
            }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PolicyManagement;

