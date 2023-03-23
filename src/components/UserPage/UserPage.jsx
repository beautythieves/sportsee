import React from 'react';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

function UserPage(props) {
  console.log('UserPage rendered with props:', props);

  const userId = props.match ? props.match.params.userId : null;

  return (
    <div>
      {userId ? <WelcomeMessage userId={userId} /> : null}
      {/* Render other components and charts here */}
    </div>
  );
}

export default UserPage;

