import React, { useState } from "react";
import {
  Box,
  Text,
  Stack,
  Badge,
  Button,
  SimpleGrid,
  Input,
  Textarea,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  useToast,
  Select,
  IconButton,
  Tooltip,
  Collapse,
  useBreakpointValue,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, AddIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js"; // Import your custom Card component

// Sample data for recent claims
const recentClaims = [
  {
    id: 1,
    title: "Medical Claim",
    status: "Approved",
    description: "Claim for recent medical expenses.",
    date: "2024-08-20",
    amount: "$500",
  },
  {
    id: 2,
    title: "Car Accident Claim",
    status: "Pending",
    description: "Claim for damages from a car accident.",
    date: "2024-08-22",
    amount: "$1,200",
  },
  {
    id: 3,
    title: "Home Damage Claim",
    status: "Rejected",
    description: "Claim for damages caused by a recent storm.",
    date: "2024-08-25",
    amount: "$800",
  },
];

const ClaimsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claimDescription, setClaimDescription] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimTitle, setClaimTitle] = useState("");
  const [claimDate, setClaimDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedClaim, setExpandedClaim] = useState(null);
  const [filterTags, setFilterTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onOpenDetails, onClose: onCloseDetails } = useDisclosure();
  const toast = useToast();

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    onOpenDetails();
  };

  const handleSubmitClaim = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Claim Submitted",
        description: "Your claim has been successfully submitted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }, 1000);
  };

  const handleClaimDelete = (claimId) => {
    toast({
      title: "Claim Deleted",
      description: `Claim with ID ${claimId} has been deleted.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleStatusChange = (claimId, newStatus) => {
    toast({
      title: "Claim Status Updated",
      description: `Claim with ID ${claimId} status has been updated to ${newStatus}.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleTagClick = (status) => {
    if (!filterTags.includes(status)) {
      setFilterTags([...filterTags, status]);
    }
  };

  const handleTagRemove = (status) => {
    setFilterTags(filterTags.filter(tag => tag !== status));
  };

  const filteredClaims = recentClaims
    .filter(
      (claim) =>
        claim.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus ? claim.status === filterStatus : true) &&
        (filterTags.length > 0 ? filterTags.includes(claim.status) : true)
    );

  return (
    <Box width="430px">
      <Card p={4} width="100%" >
        {/* Section Header */}
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Claims Section
        </Text>

        {/* Search and Filter */}
        <Flex mb={4} direction={{ base: "column", md: "row" }} gap="4">
          <Input
            placeholder="Search claims..."
            width="100%"
            maxWidth={{ md: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            size="md"
            mr={{ md: 4 }}
            icon={<SearchIcon />}
          />
          <Select
            placeholder="Filter by Status"
            width="100%"
            maxWidth={{ md: "300px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            variant="filled"
            size="md"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </Select>
        </Flex>

        {/* Filter Tags */}
        <Flex wrap="wrap" mb={4}>
          {filterTags.map((tag) => (
            <Tag
              size="md"
              key={tag}
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
              mr={2}
              mb={2}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
        </Flex>

        {/* Notifications or Alerts */}
        <Alert status="warning" mb={4}>
          <AlertIcon />
          Some claims require your attention. Please review them.
        </Alert>

        {/* Claim Statistics */}
        <Box mb={4} p={4} borderRadius="md" bg="gray.50" boxShadow="sm">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Claim Statistics
          </Text>
          <Stack spacing={2}>
            <Text>Total Claims: {recentClaims.length}</Text>
            <Text>Approved Claims: {recentClaims.filter(c => c.status === "Approved").length}</Text>
            <Text>Pending Claims: {recentClaims.filter(c => c.status === "Pending").length}</Text>
            <Text>Rejected Claims: {recentClaims.filter(c => c.status === "Rejected").length}</Text>
          </Stack>
        </Box>

        {/* Recent Claims */}
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Recent Claims
        </Text>
        <SimpleGrid columns={1} spacing="20px">
          {filteredClaims.map((claim) => (
            <Card key={claim.id} p={4} borderRadius="md" boxShadow="md">
              <Stack spacing={3}>
                <Text fontSize="lg" fontWeight="semibold">
                  {claim.title}
                </Text>
                <Text fontSize="md">{claim.description}</Text>
                <Text fontSize="md" fontWeight="bold">
                  Amount: {claim.amount}
                </Text>
                <Badge
                  colorScheme={
                    claim.status === "Approved"
                      ? "green"
                      : claim.status === "Pending"
                      ? "orange"
                      : "red"
                  }
                >
                  {claim.status}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  Date: {claim.date}
                </Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleClaimClick(claim)}
                  >
                    View Details
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleClaimDelete(claim.id)}
                  >
                    Delete
                  </Button>
                  <Tooltip label="Update Status" fontSize="md">
                    <IconButton
                      icon={<ChevronDownIcon />}
                      size="sm"
                      aria-label="Update Status"
                      onClick={() => handleStatusChange(claim.id, "Updated")}
                    />
                  </Tooltip>
                </Flex>
                <Collapse in={expandedClaim === claim.id} animateOpacity>
                  <Box p="4" mt={2} borderWidth="1px" borderRadius="md">
                    <Text fontSize="sm">Full Claim Details:</Text>
                    <Text fontSize="xs" color="gray.600" mt={2}>
                      {claim.description}
                    </Text>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleClaimClick(claim)}
                    >
                      Add Comment
                    </Button>
                  </Box>
                </Collapse>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Submit Claim Button */}
        <Button
          mt={4}
          colorScheme="teal"
          onClick={onOpen}
          leftIcon={<AddIcon />}
        >
          Submit a New Claim
        </Button>

        {/* Submit Claim Form Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Submit a New Claim</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id="claim-title" isRequired>
                  <FormLabel>Claim Title</FormLabel>
                  <Input
                    placeholder="Enter claim title"
                    value={claimTitle}
                    onChange={(e) => setClaimTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl id="claim-description" isRequired>
                  <FormLabel>Claim Description</FormLabel>
                  <Textarea
                    placeholder="Enter claim description"
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl id="claim-amount" isRequired>
                  <FormLabel>Claim Amount</FormLabel>
                  <Input
                    placeholder="Enter claim amount"
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                  />
                </FormControl>
                <FormControl id="claim-date" isRequired>
                  <FormLabel>Claim Date</FormLabel>
                  <Input
                    placeholder="Enter claim date"
                    type="date"
                    value={claimDate}
                    onChange={(e) => setClaimDate(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmitClaim}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Claim Details Modal */}
        {selectedClaim && (
          <Modal isOpen={isDetailsOpen} onClose={onCloseDetails}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Claim Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg" fontWeight="bold">
                  {selectedClaim.title}
                </Text>
                <Text fontSize="md" mt={2}>
                  {selectedClaim.description}
                </Text>
                <Text fontSize="md" fontWeight="bold" mt={2}>
                  Amount: {selectedClaim.amount}
                </Text>
                <Text fontSize="md" color="gray.500" mt={2}>
                  Status: {selectedClaim.status}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  Date: {selectedClaim.date}
                </Text>
                <FormControl id="comment" mt={4}>
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onCloseDetails}>
                  Close
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    toast({
                      title: "Comment Added",
                      description: "Your comment has been added.",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                    onCloseDetails();
                  }}
                >
                  Add Comment
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Card>
    </Box>
  );
};

export default ClaimsSection;
