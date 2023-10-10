

export const productReducer = (state, action) => {

  switch (action.type) {
    
    case '[PRODUCT] - loading':
      return {
        ...state,
        loadingProducts: action.payload
      }
    case '[PRODUCT] - products':
      return {
        ...state,
        products: action.payload
      }
    case '[PRODUCT] - new_product':
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case '[PRODUCT] - edit':
      return {
        ...state,
        singleProduct: action.payload
      }
    case '[PRODUCT] - updated':
      return {
        ...state,
        products: state.products.map( (product) => product.product_code === action.payload.product_code ? action.payload : product)
      }
    case '[PRODUCT] - delete':
      return {
        ...state,
        singleProduct: action.payload
      }
    case '[PRODUCT] - deleted':
      return {
        ...state,
        products: state.products.filter( (product) => product.product_code != action.payload )
      }
    case '[PRODUCT] - logout':
      return {
        ...state,
        products: [],
        loadingProducts: true,
        singleProduct: {},
      }
    default: {
      return state
    }
  }
}