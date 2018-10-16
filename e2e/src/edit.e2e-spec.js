Feature('Edit');

Before((I) => {
  I.amOnPage('http://localhost:9080/');
  I.waitInUrl('/search', 2);
  I.fillField({css:'input'}, 'Peyton');
  I.click('button');
  I.seeNumberOfElements('app-search table tbody tr', 1);
  I.click("Peyton Manning");
  I.waitInUrl('/edit/1', 2);
});

const name = '#name';
const street = '#street';
const city = '#city';

Scenario('should allow viewing a person', async (I) => {
  I.seeTextEquals('Peyton Manning', 'h3');
  I.waitForValue(name, 'Peyton Manning');
  I.waitForValue(street, '1234 Main Street');
  I.waitForValue(city, 'Greenwood Village');
});

Scenario('should allow updating a name', (I) => {
  I.appendField('#name', ' Won!');
  I.click('#save');
  // verify one element matched this change
  I.seeNumberOfElements('app-search table tbody tr', 1);
});
