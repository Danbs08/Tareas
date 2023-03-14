import html from "./app.html?raw";
import todoStore, { Filters }  from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";

const elementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
};
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( elementIds.TodoList, todos );
        updatePendingCount();
    };

    const updatePendingCount = () => {
        renderPending( elementIds.PendingCountLabel );
    };

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement( 'div' );
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( elementIds.NewTodoInput );
    const todoListUl = document.querySelector( elementIds.TodoList );
    const ClearCompletedButton = document.querySelector( elementIds.ClearCompletedButton );
    const filtersLis = document.querySelectorAll( elementIds.TodoFilters );

    // Listeners
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = "";
    });

    todoListUl.addEventListener( 'click', ( event ) => {
        const element = event.target.closest( '[ data-id ]' );
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
        console.log(element)
    });

    todoListUl.addEventListener( 'click', ( event ) => {
        const deleteTodoInput = event.target.className === 'destroy';
        const element = event.target.closest( '[ data-id ]' );
        if ( !deleteTodoInput || !element ) return;
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    ClearCompletedButton.addEventListener( 'click',  () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLis.forEach( element => {
        element.addEventListener('click', ( element ) => {
            filtersLis.forEach( el => el.classList.remove('selected'));
            element.target.classList.add( 'selected' );
            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            };
            displayTodos();
        });
    });
};