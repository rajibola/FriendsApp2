const baseURL = 'https://reqres.in/api';
const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export const friends = {
  state: {
    isLoading: false,
    access_token: null,
  },
  reducers: {
    toggleLoader(state, status) {
      return {
        ...state,
        isLoading: status,
      };
    },
    saveAccessToken(state, token) {
      return {
        ...state,
        access_token: token,
      };
    },
  },
  effects: {
    async loginUser(data, state) {
      const {password, email} = data;
      console.log(data);
      await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('Success', json);
          this.saveAccessToken(json.token);
          //   alert('your token is ' + json.token);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
