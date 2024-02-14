import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum UserRole {
  GENERAL_MANAGER = "GENERAL_MANAGER",
  CASHIER = "CASHIER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
  PURCHASER = "PURCHASER"
}

export enum BillStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PAID = "PAID"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly phonenumber: string;
  readonly image?: string | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly idcardimage?: (string | null)[] | null;
  readonly bills?: (Bill | null)[] | null;
  readonly purchaserorder?: (PurchaseOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly phonenumber: string;
  readonly image?: string | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly idcardimage?: (string | null)[] | null;
  readonly bills: AsyncCollection<Bill>;
  readonly purchaserorder: AsyncCollection<PurchaseOrder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly barcode: string;
  readonly images?: (string | null)[] | null;
  readonly price: number;
  readonly manufacturer?: string | null;
  readonly category?: string | null;
  readonly warehouseQuantity: number;
  readonly shelfQuantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly barcode: string;
  readonly images?: (string | null)[] | null;
  readonly price: number;
  readonly manufacturer?: string | null;
  readonly category?: string | null;
  readonly warehouseQuantity: number;
  readonly shelfQuantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerBillItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BillItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly productPrice: number;
  readonly subtotal: number;
  readonly category?: string | null;
  readonly manufacturer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly billItemsId?: string | null;
}

type LazyBillItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BillItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly productPrice: number;
  readonly subtotal: number;
  readonly category?: string | null;
  readonly manufacturer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly billItemsId?: string | null;
}

export declare type BillItem = LazyLoading extends LazyLoadingDisabled ? EagerBillItem : LazyBillItem

export declare const BillItem: (new (init: ModelInit<BillItem>) => BillItem) & {
  copyOf(source: BillItem, mutator: (draft: MutableModel<BillItem>) => MutableModel<BillItem> | void): BillItem;
}

type EagerBill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Bill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cashier: User;
  readonly items: BillItem[];
  readonly totalAmount: number;
  readonly status: BillStatus | keyof typeof BillStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userBillsId?: string | null;
}

type LazyBill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Bill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cashier: AsyncItem<User>;
  readonly items: AsyncCollection<BillItem>;
  readonly totalAmount: number;
  readonly status: BillStatus | keyof typeof BillStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userBillsId?: string | null;
}

export declare type Bill = LazyLoading extends LazyLoadingDisabled ? EagerBill : LazyBill

export declare const Bill: (new (init: ModelInit<Bill>) => Bill) & {
  copyOf(source: Bill, mutator: (draft: MutableModel<Bill>) => MutableModel<Bill> | void): Bill;
}

type EagerPurchaseOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PurchaseOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly purchaser: User;
  readonly image?: string[] | null;
  readonly vendor?: string | null;
  readonly amount?: number | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userPurchaserorderId?: string | null;
}

type LazyPurchaseOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PurchaseOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly purchaser: AsyncItem<User>;
  readonly image?: string[] | null;
  readonly vendor?: string | null;
  readonly amount?: number | null;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userPurchaserorderId?: string | null;
}

export declare type PurchaseOrder = LazyLoading extends LazyLoadingDisabled ? EagerPurchaseOrder : LazyPurchaseOrder

export declare const PurchaseOrder: (new (init: ModelInit<PurchaseOrder>) => PurchaseOrder) & {
  copyOf(source: PurchaseOrder, mutator: (draft: MutableModel<PurchaseOrder>) => MutableModel<PurchaseOrder> | void): PurchaseOrder;
}