export default {
  namespage: 'auth',
  state: {
    auth: {},
  },
  effects: {},
  reducers: {
    setauth: (state, { payload: { auth } }) => ({
      ...state,
      auth,
    }),
  },
};
