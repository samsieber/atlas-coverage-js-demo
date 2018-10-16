Feature('Search');

Before((I) => {
  I.amOnPage('http://localhost:9080/');
  I.waitInUrl('/search', 2);
});

Scenario('should have an input and search button', (I) => {
  I.seeElement('app-root app-search form input');
  I.seeElement('app-root app-search form button');
});

Scenario('should allow searching', (I) => {
  I.fillField({css:'input'}, 'M');
  I.click('button');
  I.seeNumberOfElements('app-search table tbody tr', 3);
});
