import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, Models } from '../constants';  // Import model array from your constants
import { logo } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); // Get the current path

  // Determine if the current path matches '/model/:id'
  const isModelDetailPage = location.pathname.startsWith('/model');

  // Function to dynamically render nav links based on current path
  const renderLinks = () => {
    if (isModelDetailPage) {
      return Models.map((model) => (
        <li
          key={model.id}
          className={`${
            active === model.title ? 'text-white' : 'text-secondary'
          } hover:text-white text-[18px] font-medium cursor-pointer`}
          onClick={() => {
            setActive(model.title);
            setToggle(!toggle);
          }}
        >
          <Link to={`/model/${model.id}`}>{model.title}</Link>
        </li>
      ));
    }

    // Default links for other pages
    return navLinks.map((link) => (
      <li
        key={link.id}
        className={`${
          active === link.title ? 'text-white' : 'text-secondary'
        } hover:text-white text-[18px] font-medium cursor-pointer`}
        onClick={() => setActive(link.title)}
      >
        <a href={`#${link.id}`}>{link.title}</a>
      </li>
    ));
  };

  return (
    <nav className={'${styles.paddingX} w-full flex items-center py-1 fixed top-0 z-20 bg-glass'}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-24 h-24 object-contain' />
          <p className='text-white text-[36px] font-bold cursor-pointer flex'>
            ANS AI &nbsp;
          </p>
        </Link>


       
        {isModelDetailPage && (
          <>
        <ul className='list-none hidden flex-row gap-10'>
        {/* Render links dynamically based on the current route */}
        {renderLinks()}
      </ul>
        <div className='flex flex-1 justify-end items-center'>
        <input id="checkbox2" type="checkbox" checked={toggle} />
        <label className="toggle toggle2" htmlFor="checkbox2" alt="menu"
          onClick={() => setToggle(!toggle)}>
          <div id="bar4" className="bars"></div>
          <div id="bar5" className="bars"></div>
          <div id="bar6" className="bars"></div>
        </label>

        {/* Mobile menu content */}
        <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
          <ul className='list-none flex justify-end items-start flex-col gap-4'>
            {renderLinks()}
          </ul>
        </div>
      </div>
      </>
        )}

      {!isModelDetailPage && (
        <>
               <ul className='list-none hidden xl:flex flex-row gap-10'>
        {/* Render links dynamically based on the current route */}
        {renderLinks()}
      </ul>
        <div className='xl:hidden flex flex-1 justify-end items-center'>
        <input id="checkbox2" type="checkbox" checked={toggle} />
        <label className="toggle toggle2" htmlFor="checkbox2" alt="menu"
          onClick={() => setToggle(!toggle)}>
          <div id="bar4" className="bars"></div>
          <div id="bar5" className="bars"></div>
          <div id="bar6" className="bars"></div>
        </label>

        {/* Mobile menu content */}
        <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul className='list-none flex justify-end items-start flex-col gap-4'
          >
            {renderLinks()}
          </ul>
        </div>
      </div>
      </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
