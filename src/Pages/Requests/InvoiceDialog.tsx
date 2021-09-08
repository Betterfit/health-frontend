import Dialog from "Components/Dialog";
import React from "react";

export interface InvoiceItem {
  name: string;
  quantity?: number;
  rate?: number;
  total: number;
}

const InvoiceDialog = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
  items: InvoiceItem[];
}) => {
  return <Dialog open={open} onClose={handleClose}></Dialog>;
};

export default InvoiceDialog;
