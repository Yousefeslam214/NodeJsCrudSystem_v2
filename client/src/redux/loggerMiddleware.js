// loggerMiddleware.js
const loggerMiddleware = (storeAPI) => (next) => (action) => {
    console.log('Dispatching action:', action); // Logs the action being dispatched
    let result = next(action); // Process the action
    console.log('Updated state:', storeAPI.getState()); // Logs the state after processing the action
    return result; // Return the result
};

export default loggerMiddleware;
