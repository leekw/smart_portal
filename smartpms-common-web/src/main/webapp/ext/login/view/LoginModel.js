Ext.define('Ext.login.view.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginmodel',

    data: {
        userid : !Cookies._getCookie("SAVED_USER") ? '' : Cookies._getCookie("SAVED_USER"),
        fullName : '',
        password : '',
        email    : '',
        persist: Cookies._getCookie("SAVED_USER") ? true : false,
        agrees : false
    }
});