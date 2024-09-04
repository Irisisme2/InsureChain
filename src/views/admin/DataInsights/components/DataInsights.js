import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  Select,
  FormControl,
  FormLabel,
  Stack,
  SimpleGrid,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const data = {
  usageStatistics: [
    { name: 'Jan', usage: 400, claims: 240 },
    { name: 'Feb', usage: 300, claims: 221 },
    { name: 'Mar', usage: 200, claims: 229 },
    { name: 'Apr', usage: 278, claims: 200 },
    { name: 'May', usage: 189, claims: 218 },
    { name: 'Jun', usage: 239, claims: 250 },
  ],
  trendsPatterns: [
    { name: '2023-Q1', claims: 300 },
    { name: '2023-Q2', claims: 500 },
    { name: '2023-Q3', claims: 400 },
    { name: '2023-Q4', claims: 450 },
  ],
  policyDistribution: [
    { name: 'Policy A', value: 400 },
    { name: 'Policy B', value: 300 },
    { name: 'Policy C', value: 300 },
    { name: 'Policy D', value: 200 },
  ],
  areaData: [
    { name: '2023-01', value: 300 },
    { name: '2023-02', value: 500 },
    { name: '2023-03', value: 450 },
    { name: '2023-04', value: 600 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DataInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedData, setSelectedData] = useState(null);
  const toast = useToast();

  const handleExport = (format) => {
    toast({
      title: `Data exported as ${format}.`,
      status: 'success',
    });
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handlePieClick = (data, index) => {
    setSelectedData(data);
  };

  return (
    <Box width="100%" p='6'>
      <Card p='6' shadow='md' borderWidth='1px'>
        <Heading size='lg' mb='4'>Analytics Overview</Heading>

        {/* Date Range Picker */}
        <Stack mb='6'>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat='yyyy/MM/dd'
              className='chakra-datepicker'
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat='yyyy/MM/dd'
              className='chakra-datepicker'
            />
          </FormControl>
        </Stack>

        {/* Filter */}
        <FormControl mb='6'>
          <FormLabel>Data Period</FormLabel>
          <Select onChange={handlePeriodChange} value={selectedPeriod}>
            <option value='monthly'>Monthly</option>
            <option value='quarterly'>Quarterly</option>
            <option value='yearly'>Yearly</option>
          </Select>
        </FormControl>

        {/* Usage Statistics */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Usage Statistics</Heading>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={data.usageStatistics}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='usage' stroke='#8884d8' />
              <Line type='monotone' dataKey='claims' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Divider my='6' />

        {/* Trends and Patterns */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Trends and Patterns</Heading>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data.trendsPatterns}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='claims' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Divider my='6' />

        {/* Policy Distribution */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Policy Distribution</Heading>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data.policyDistribution}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill='#8884d8'
                onClick={handlePieClick}
              >
                {data.policyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Divider my='6' />

        {/* Area Chart */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Area Chart</Heading>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={data.areaData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type='monotone' dataKey='value' stroke='#8884d8' fillOpacity={0.3} fill='#8884d8' />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        <Divider my='6' />

        {/* Selected Data Details */}
        {selectedData && (
          <Box mb='6'>
            <Heading size='md' mb='2'>Selected Data Details</Heading>
            <Text><b>Name:</b> {selectedData.name}</Text>
            <Text><b>Value:</b> {selectedData.value}</Text>
          </Box>
        )}

        {/* Custom Reports */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Custom Reports</Heading>
          <VStack align='stretch'>
            <Text>Generate custom reports based on selected criteria.</Text>
            <Button colorScheme='teal'>Generate Report</Button>
          </VStack>
        </Box>

        <Divider my='6' />

        {/* Export Data */}
        <Box mb='6'>
          <Heading size='md' mb='2'>Export Data</Heading>
          <HStack spacing='10px'>
            <Button colorScheme='blue' onClick={() => handleExport('PDF')}>Export as PDF</Button>
            <Button colorScheme='blue' onClick={() => handleExport('CSV')}>Export as CSV</Button>
          </HStack>
        </Box>
      </Card>
    </Box>
  );
};

export default DataInsights;
