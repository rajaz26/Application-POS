/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
export const onCreateBillItem = /* GraphQL */ `
  subscription OnCreateBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onCreateBillItem(filter: $filter) {
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
export const onUpdateBillItem = /* GraphQL */ `
  subscription OnUpdateBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onUpdateBillItem(filter: $filter) {
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
export const onDeleteBillItem = /* GraphQL */ `
  subscription OnDeleteBillItem($filter: ModelSubscriptionBillItemFilterInput) {
    onDeleteBillItem(filter: $filter) {
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
export const onCreateBill = /* GraphQL */ `
  subscription OnCreateBill($filter: ModelSubscriptionBillFilterInput) {
    onCreateBill(filter: $filter) {
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
export const onUpdateBill = /* GraphQL */ `
  subscription OnUpdateBill($filter: ModelSubscriptionBillFilterInput) {
    onUpdateBill(filter: $filter) {
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
export const onDeleteBill = /* GraphQL */ `
  subscription OnDeleteBill($filter: ModelSubscriptionBillFilterInput) {
    onDeleteBill(filter: $filter) {
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
export const onCreatePurchaseOrder = /* GraphQL */ `
  subscription OnCreatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onCreatePurchaseOrder(filter: $filter) {
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
export const onUpdatePurchaseOrder = /* GraphQL */ `
  subscription OnUpdatePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onUpdatePurchaseOrder(filter: $filter) {
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
export const onDeletePurchaseOrder = /* GraphQL */ `
  subscription OnDeletePurchaseOrder(
    $filter: ModelSubscriptionPurchaseOrderFilterInput
  ) {
    onDeletePurchaseOrder(filter: $filter) {
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
