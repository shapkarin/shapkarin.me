---
title: "saga-fetch: Streamline API Calls in Redux Saga Applications"
description: "Learn how to simplify AJAX requests in Redux Saga with saga-fetch. Handle loading states, success/error responses, and request cancellation with minimal boilerplate code."
---

If you’ve used Redux Saga before, you know how convenient it can be for handling complex async workflows in a Redux application. Instead of juggling `fetch` calls or `axios` requests directly in your React components, you write sagas that can watch for certain actions, start asynchronous tasks, handle cancellations, and dispatch results when they’re done. It keeps your code cleaner, more predictable, and easier to test.

However, even with Redux Saga, you often end up writing a fair amount of boilerplate whenever you need to handle AJAX requests. You’ll dispatch a start action, then when the request resolves you’ll dispatch a success action, or if it fails you’ll dispatch an error action. Afterward, you might need a “fulfill” action to clean up. This pattern shows up in almost every async scenario: loading indicators, data fetching, error states, and so on.

**Enter `saga-fetch`.** This small utility helps streamline these common patterns. Instead of manually writing all the boilerplate around `fetch` or `axios` calls inside your sagas, you can let `saga-fetch` handle it. You just tell it which actions to dispatch on start, success, error, and optionally on fulfill or cancel, and it takes care of the heavy lifting.

## Getting Started

First, install the package:

```bash
npm install saga-fetch
```

or with Yarn:

```bash
yarn add saga-fetch
```

Then, import `fetchWorker` (the main function) into your saga and use it inside a worker function. You’ll pass in a configuration object that tells `fetchWorker` how to handle the entire request lifecycle.

## Configuration Options

When you call `fetchWorker`, you provide it with a set of actions and a method. Let’s break down the required and optional arguments:

- **`action` (required):** The Redux action you’re handling in your saga worker. This typically comes from a watcher saga (e.g., `takeEvery` or `takeLatest`) when something is dispatched like `SEARCH_PAGE`.
  
- **`method` (required):** A function that takes the `action` and returns a Promise, typically using either `fetch()` or `axios.get()`. This is your actual API call logic.
  
- **`start` (required):** An action creator dispatched as soon as the request begins. This is where you might toggle a loading flag in your reducer.
  
- **`success` (required):** An action creator dispatched if the request resolves successfully. The response data from your API call will be passed to this action as a payload.
  
- **`error` (required):** An action creator dispatched if the request fails. It will receive the error object so you can handle it gracefully (e.g., show an error message).

- **`fulfill` (optional):** If you provide this action, it’s dispatched at the end of the request, no matter if it succeeded or failed. This is handy for always resetting a loading state or doing cleanup.
  
- **`cancel` (optional):** By default, if the saga is cancelled, `saga-fetch` will dispatch a `CANCELLED` action type derived from your original `action`. You can also specify a custom cancel action. Note that this doesn’t automatically cancel the underlying AJAX request—if you want true cancellation, you’ll need to handle it in your `method` function (for example, by using axios’ cancel tokens).

## Basic Example

Imagine you have some actions: `searchPagesStart`, `searchPagesSuccess`, `searchPagesError`, and `searchPagesFulfill`. Your API call might look like this:

```js
const searchPages = ({ payload: { title } }) => fetch(`/search/pages?title=${title}`);
```

Your saga worker could then be:

```js
import { fork, takeEvery } from 'redux-saga/effects';
import fetchWorker from 'saga-fetch';

function* searchPagesWorker(action) {
  yield fork(fetchWorker, {
    action,
    method: searchPages,
    start: searchPagesStart,
    success: searchPagesSuccess,
    error: searchPagesError,
    fulfill: searchPagesFulfill,
  });
}

function* searchPagesWatcher() {
  yield takeEvery('SEARCH_PAGE', searchPagesWorker);
}
```

Here’s what happens when `SEARCH_PAGE` is dispatched:

1. `searchPagesStart` fires immediately (you might set `loading: true` in your store).
2. The `searchPages` method runs, hitting your `/search/pages` endpoint.
3. On a successful response, `searchPagesSuccess` fires with the data.
4. If there’s an error, `searchPagesError` gets dispatched with the error.
5. Regardless of success or failure, `searchPagesFulfill` runs at the end, letting you do any final state changes (like `loading: false`).

## A More Advanced Example

What if you want to integrate this with other libraries like `redux-saga-routines`, `redux-actions`, or `axios`? Here’s a quick taste:

- Use `axios` with a cancel token for real cancellation support.
- Delay the request slightly to simulate some waiting time.
- Use `redux-saga-routines` to generate a set of standard actions.

```js
import { fork, takeLatest, delay } from 'redux-saga/effects';
import fetch from 'saga-fetch';
import axios, { CancelToken } from 'axios';
import { createRoutine } from 'redux-saga-routines';

const search = createRoutine('search/pages');

// Define your API method with axios:
export const searchPages = ({ payload: { title } }) => {
  const source = CancelToken.source();
  const request = axios.get(`/search/pages?title=${title}`, { cancelToken: source.token });
  request[CANCEL] = () => source.cancel(); // enabling saga cancellation
  return request;
};

function* searchPagesWorker(action) {
  // Optional delay
  yield delay(142);
  yield fork(fetch, {
    action,
    method: searchPages,
    start: search.request,
    success: search.success,
    error: search.failure,
    fulfill: search.fulfill,
  });
}

export default function* searchPagesWatcher() {
  yield takeLatest(search.TRIGGER, searchPagesWorker);
}
```

In your reducer, you can handle these routine actions with `handleActions` from `redux-actions`:

```js
import { handleActions } from 'redux-actions';
import search from './routines';

const initialState = {
  loading: false,
  error: { message: '', code: 0 },
  results: [],
};

export default handleActions({
  [search.REQUEST]: state => ({
    ...state,
    loading: true,
  }),

  [search.SUCCESS]: (state, { payload: results }) => ({
    ...state,
    results,
  }),

  [search.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
  }),

  [search.FULFILL]: state => ({
    ...state,
    loading: false,
  }),
}, initialState);
```

`search.FULFILL` runs after either `search.SUCCESS` or `search.FAILURE`, ensuring that your `loading` state always returns to `false` at the end.

## Additional Notes

If you need a `CANCELLED` state or want to customize cancellation behavior further, check out [extend-saga-routines](https://www.npmjs.com/package/extend-saga-routines) for advanced routine handling. With `axios` and cancel tokens, you can cleanly integrate saga cancellation logic and ensure that requests are actually aborted in-flight.

---

**In summary**, `saga-fetch` helps you avoid repetitive boilerplate when handling async requests in Redux Saga. By providing a clear configuration object that specifies what to do on start, success, error, and optional fulfill/cancel steps, you can keep your sagas lean and focused on logic rather than wiring up a bunch of actions. Whether you’re using `fetch`, `axios`, `redux-saga-routines`, or just plain `redux-actions`, `saga-fetch` slides right in to streamline your workflow.