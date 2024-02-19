// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "GENERAL_MANAGER": "GENERAL_MANAGER",
  "CASHIER": "CASHIER",
  "WAREHOUSE_MANAGER": "WAREHOUSE_MANAGER",
  "PURCHASER": "PURCHASER"
};

const BillStatus = {
  "PENDING": "PENDING",
  "CONFIRMED": "CONFIRMED",
  "PAID": "PAID"
};

const { Store, User, Product, BillItem, Bill, PurchaseOrder } = initSchema(schema);

export {
  Store,
  User,
  Product,
  BillItem,
  Bill,
  PurchaseOrder,
  UserRole,
  BillStatus
};