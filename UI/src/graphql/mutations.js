/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createBillItem = /* GraphQL */ `
  mutation CreateBillItem(
    $input: CreateBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    createBillItem(input: $input, condition: $condition) {
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
export const updateBillItem = /* GraphQL */ `
  mutation UpdateBillItem(
    $input: UpdateBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    updateBillItem(input: $input, condition: $condition) {
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
export const deleteBillItem = /* GraphQL */ `
  mutation DeleteBillItem(
    $input: DeleteBillItemInput!
    $condition: ModelBillItemConditionInput
  ) {
    deleteBillItem(input: $input, condition: $condition) {
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
export const createBill = /* GraphQL */ `
  mutation CreateBill(
    $input: CreateBillInput!
    $condition: ModelBillConditionInput
  ) {
    createBill(input: $input, condition: $condition) {
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
export const updateBill = /* GraphQL */ `
  mutation UpdateBill(
    $input: UpdateBillInput!
    $condition: ModelBillConditionInput
  ) {
    updateBill(input: $input, condition: $condition) {
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
export const deleteBill = /* GraphQL */ `
  mutation DeleteBill(
    $input: DeleteBillInput!
    $condition: ModelBillConditionInput
  ) {
    deleteBill(input: $input, condition: $condition) {
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
export const createPurchaseOrder = /* GraphQL */ `
  mutation CreatePurchaseOrder(
    $input: CreatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    createPurchaseOrder(input: $input, condition: $condition) {
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
export const updatePurchaseOrder = /* GraphQL */ `
  mutation UpdatePurchaseOrder(
    $input: UpdatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    updatePurchaseOrder(input: $input, condition: $condition) {
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
export const deletePurchaseOrder = /* GraphQL */ `
  mutation DeletePurchaseOrder(
    $input: DeletePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    deletePurchaseOrder(input: $input, condition: $condition) {
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
