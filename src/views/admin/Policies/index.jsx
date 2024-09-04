
import { Box, SimpleGrid } from "@chakra-ui/react";
import ViewPolicies from "views/admin/Policies/components/ViewPolicies";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        pacing={{ base: "20px", xl: "20px" }}>

        <ViewPolicies  />
      </SimpleGrid>
    </Box>
  );
}
