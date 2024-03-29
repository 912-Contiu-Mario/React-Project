import { test, expect } from '@playwright/test';import App from '../src/App';
import React from 'react';

test.use({ viewport: { width: 500, height: 500 } });

test('test for home component', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  const name = await page.innerText(`h2`);
  expect(name).toBe('Tanks wiki');
  const button = await page.getByTestId('continueButton');
  await button.click();
});



test('test add tank button', async ({page}) =>{
    await page.goto('http://localhost:3000/');
    await page.getByTestId('continueButton').click();
    await page.getByTestId('addTankButton').click();

    const url = page.url();
    if ('http://localhost:3000/' !== url) {
      console.log('Navigation successful!');
    } else {
      console.log('Navigation did not occur.');
    }

   
    
    
});


test('addTest', async ({ page }) => {

  await page.goto('http://localhost:3000/tanks/add');
  await page.getByLabel('Tank Name').fill('Abrahams');

  
  await page.click('#countrySelector');
  await page.click('text=USA');

  await page.click('#typeSelector');
  await page.click('text=Heavy Tank');


  await page.getByLabel('Year').fill('1960');
  await page.getByLabel('Firepower').fill('100');
  await page.getByLabel('Speed').fill('50');
  await page.click('[data-testid="submitButton"]');

  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams');
  expect(pageText).toContain('USA');
  expect(pageText).toContain('Heavy');
});


test('updateTest', async ({ page }) => {
  await page.goto('http://localhost:3000/tanks');
  await page.click('[data-testid="updateButton"]');
  await page.getByLabel('Tank Name').fill('Abrahams2');
  await page.click('#updateButton');
  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams2');
});


test('deleteTest', async ({ page }) => {

  await page.goto('http://localhost:3000/tanks/add');
  await page.getByLabel('Tank Name').fill('Abrahams');
  await page.click('#countrySelector');
  await page.click('text=USA');

  await page.click('#typeSelector');
  await page.click('text=Heavy Tank');

  await page.getByLabel('Year').fill('1990');
  await page.getByLabel('Firepower').fill('100');
  await page.getByLabel('Speed').fill('50');
  await page.click('[data-testid="submitButton"]');

  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams');
  expect(pageText).toContain('USA');
  expect(pageText).toContain('Heavy');

  await page.click('[data-testid="deleteButton"]');
  await page.click('#comfirmDelete');
  const text = await page.innerText('body');
  expect(text).not.toContain('Abrahams');
});


  

