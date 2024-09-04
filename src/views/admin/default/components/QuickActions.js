import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

const QuickActions = () => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isRenewOpen, onOpen: onRenewOpen, onClose: onRenewClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const [showCompanies, setShowCompanies] = useState(false);
  const [formData, setFormData] = useState({
    policyType: '',
    coverageAmount: '',
    renewalDate: '',
    profileName: '',
    profileEmail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitCreate = () => {
    setShowCompanies(true);
    onCreateClose();
  };

  const handleSubmitRenew = () => {
    onRenewClose();
  };

  const handleSubmitEdit = () => {
    onEditClose();
  };

  return (
    <Card p="6" borderWidth="1px" shadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Quick Actions
        </Text>

        <Button colorScheme="teal" onClick={onCreateOpen} w="full" mb="2">
          Create New Policy
        </Button>

        <Button colorScheme="orange" onClick={onRenewOpen} w="full" mb="2">
          Renew Policy
        </Button>

        <Button colorScheme="blue" onClick={onEditOpen} w="full" mb="2">
          Edit Profile
        </Button>
      </VStack>

      {/* Modal for Creating a New Policy */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="policyType" isRequired>
                <FormLabel>Policy Type</FormLabel>
                <Select
                  placeholder="Select policy type"
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleInputChange}
                >
                  <option value="health">Health Insurance</option>
                  <option value="car">Car Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="travel">Travel Insurance</option>
                </Select>
              </FormControl>
              <FormControl id="coverageAmount" isRequired>
                <FormLabel>Coverage Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter coverage amount"
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmitCreate}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onCreateClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Renewing a Policy */}
      <Modal isOpen={isRenewOpen} onClose={onRenewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Renew Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="policyTypeRenew" isRequired>
                <FormLabel>Policy Type</FormLabel>
                <Select
                  placeholder="Select policy to renew"
                  name="policyTypeRenew"
                  value={formData.policyType}
                  onChange={handleInputChange}
                >
                  <option value="health">Health Insurance</option>
                  <option value="car">Car Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="travel">Travel Insurance</option>
                </Select>
              </FormControl>
              <FormControl id="renewalDate" isRequired>
                <FormLabel>Renewal Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Select renewal date"
                  name="renewalDate"
                  value={formData.renewalDate}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={handleSubmitRenew}>
              Renew
            </Button>
            <Button variant="ghost" onClick={onRenewClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Editing Profile */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="profileName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  name="profileName"
                  value={formData.profileName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="profileEmail" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="profileEmail"
                  value={formData.profileEmail}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Company Options Display */}
      {showCompanies && (
        <Box mt="6">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Available Insurance Companies
          </Text>
          <VStack spacing="20px">
            <Card p="4" borderWidth="1px" borderRadius="lg" textAlign="center">
              <Text>Company A</Text>
            </Card>
            <Card p="4" borderWidth="1px" borderRadius="lg" textAlign="center">
              <Text>Company B</Text>
            </Card>
            <Card p="4" borderWidth="1px" borderRadius="lg" textAlign="center">
              <Text>Company C</Text>
            </Card>
          </VStack>
        </Box>
      )}
    </Card>
  );
};

export default QuickActions;
