import React from 'react';
import { UserIcon } from './Icons';

export const Header = () => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };
  return (
    <div>
      <a href="./">Q & A</a>
      <input
        type="text"
        placeholder="search..."
        onChange={handleSearchInputChange}
      />
      <a href="./sigin">
        <UserIcon />
        <span>Sign In</span>
      </a>
    </div>
  );
};
