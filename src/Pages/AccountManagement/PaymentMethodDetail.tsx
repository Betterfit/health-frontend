import { Dialog } from "@material-ui/core";
import { fullName, useUsers } from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import UserPicker from "Components/Forms/UserPicker";
import { api, PaymentMethodUpdate } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PaymentMethod, User } from "Types";
import styles from "./PaymentMethodDetail.module.css";

const PaymentMethodDetail = ({
  paymentMethod,
  ownedByMe,
  onClose,
}: {
  paymentMethod: PaymentMethod;
  ownedByMe: boolean;
  onClose: () => void;
}) => {
  const usersQuery = useUsers();
  const [newUser, setNewUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const paymentMethodMutation = useMutation(
    (data: PaymentMethodUpdate) => api.updatePaymentMethod(paymentMethod, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("paymentMethods");
        setNewUser(null);
      },
    }
  );
  const authorizedUserIds = paymentMethod.authorizedUsers.map(
    (user) => user.id
  );
  const addUser = (userId: number) =>
    paymentMethodMutation.mutate({
      authorizedUsers: [...authorizedUserIds, userId],
    });

  const removeUser = (userId: number) => {
    paymentMethodMutation.mutate({
      authorizedUsers: authorizedUserIds.filter((id) => id !== userId),
    });
    setNewUser(null);
  };
  const allUsers = usersQuery.isSuccess ? usersQuery.data : [];
  // filter out users that are already authorized
  const eligibleNewUsers = allUsers.filter((user) =>
    paymentMethod.authorizedUsers.every((authUser) => user.id !== authUser.id)
  );
  return (
    <Dialog open onClose={onClose}>
      <div className={styles.paymentMethodDialog}>
        <p>{paymentMethod.name} - Credit Card</p>
        <p>Owner: {fullName(paymentMethod.owner)}</p>
        <p>Added On: {new Date(paymentMethod.timeCreated).toLocaleString()}</p>
        {/* <p>Charges This Month: $363.33</p>
        <p>Charges Last Month: $880.96</p> */}
        <hr />
        <div className={styles.authorizedUsers}>
          <p id="authorizedUsersTitle">Authorized Users</p>
          <ul aria-labelledby="authorizedUsersTitle">
            {paymentMethod.authorizedUsers.map((user) => (
              <li data-testid={"authorizedUser-" + user.email}>
                {fullName(user) || user.email}{" "}
                {ownedByMe ? (
                  <IconButton
                    aria-label={"deauthorize " + fullName(user)}
                    iconName="delete"
                    color="red"
                    size="sm"
                    disabled={paymentMethodMutation.isLoading}
                    onClick={() => removeUser(user.id)}
                  />
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>
          {ownedByMe && (
            <form
              className={styles.authorizeForm}
              onSubmit={(e) => {
                e.preventDefault();
                if (newUser && !paymentMethodMutation.isLoading)
                  addUser(newUser.id);
              }}
            >
              <UserPicker
                label="New User"
                users={eligibleNewUsers}
                selectedUser={newUser}
                setSelectedUser={setNewUser}
              />
              <IconButton
                iconName="add"
                label="Authorize User"
                color="blue"
                size="md"
                disabled={!newUser || paymentMethodMutation.isLoading}
                onClick={() => newUser && addUser(newUser.id)}
              />
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentMethodDetail;
