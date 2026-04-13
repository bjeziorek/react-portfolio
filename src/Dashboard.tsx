import './App.css'
import Topbar from './navigation/Topbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './navigation/Sidebar'
import { Box, Flex } from '@radix-ui/themes'

export interface FiltersMock {
  name: string;
}

function Dashboard() {
  return (
    <>
      <Topbar />
      <Flex height="88vh">
        <Sidebar />
        <Box
          p="4"
          flexGrow="1"
          style={{
            overflowY: "auto",
          }}
        >
          <Flex
            direction="column"
            align="center"
            gap="4"
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            <Box width="100%">
              <Outlet />
            </Box>

          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Dashboard
