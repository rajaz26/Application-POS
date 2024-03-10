/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
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
      warehouseScan {
        nextToken
        startedAt
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
      __typename
    }
  }
`;
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
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
      warehouseScan {
        nextToken
        startedAt
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
      __typename
    }
  }
`;
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
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
      warehouseScan {
        nextToken
        startedAt
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
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createBillItem = /* GraphQL */ `
  mutation CreateBillItem(
    $input: CreateBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    createBillItem(input: $input, condition: $condition) {
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
      storeBillItemsId
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const updateBillItem = /* GraphQL */ `
  mutation UpdateBillItem(
    $input: UpdateBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    updateBillItem(input: $input, condition: $condition) {
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
      storeBillItemsId
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const deleteBillItem = /* GraphQL */ `
  mutation DeleteBillItem(
    $input: DeleteBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    deleteBillItem(input: $input, condition: $condition) {
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
      storeBillItemsId
      productBillItemsId
      billItemsId
      __typename
    }
  }
`;
export const createBill = /* GraphQL */ `
  mutation CreateBill(
    $input: CreateBillInput!
    $condition: ModelBillConditionInput
  ) {
    createBill(input: $input, condition: $condition) {
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
export const updateBill = /* GraphQL */ `
  mutation UpdateBill(
    $input: UpdateBillInput!
    $condition: ModelBillConditionInput
  ) {
    updateBill(input: $input, condition: $condition) {
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
export const deleteBill = /* GraphQL */ `
  mutation DeleteBill(
    $input: DeleteBillInput!
    $condition: ModelBillConditionInput
  ) {
    deleteBill(input: $input, condition: $condition) {
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
export const createPurchaseOrder = /* GraphQL */ `
  mutation CreatePurchaseOrder(
    $input: CreatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    createPurchaseOrder(input: $input, condition: $condition) {
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
export const updatePurchaseOrder = /* GraphQL */ `
  mutation UpdatePurchaseOrder(
    $input: UpdatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    updatePurchaseOrder(input: $input, condition: $condition) {
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
export const deletePurchaseOrder = /* GraphQL */ `
  mutation DeletePurchaseOrder(
    $input: DeletePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    deletePurchaseOrder(input: $input, condition: $condition) {
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
export const createWarehouseScan = /* GraphQL */ `
  mutation CreateWarehouseScan(
    $input: CreateWarehouseScanInput!
    $condition: ModelWarehouseScanConditionInput
  ) {
    createWarehouseScan(input: $input, condition: $condition) {
      id
      scannedBy
      scannedByName
      productId
      productName
      productQuantity
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
      storeWarehouseScanId
      __typename
    }
  }
`;
export const updateWarehouseScan = /* GraphQL */ `
  mutation UpdateWarehouseScan(
    $input: UpdateWarehouseScanInput!
    $condition: ModelWarehouseScanConditionInput
  ) {
    updateWarehouseScan(input: $input, condition: $condition) {
      id
      scannedBy
      scannedByName
      productId
      productName
      productQuantity
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
      storeWarehouseScanId
      __typename
    }
  }
`;
export const deleteWarehouseScan = /* GraphQL */ `
  mutation DeleteWarehouseScan(
    $input: DeleteWarehouseScanInput!
    $condition: ModelWarehouseScanConditionInput
  ) {
    deleteWarehouseScan(input: $input, condition: $condition) {
      id
      scannedBy
      scannedByName
      productId
      productName
      productQuantity
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
      storeWarehouseScanId
      __typename
    }
  }
`;
