export default {
  namespage: 'auth',
  state: {
    auth: -1,
  },
  effects: {},
  reducers: {
    setauth: (state, { payload: { auth } }) => ({
      ...state,
      auth,
    }),
  },
};
