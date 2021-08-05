import { Dialog } from "@material-ui/core";
import { fullName, useUsers } from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import UserPicker from "Components/Forms/UserPicker";
import React, { useState } from "react";
import { CreditCardPaymentMethod, User } from "Types";
import styles from "./PaymentMethodDetail.module.css";

const PaymentMethodDetail = ({
  paymentMethod,
  ownedByMe,
  onClose,
}: {
  paymentMethod: CreditCardPaymentMethod;
  ownedByMe: boolean;
  onClose: () => void;
}) => {
  const usersQuery = useUsers();
  const [newUser, setNewUser] = useState<User | null>(null);
  return (
    <Dialog open onClose={onClose}>
      <div className={styles.paymentMethodDialog}>
        <p>{paymentMethod.name} - Credit Card</p>
        <p>Owned By: {fullName(paymentMethod.owner)}</p>
        <p>Added On: {new Date().toLocaleString()}</p>
        <p>Charges This Month: $363.33</p>
        <p>Charges Last Month: $880.96</p>
        <hr />
        <div className={styles.authorizedUsers}>
          <p>Authorized Users</p>
          <ul>
            <li>
              Matthew Branaugh{" "}
              {ownedByMe ? (
                <IconButton iconName="delete" color="red" size="sm" />
              ) : (
                <span />
              )}
            </li>
            <li>
              Alicia Yu
              {ownedByMe ? (
                <IconButton iconName="delete" color="red" size="sm" />
              ) : (
                <span />
              )}
            </li>
          </ul>
          {ownedByMe && (
            <form
              className={styles.authorizeForm}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <UserPicker
                label="New User"
                users={usersQuery.isSuccess ? usersQuery.data : []}
                selectedUser={newUser}
                setSelectedUser={setNewUser}
              />
              <IconButton
                iconName="add"
                label="Authorize Users"
                color="blue"
                size="md"
              />
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentMethodDetail;
