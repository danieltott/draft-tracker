const action = (type, payload = {}) => ({
  type,
  payload: { ...payload },
})

export default action
