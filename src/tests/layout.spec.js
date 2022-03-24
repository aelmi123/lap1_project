/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../app/index.html'), 'utf8');
 
 
 describe('index.html', () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();
     })
     describe('head', () => {
         test('it has a title', () => {
             const head = document.querySelector('head')
             expect(head).toBeTruthy();
             const title = document.querySelector('title');
             expect(title).toBeTruthy();
            expect(title.textContent).toEqual('Blog website');
         });
     })
     describe('body', () => {
         test('header exists', () => {
             expect(document.querySelector('h1')).toBeTruthy();
         });
         test('it has a header title', () => {
             let header = document.querySelector('h1');
             expect(header.textContent).toContain('Blog Diaries');
         })
         test('it has a share now button', () => {
             let shareItemBtn = document.querySelector('#share');
             expect(shareItemBtn).toBeTruthy();
            //  expect(screen.getByDisplayValue('Share Now')).toBeInTheDocument();
         })
     })
 })
