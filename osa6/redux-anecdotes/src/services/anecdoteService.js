import axios from "axios";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createNew = async content => {
  const object = asObject(content);

  const response = await axios.post(url, object);
  return response.data;
};

const vote = async props => {
  const newVotes = props.votes + 1;
  const object = {
    ...props,
    votes: newVotes
  };
  const anecdoteUrl = url.concat("/", props.id);
  const response = await axios.put(anecdoteUrl, object);
  return response.data;
};

export default {
  getAll,
  createNew,
  vote
};
