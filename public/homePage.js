"use strict";
// попытка выйти из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = data => ApiConnector.logout(response => (response.success === true) ? location.reload() : console.log("Выход не успешен"));
// получение информации о текущем пользователе
ApiConnector.current(response => (response.success === true) ? ProfileWidget.showProfile(response.data) : console.log(undefined));
// получение текущих курсов валют
const ratesBoard = new RatesBoard();
let gateRate = ApiConnector.getStocks(response => {
    if (response.success === true) {
        ratesBoard.clearTable(); 
        ratesBoard.fillTable(response.data);
    }
});
setInterval(() => this.gateRate, 60000);

// операции с деньгами
const moneyManager = new MoneyManager();

// функция для проверки операций с деньгами
const checkMoney = (response) => { 
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Операция выполнена успешно");
    } 
    else moneyManager.setMessage(response.success, response.error);
};

// пополнение баланса
moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => checkMoney(response));
// конвертирование валюты
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => checkMoney(response));
// перевод валюты
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => checkMoney(response));
    
// работа с избранным
const favoritesWidget = new FavoritesWidget();
// функция для проверки операций с избранным
const checkUser = (response) => { 
    if (response.success === true) {
        favoritesWidget.clearTable(); 
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, "Операция выполнена успешно");
    } 
    else moneyManager.setMessage(response.success, response.error);
};

// начальный список избранного
ApiConnector.getFavorites(response => {
        if (response.success === true) {
           favoritesWidget.clearTable(); 
           favoritesWidget.fillTable(response.data);
           moneyManager.updateUsersList(response.data);
        }
});
// добавление пользователя в список избранных
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => checkUser(response));
// удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => checkUser(response));


