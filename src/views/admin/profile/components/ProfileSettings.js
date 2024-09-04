import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Switch,
  useToast,
  Heading,
  SimpleGrid,
  Avatar,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
  Divider
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';

const ProfileSettings = () => {
  const [user, setUser] = useState({
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    address: 'Ul. Przykladowa 1, 00-001 Warszawa',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
    },
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [password, setPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [formData, setFormData] = useState(user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Obsługuje zmianę danych
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: checked,
      },
    });
  };

  const handlePasswordChange = () => {
    if (password) {
      toast({ title: 'Password updated successfully.', status: 'success' });
      setPassword('');
    } else {
      toast({ title: 'Please enter a new password.', status: 'error' });
    }
  };

  const handleSaveChanges = () => {
    setUser({ ...formData, profilePicture: newProfilePicture || user.profilePicture });
    toast({ title: 'Profile updated successfully.', status: 'success' });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box p='6' spacing='20px' height="800px" mb='20px' width='1550px' mx='auto'>
      <Card p='6' shadow='md' borderWidth='1px'>
        <Heading size='lg' mb='4'>Profile Settings</Heading>

        {/* Profile Picture */}
        <VStack spacing={4} align='center' mb='6'>
          <Avatar src={user.profilePicture} size='2xl' />
          <Input
            type='file'
            accept='image/*'
            onChange={handleProfilePictureChange}
            mb='4'
          />
        </VStack>

        {/* Personal Information */}
        <Heading size='md' mb='4'>Personal Information</Heading>
        <VStack spacing={4} align='stretch'>
          <FormControl id='name'>
            <FormLabel>Full Name</FormLabel>
            <Input
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='email'>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='phone'>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='address'>
            <FormLabel>Address</FormLabel>
            <Input
              name='address'
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
        </VStack>

        <Divider my='6' />

        {/* Account Preferences */}
        <Heading size='md' mb='4'>Account Preferences</Heading>
        <VStack spacing={4} align='stretch'>
          <HStack justify='space-between'>
            <FormLabel>Email Notifications</FormLabel>
            <Switch
              name='emailNotifications'
              isChecked={formData.preferences.emailNotifications}
              onChange={handlePreferencesChange}
            />
          </HStack>
          <HStack justify='space-between'>
            <FormLabel>SMS Notifications</FormLabel>
            <Switch
              name='smsNotifications'
              isChecked={formData.preferences.smsNotifications}
              onChange={handlePreferencesChange}
            />
          </HStack>
        </VStack>

        <Divider my='6' />

        {/* Password Management */}
        <Heading size='md' mb='4'>Password Management</Heading>
        <VStack spacing={4} align='stretch'>
          <FormControl id='password'>
            <FormLabel>New Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme='teal' onClick={handlePasswordChange}>
            Update Password
          </Button>
        </VStack>

        <Divider my='6' />

        {/* Save Changes */}
        <Button mt='4' colorScheme='teal' onClick={handleSaveChanges}>
          Save Changes
        </Button>

        {/* Profile Summary */}
        <Box mt='8'>
          <Heading size='md' mb='4'>Account Summary</Heading>
          <Stack spacing={2}>
            <Text><b>Full Name:</b> {user.name}</Text>
            <Text><b>Email Address:</b> {user.email}</Text>
            <Text><b>Phone Number:</b> {user.phone}</Text>
            <Text><b>Address:</b> {user.address}</Text>
            <Text><b>Email Notifications:</b> {user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}</Text>
            <Text><b>SMS Notifications:</b> {user.preferences.smsNotifications ? 'Enabled' : 'Disabled'}</Text>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
