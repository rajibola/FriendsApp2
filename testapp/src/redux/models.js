const baseURL = [
  'https://reqres.in/api',
  'https://jobs.github.com/positions.json?',
  'https://jobs.github.com/positions',
];

// const delay = (time) =>
// new Promise((resolve) => setTimeout(() => resolve(), time));

export const friends = {
  state: {
    access_token: null,
    register_id: null,
    register_token: null,
    users_data: null,
    user_data: null,
    jobs_list: [],
    job_data: [],
  },

  reducers: {
    saveJobData(state, jobData) {
      return {
        ...state,
        job_data: jobData,
      };
    },
    saveJobsList(state, jobsList) {
      return {
        ...state,
        jobs_list: jobsList,
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
      await fetch(`${baseURL[0]}/login`, {
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
      await fetch(`${baseURL[0]}/register`, {
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
      await fetch(`${baseURL[0]}/users?page=${data || 1}`)
        .then((response) => response.json())
        .then((json) => {
          this.saveUsersList(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async displayProfile(data, state) {
      await fetch(`${baseURL[0]}/users/${data}`)
        .then((response) => response.json())
        .then((json) => {
          this.saveUserData(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getJobs(data, state) {
      const {description, location} = data;
      await fetch(
        `${baseURL[1]}description=${description}&location=${location}`,
      )
        .then((response) => response.json())
        .then((json) => {
          this.saveJobsList(json);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getJob(data, state) {
      console.log('RECIEVED ID', data);
      await fetch(`${baseURL[2]}/${data}.json?markdown=true`)
        .then((response) => response.json())
        .then((json) => {
          this.saveJobData(json);
        })
        .catch((error) => {
          console.error(error);
          //
        });
    },
  },
};
