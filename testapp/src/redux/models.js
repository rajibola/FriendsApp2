const baseURL = 'https://reqres.in/api';
const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

export const friends = {
  state: {
    access_token: null,
    register_id: null,
    register_token: null,
    users_data: null,
    user_data: null,
  },

  reducers: {
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
          this.saveAccessToken(json.token);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //

    async registerUser(data, state) {
      const {password, email} = data;
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async listUsers(data, state) {
      await fetch(`${baseURL}/users?page=${data || 1}`)
        .then((response) => response.json())
        .then((json) => {
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
          this.saveUserData(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
