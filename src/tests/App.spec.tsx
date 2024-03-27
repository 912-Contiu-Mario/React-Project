import { test, expect } from '@playwright/test';import App from '../App';
import React from 'react';
import Tanks from '../Components/Tanks';

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
  await page.getByLabel('Country').fill('USA');
  await page.getByLabel('Type').fill('Heavy');
  await page.getByLabel('Year').fill('2021');
  await page.getByLabel('Firepower').fill('100');
  await page.getByLabel('Speed').fill('100');
  await page.click('[data-testid="submit-button"]');

;
  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams');
  expect(pageText).toContain('USA');
  expect(pageText).toContain('Heavy');




});


test('updateTest', async ({ page }) => {
  await page.goto('http://localhost:3000/tanks');
  await page.click('[data-testid="upateButton"]');
  await page.getByLabel('Tank Name').fill('Abrahams2');
  await page.click('[data-testid="updateTank"]');
  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams2');
});


test('deleteTest', async ({ page }) => {

  await page.goto('http://localhost:3000/tanks/add');
  await page.getByLabel('Tank Name').fill('Abrahams');
  await page.getByLabel('Country').fill('USA');
  await page.getByLabel('Type').fill('Heavy');
  await page.getByLabel('Year').fill('2021');
  await page.getByLabel('Firepower').fill('100');
  await page.getByLabel('Speed').fill('100');
  await page.click('[data-testid="submit-button"]');

;
  const pageText = await page.innerText('body');
  expect(pageText).toContain('Abrahams');
  expect(pageText).toContain('USA');
  expect(pageText).toContain('Heavy');

  await page.click('[data-testid="deleteButton"]');
  await page.click('[data-testid="comfirm"]');
  const text = await page.innerText('body');
  expect(text).not.toContain('Abrahams');
});


  

