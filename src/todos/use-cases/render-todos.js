import { createTodoHtml } from "./create-todo-html";

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    if ( !element )
        element = document.querySelector( elementId );

    if ( !element ) throw new Error( `El elemeto ${ elementId } no funciona ` );
        element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHtml( todo ) );
    });
};