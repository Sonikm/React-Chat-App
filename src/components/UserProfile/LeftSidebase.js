import React from 'react';
import CurrentUserInfo from './CurrentUserInfo';

function LeftSidebase() {
  return (
    <div className='w-[300px] px-6 py-8 text-white bg-black border-r-2 border-secondary flex flex-col overflow-y-scroll no-scrollbar '>
     <CurrentUserInfo/>
    </div>
  )
}

export default LeftSidebase