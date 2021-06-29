import { useUsers } from "APIHooks/user";
import React from "react";

const PendingInvitations = () => {
  const usersQuery = useUsers();
  if (!usersQuery.isSuccess) return <ul></ul>;
  // if a user's name has not been set, that mean they had not initialized their account yet
  const invitations = usersQuery.data.filter((user) => !user.firstName);
  return (
    <div className="text-center">
      {`${invitations.length} pending invitations`}
      <ul aria-label="pending invitations">
        {invitations.map((user) => (
          <li key={user.id} data-testid={user.email}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingInvitations;
