import React from 'react';
import CurrentUserInfo from './CurrentUserInfo';
import ToggleCurrentUserProfile from '../ui/ToggleCurrentUserProfile';

function UserProfileSidebar({toggleCurrentUserProfile, toggleCurrentUser, screenWidth}) {
  return (
    <div className={`${(toggleCurrentUser && screenWidth <= 1024) ? "block   absolute top-0 left-0 h-full z-50" : "hidden"} w-[300px] lg:block px-6 py-8 text-white bg-black border-r-2 border-secondary flex flex-col overflow-y-scroll no-scrollbar`}>
      {/* <ToggleCurrentUserProfile toggleCurrentUserProfile={toggleCurrentUserProfile} toggleCurrentUser={toggleCurrentUser} screenWidth={screenWidth}/> */}
      <CurrentUserInfo/>
    </div>
  )
}

export default UserProfileSidebar