export const authReducer = (state, action) => {
  switch (action.type) {
    case '[AUTH] - login':
      return {
        ...state,
        isLoggedin: true,
        user: action.payload,
        // userId: action.payload.id,
        // userFullName: `${action.payload.user_name} ${action.payload.last_nam}`
      }
    case '[AUTH] - logout':
      return {
        ...state,
        isLoggedin: false,
        isSuperAdmin: false,
        token: '',
        user: {},
      }
    default: {
      return state
    }
  }
}
