export const fetchDataAPI = () => {
  try {
  const postUrl = "https://jsonplaceholder.typicode.com/posts";
  return fetch(postUrl)
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        debugger
        return response;
        
      }
    })
  }
    catch(error)  {
      return " limit excide"
    };
};
export const fetchUser = () => {
  
  const postUrl = "https://jsonplaceholder.typicode.com/users";
  return fetch(postUrl)
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        debugger
        return response;
      }
    })
    .catch((error) => {
      return " limit excide"
    });
};
export const fetchTodos = () => {
  
  const postUrl = "https://jsonplaceholder.typicode.com/todos";
  return fetch(postUrl)
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        debugger
        return response;
      }
    })
    .catch((error) => {
      return " limit excide"
    });
};