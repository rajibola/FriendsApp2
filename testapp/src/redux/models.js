const baseURL = 'https://reqres.in/api';
const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export const friends = {
  state: {
    isLoading: false,
    access_token: null,
    register_id: null,
    register_token: null,
    users_data: null,
    user_data: null,
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
    saveRegisterId(state, id) {
      return {
        ...state,
        register_id: id,
      };
    },
    saveRegisterToken(state, token) {
      return {
        ...state,
        register_token: token,
      };
    },

    saveUsersList(state, users) {
      return {
        ...state,
        users_data: users,
      };
    },

    saveUserData(state, userData) {
      return {
        ...state,
        user_data: userData,
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

    //

    async registerUser(data, state) {
      const {password, email} = data;
      console.log(data);
      await fetch(`${baseURL}/register`, {
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
          this.saveRegisterId(json.id);
          this.saveRegisterToken(json.token);
          console.log(json);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async listUsers(data, state) {
      await fetch(`${baseURL}/users?page=${data || 1}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          // return this.setState({ data: json.data, isLoading: false });
          this.saveUsersList(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async displayProfile(data, state) {
      await fetch(`${baseURL}/users/${data}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.saveUserData(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
