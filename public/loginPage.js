"use strict";
const userForm = new UserForm();
// попытка залогиниться
userForm.loginFormCallback = data => ApiConnector.login(data, response => (response.success === true) ? location.reload() : userForm.setLoginErrorMessage(response.error));
// попытка зарегистрироваться
userForm.registerFormCallback = data => ApiConnector.register(data, response => (response.success === true) ? location.reload() : userForm.setRegisterErrorMessage(response.error));
