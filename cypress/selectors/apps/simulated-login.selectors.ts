export const SIMULATED_LOGIN_SELECTORS = {
  loginPage: {
    username: "#username",
    password: "#password",
    submit: "#login",
    loginMessage: ".loginmessage",
  },
  adminView: {
    heading: "#adminh",
    adminLoginLink: "#navadminlogin",
    adminLogoutLink: "#navadminlogout",
  },
} as const;
