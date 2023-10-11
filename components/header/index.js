import React from 'react';
import NavTop from './NavTop';
import Search from './Search';
import Banner from './Banner';

function Header() {
  return (
    <header>
      <Banner />
      <NavTop />
      <Search />
    </header>
  );
}

export default Header;
