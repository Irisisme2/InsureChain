
import { Box, SimpleGrid } from "@chakra-ui/react";
import PremiumsOverview from "views/admin/Premiums/components/PremiumsOverview";
import PaymentHistory from "views/admin/Premiums/components/PaymentHistory";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mt="90px">
      <PremiumsOverview />
      <PaymentHistory />
    </SimpleGrid>
  );
}
