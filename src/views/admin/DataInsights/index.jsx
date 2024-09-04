// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DataInsights from "views/admin/DataInsights/components/DataInsights";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <SimpleGrid>
      <Box mt="50px">
        <DataInsights />
      </Box>
    </SimpleGrid>
  );
}
