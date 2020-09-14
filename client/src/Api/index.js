const baseUrl = "https://pratilipi-storybook.herokuapp.com/api/";

export default {
  checkUsername: baseUrl + "auth/checkusername",
  login: baseUrl + "auth/login",
  register: baseUrl + "auth/register",
  authorStory: baseUrl + "story/author",
  story: baseUrl + "story",
};
