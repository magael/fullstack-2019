import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject);
  return request.then(response => response.data);
};

const deleteOne = id => {
  const request = axios.delete(id);
  return request.then(response => response.data);
};

export default { getAll, create, update, setToken, deleteOne };


// import axios from 'axios'
// const baseUrl = '/api/blogs'

// let token = null

// const getConfig = () => ({
//   headers: { Authorization: token }
// })

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

// const destroyToken = () => {
//   token = null
// }

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// const create = async newObject => {
//   const response = await axios.post(baseUrl, newObject, getConfig())
//   return response.data
// }

// const update = async newObject => {
//   const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
//   return response.data
// }

// const remove = async object => {
//   const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
//   return response.data
// }

// export default { getAll, create, update, remove, setToken, destroyToken }