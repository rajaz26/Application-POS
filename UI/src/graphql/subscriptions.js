/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore($filter: ModelSubscriptionStoreFilterInput) {
    onCreateStore(filter: $filter) {
      id
      name
      address
      users {
        nextToken
        startedAt
        __typename
      }
      products {
        nextToken
        startedAt
        __typename
      }
      bills {
        nextToken
        startedAt
        __typename
      }
      purchaseOrders {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore($filter: ModelSubscriptionStoreFilterInput) {
    onUpdateStore(filter: $filter) {
      id
      name
      address
      users {
        nextToken
        startedAt
        __typename
      }
      products {
        nextToken
        startedAt
        __typename
      }
      bills {
        nextToken
        startedAt
        __typename
      }
      purchaseOrders {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore($filter: ModelSubscriptionStoreFilterInput) {
    onDeleteStore(filter: $filter) {
      id
      name
      address
      users {
        nextToken
        startedAt
        __typename
      }
      products {
        nextToken
        startedAt
        __typename
      }
      bills {
        nextToken
        startedAt
        __typename
      }
      purchaseOrders {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      userId
      username
      phonenumber
      image
      role
      idcardimage
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      bills
      purchaseOrders
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeUsersId
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      userId
      username
      phonenumber
      image
      role
      idcardimage
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      bills
      purchaseOrders
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeUsersId
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      userId
      username
      phonenumber
      image
      role
      idcardimage
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      bills
      purchaseOrders
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeUsersId
      __typename
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      name
      barcode
      image
      price
      manufacturer
      category
      warehouseQuantity
      shelfQuantity
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      billItems {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeProductsId
      __typename
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      name
      barcode
      image
      price
      manufacturer
      category
      warehouseQuantity
      shelfQuantity
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      billItems {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeProductsId
      __typename
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      name
      barcode
      image
      price
      manufacturer
      category
      warehouseQuantity
      shelfQuantity
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      billItems {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeProductsId
      __typename
    }
  }
`;
export const onCreateBillItem = /* GraphQL */ `
  subscription OnCreateBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onCreateBillItem(filter: $filter) {
      id
      product {
        id
        name
        barcode
        image
        price
        manufacturer
        category
        warehouseQuantity
        shelfQuantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeProductsId
        __typename
      }
      productName
      quantity
      productPrice
      subtotal
      category
      manufacturer
      bill {
        id
        cashier
        totalAmount
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeBillsId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const onUpdateBillItem = /* GraphQL */ `
  subscription OnUpdateBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onUpdateBillItem(filter: $filter) {
      id
      product {
        id
        name
        barcode
        image
        price
        manufacturer
        category
        warehouseQuantity
        shelfQuantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeProductsId
        __typename
      }
      productName
      quantity
      productPrice
      subtotal
      category
      manufacturer
      bill {
        id
        cashier
        totalAmount
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeBillsId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const onDeleteBillItem = /* GraphQL */ `
  subscription OnDeleteBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onDeleteBillItem(filter: $filter) {
      id
      product {
        id
        name
        barcode
        image
        price
        manufacturer
        category
        warehouseQuantity
        shelfQuantity
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeProductsId
        __typename
      }
      productName
      quantity
      productPrice
      subtotal
      category
      manufacturer
      bill {
        id
        cashier
        totalAmount
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storeBillsId
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const onCreateBill = /* GraphQL */ `
  subscription OnCreateBill($filter: ModelSubscriptionBillFilterInput) {
    onCreateBill(filter: $filter) {
      id
      cashier
      items {
        nextToken
        startedAt
        __typename
      }
      totalAmount
      status
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeBillsId
      __typename
    }
  }
`;
export const onUpdateBill = /* GraphQL */ `
  subscription OnUpdateBill($filter: ModelSubscriptionBillFilterInput) {
    onUpdateBill(filter: $filter) {
      id
      cashier
      items {
        nextToken
        startedAt
        __typename
      }
      totalAmount
      status
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeBillsId
      __typename
    }
  }
`;
export const onDeleteBill = /* GraphQL */ `
  subscription OnDeleteBill($filter: ModelSubscriptionBillFilterInput) {
    onDeleteBill(filter: $filter) {
      id
      cashier
      items {
        nextToken
        startedAt
        __typename
      }
      totalAmount
      status
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeBillsId
      __typename
    }
  }
`;
export const onCreatePurchaseOrder = /* GraphQL */ `
  subscription OnCreatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onCreatePurchaseOrder(filter: $filter) {
      id
      purchaser
      image
      vendor
      amount
      date
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storePurchaseOrdersId
      __typename
    }
  }
`;
export const onUpdatePurchaseOrder = /* GraphQL */ `
  subscription OnUpdatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onUpdatePurchaseOrder(filter: $filter) {
      id
      purchaser
      image
      vendor
      amount
      date
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storePurchaseOrdersId
      __typename
    }
  }
`;
export const onDeletePurchaseOrder = /* GraphQL */ `
  subscription OnDeletePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onDeletePurchaseOrder(filter: $filter) {
      id
      purchaser
      image
      vendor
      amount
      date
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storePurchaseOrdersId
      __typename
    }
  }
`;
