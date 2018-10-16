Feature('App');

Scenario('should display welcome message', (I) => {
  I.amOnPage('/');
  I.waitInUrl('/search', 2);
  I.waitForText("Welcome to app!");
});
