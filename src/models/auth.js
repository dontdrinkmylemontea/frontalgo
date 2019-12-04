export default {
  namespage: 'auth',
  state: {
    auth: 3,
  },
  effects: {},
  reducers: {
    setauth: (state, { payload: { auth } }) => ({
      ...state,
      auth,
    }),
  },
};
