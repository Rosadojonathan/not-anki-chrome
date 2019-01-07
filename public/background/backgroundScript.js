/* global chrome */
// import {wrapStore} from 'react-chrome-redux';
// import {createStore} from 'redux';
// import reducer from '../../src/reducers';

// const store = createStore(reducer); // a normal Redux store

// wrapStore(store, {portName: 'NOT_ANKI'});

let windowId = 0;

function closeIfExist() {
  if (windowId > 0) {
    chrome.windows.remove(windowId);
    windowId = chrome.windows.WINDOW_ID_NONE;
  }
}

function popWindow(type) {
    closeIfExist();
    const options = {
      type: 'popup',
      left: 100,
      top: 100,
      width: 800,
      height: 475,
    };
    if (type === 'open') {
      options.url = 'index.html';
      chrome.windows.create(options, (win) => {
        windowId = win.id;
      });
    }
  }

chrome.contextMenus.create({ 
    id: 'NotAnkiFetcher',
    title: 'Not Anki',
    contexts: ['all']
  });

  chrome.contextMenus.onClicked.addListener((event) => {
      if (event.menuItemId === 'NotAnkiFetcher'){
          popWindow('open');
      }  
});