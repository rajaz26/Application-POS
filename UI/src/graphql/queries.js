/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userId
      username
      phonenumber
      image
      role
      idcardimage
      bills {
        nextToken
        startedAt
        __typename
      }
      purchaserorder {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        username
        phonenumber
        image
        role
        idcardimage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        username
        phonenumber
        image
        role
        idcardimage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      barcode
      images
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
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        barcode
        images
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
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        barcode
        images
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
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getBillItem = /* GraphQL */ `
  query GetBillItem($id: ID!) {
    getBillItem(id: $id) {
      product {
        id
        name
        barcode
        images
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
        __typename
      }
      quantity
      productPrice
      subtotal
      category
      manufacturer
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      billItemsId
      __typename
    }
  }
`;
export const listBillItems = /* GraphQL */ `
  query ListBillItems(
    $filter: ModelBillItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBillItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        quantity
        productPrice
        subtotal
        category
        manufacturer
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        billItemsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBillItems = /* GraphQL */ `
  query SyncBillItems(
    $filter: ModelBillItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBillItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        quantity
        productPrice
        subtotal
        category
        manufacturer
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        billItemsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getBill = /* GraphQL */ `
  query GetBill($id: ID!) {
    getBill(id: $id) {
      id
      cashier {
        id
        userId
        username
        phonenumber
        image
        role
        idcardimage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      items {
        nextToken
        startedAt
        __typename
      }
      totalAmount
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userBillsId
      __typename
    }
  }
`;
export const listBills = /* GraphQL */ `
  query ListBills(
    $filter: ModelBillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalAmount
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userBillsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBills = /* GraphQL */ `
  query SyncBills(
    $filter: ModelBillFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBills(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        totalAmount
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userBillsId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getPurchaseOrder = /* GraphQL */ `
  query GetPurchaseOrder($id: ID!) {
    getPurchaseOrder(id: $id) {
      id
      purchaser {
        id
        userId
        username
        phonenumber
        image
        role
        idcardimage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      image
      vendor
      amount
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userPurchaserorderId
      __typename
    }
  }
`;
export const listPurchaseOrders = /* GraphQL */ `
  query ListPurchaseOrders(
    $filter: ModelPurchaseOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchaseOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        vendor
        amount
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userPurchaserorderId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPurchaseOrders = /* GraphQL */ `
  query SyncPurchaseOrders(
    $filter: ModelPurchaseOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPurchaseOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        image
        vendor
        amount
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userPurchaserorderId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
