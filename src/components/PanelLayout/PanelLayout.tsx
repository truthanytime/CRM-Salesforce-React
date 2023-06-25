import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components/Navbar';
import { Container } from './ui';
import { Drawer } from 'components/Drawer';

export default function PanelLayout(){
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prevState) => !prevState);

  return (
    <Container>
      <Navbar toggleDrawer={toggleDrawer} />
      <Drawer open={drawerOpen} toggleOpen={toggleDrawer} />
      <Outlet />
    </Container>
  );
}