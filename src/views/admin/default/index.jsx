/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdAssignment, MdCheckCircle, MdAttachMoney, MdNotifications } from 'react-icons/md';
import PremiumManagement from "views/admin/default/components/PremiumManagement";
import DataInsights from "views/admin/default/components/DataInsights";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import QuickActions from "views/admin/default/components/QuickActions";
import PolicyManagement from "views/admin/default/components/PolicyManagement";
import ClaimsSection from "views/admin/default/components/ClaimsSection";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 2, "2xl": 4 }}
      gap='20px'
      mb='20px'>
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <Icon w='32px' h='32px' as={MdAssignment} color={brandColor} />
            }
          />
        }
        name='Total Policies'
        value='1234' // Replace with dynamic data
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <Icon w='32px' h='32px' as={MdCheckCircle} color={brandColor} />
            }
          />
        }
        name='Total Claims Filed'
        value='567'
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />}
          />
        }
        name='Total Premiums Paid'
        value='$12,345.67' 
      />
      <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <Icon w='32px' h='32px' as={MdNotifications} color={brandColor} />
            }
          />
        }
        name='Pending Notifications'
        value='8'
      />
    </SimpleGrid>
    <SimpleGrid
  columns={{ base: 1, md: 1 }}
  gap="20px"
  mb="20px"
  templateColumns="3fr 1fr" // 75% i 25% szerokości
>
  {/* Lewa kolumna: PolicyManagement i PremiumManagement */}
  <Box>
    <PolicyManagement />
    <PremiumManagement />
    < DataInsights/>

  </Box>
  
  <Box >
  <ClaimsSection mb="20px" />
  <QuickActions mt="20px"  />
  </Box>
</SimpleGrid>
    </Box>
  );
}
