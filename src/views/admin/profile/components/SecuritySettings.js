import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  Stack,
  SimpleGrid,
  Divider,
  useToast
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

const SecuritySettings = () => {
  const { isOpen: isTwoFactorOpen, onOpen: onTwoFactorOpen, onClose: onTwoFactorClose } = useDisclosure();
  const { isOpen: isLoginActivityOpen, onOpen: onLoginActivityOpen, onClose: onLoginActivityClose } = useDisclosure();
  const { isOpen: isSecurityQuestionsOpen, onOpen: onSecurityQuestionsOpen, onClose: onSecurityQuestionsClose } = useDisclosure();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState({
    question1: '',
    answer1: '',
    question2: '',
    answer2: ''
  });
  const toast = useToast();

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(prev => !prev);
  };

  const handleSecurityQuestionsChange = (e) => {
    const { name, value } = e.target;
    setSecurityQuestions({ ...securityQuestions, [name]: value });
  };

  const handleSaveSecurityQuestions = () => {
    toast({ title: 'Security questions updated successfully.', status: 'success' });
    onSecurityQuestionsClose();
  };

  const handleSaveTwoFactor = () => {
    toast({ title: `Two-Factor Authentication ${twoFactorEnabled ? 'enabled' : 'disabled'} successfully.`, status: 'success' });
    onTwoFactorClose();
  };

  const handleSaveLoginActivity = () => {
    toast({ title: 'Login activity updated successfully.', status: 'success' });
    onLoginActivityClose();
  };

  return (
    <SimpleGrid p='6'  spacing='20px' height="100px" mb='20px' width='1550px' mx='auto'>
      <Card p='6' shadow='md'>
        <Heading size='lg' mb='4'>Security Settings</Heading>

        {/* Two-Factor Authentication */}
        <Button colorScheme='teal' onClick={onTwoFactorOpen} mb='4'>
          Two-Factor Authentication
        </Button>

        {/* Login Activity */}
        <Button colorScheme='teal' onClick={onLoginActivityOpen} mb='4'>
          View Login Activity
        </Button>

        {/* Security Questions */}
        <Button colorScheme='teal' onClick={onSecurityQuestionsOpen}>
          Security Questions
        </Button>

        {/* Two-Factor Authentication Modal */}
        <Modal isOpen={isTwoFactorOpen} onClose={onTwoFactorClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Two-Factor Authentication</ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <Text>
                  {twoFactorEnabled ? 'Two-Factor Authentication is currently enabled.' : 'Two-Factor Authentication is currently disabled.'}
                </Text>
                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='twoFactor' mb='0'>
                    Enable Two-Factor Authentication
                  </FormLabel>
                  <Switch
                    id='twoFactor'
                    isChecked={twoFactorEnabled}
                    onChange={handleTwoFactorToggle}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='teal' onClick={handleSaveTwoFactor}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Login Activity Modal */}
        <Modal isOpen={isLoginActivityOpen} onClose={onLoginActivityClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login Activity</ModalHeader>
            <ModalBody>
              <Text mb='4'>Here you can view recent login activity and devices used to access your account.</Text>
              <Text>Last login from IP address: 192.168.1.1</Text>
              <Text>Device used: Chrome on Windows 10</Text>
              {/* Add more activity details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='teal' onClick={handleSaveLoginActivity}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Security Questions Modal */}
        <Modal isOpen={isSecurityQuestionsOpen} onClose={onSecurityQuestionsClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Security Questions</ModalHeader>
            <ModalBody>
              <VStack spacing={4} align='stretch'>
                <FormControl id='question1'>
                  <FormLabel>Security Question 1</FormLabel>
                  <Input
                    name='question1'
                    value={securityQuestions.question1}
                    onChange={handleSecurityQuestionsChange}
                  />
                </FormControl>
                <FormControl id='answer1'>
                  <FormLabel>Answer to Question 1</FormLabel>
                  <Input
                    name='answer1'
                    type='password'
                    value={securityQuestions.answer1}
                    onChange={handleSecurityQuestionsChange}
                  />
                </FormControl>
                <FormControl id='question2'>
                  <FormLabel>Security Question 2</FormLabel>
                  <Input
                    name='question2'
                    value={securityQuestions.question2}
                    onChange={handleSecurityQuestionsChange}
                  />
                </FormControl>
                <FormControl id='answer2'>
                  <FormLabel>Answer to Question 2</FormLabel>
                  <Input
                    name='answer2'
                    type='password'
                    value={securityQuestions.answer2}
                    onChange={handleSecurityQuestionsChange}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='teal' onClick={handleSaveSecurityQuestions}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </SimpleGrid>
  );
};

export default SecuritySettings;
