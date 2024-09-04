import React from 'react';
import {
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import Card from 'components/card/Card.js';

// Rejestracja skal i komponentów
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

// Przykładowe dane dla Usage Analytics
const usageData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Policy Usage',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'Claim Frequency',
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

// Przykładowe dane dla Trends and Patterns
const trendData = {
  labels: ['2018', '2019', '2020', '2021', '2022'],
  datasets: [
    {
      label: 'Policy Renewal Rate',
      data: [85, 89, 92, 95, 98],
      fill: false,
      borderColor: '#4BC0C0',
    },
    {
      label: 'New Policies Acquired',
      data: [60, 62, 65, 70, 75],
      fill: false,
      borderColor: '#FF6384',
    },
  ],
};

// Przykładowe dane dla Customer Distribution
const customerDistributionData = {
  labels: ['Individual', 'Family', 'Corporate'],
  datasets: [
    {
      data: [300, 500, 200],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

// Przykładowe dane dla Claims by Type
const claimsByTypeData = {
  labels: ['Health', 'Home', 'Auto', 'Travel'],
  datasets: [
    {
      data: [150, 300, 100, 50],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const DataInsights = () => {
  const cardWidth = useBreakpointValue({ base: '100%', md: '48%' });

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
      {/* Usage Analytics Card */}
      <Card width="550px"  p="6" borderWidth="1px" borderRadius="lg" shadow="md">
        <VStack align="start">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Usage Analytics
          </Text>
          <Box width="500px" height="500px">
            <Bar
              data={usageData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </VStack>
      </Card>

      {/* Trends and Patterns Card */}
      <Card width="550px"  p="6" borderWidth="1px" borderRadius="lg" shadow="md">
        <VStack align="start">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Trends and Patterns
          </Text>
          <Box width="500px" height="500px">
            <Line
              data={trendData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </VStack>
      </Card>

      {/* Customer Distribution Card */}
      <Card width="550px"  p="6" borderWidth="1px" borderRadius="lg" shadow="md">
        <VStack align="start">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Customer Distribution
          </Text>
          <Box width="500px" height="500px">
            <Doughnut
              data={customerDistributionData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </VStack>
      </Card>

      {/* Claims by Type Card */}
      <Card width="550px" p="6" borderWidth="1px" borderRadius="lg" shadow="md">
        <VStack align="start">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Claims by Type
          </Text>
          <Box width="500px" height="500px">
            <Pie
              data={claimsByTypeData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </VStack>
      </Card>
    </SimpleGrid>
  );
};

export default DataInsights;


