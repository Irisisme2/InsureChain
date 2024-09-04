import { Box, SimpleGrid, Grid } from "@chakra-ui/react";

// Custom components
import ProfileSettings from "views/admin/profile/components/ProfileSettings";
import SecuritySettings from "views/admin/profile/components/SecuritySettings";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <SimpleGrid mt="90px" spacing="660px">
      <ProfileSettings />
      <SecuritySettings />
    </SimpleGrid>
  );
}
