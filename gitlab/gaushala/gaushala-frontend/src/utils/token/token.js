export const isloggedIn = () => {
  return (
    !!localStorage.getItem("ACCESS_TOKEN") && !!localStorage.getItem("email")
  );
};

export const logout = () => {
  var deviceId = localStorage.getItem("deviceId");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("user_id");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
