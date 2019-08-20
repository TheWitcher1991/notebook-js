!function ($, window, document) 
{
    'use strict';

    function readyDOM (callback) {

        /* Метод для работы кода после полной загрузки DOM  */

        'use strict';
        
        if (document.readyState != 'loading') callback();
        else document.addEventListener('DOMContentLoaded', callback, false);

        return false
    }

    readyDOM(function () {

        /*  Начинаем работу после полной загрузки DOM */
    
        'use strict';

        const addMessage     = document.querySelector('#add-in'),
              add            = document.querySelector('#add-but'),
              todo           = document.querySelector('#todo'),
              todoImportant  = document.querySelector('#imp-ul'),
              checkFihish    = document.querySelector('#fihish-ul'),
              checkImportant = document.querySelector('#check_important'),
              checkBasket    = document.querySelector('#check_basket');

        function CreateNewElement (task, fihish, importants) {
         
            let li = document.createElement('li');
            li.className= 'list';

            let iBtn = document.createElement('button');
            let baBth = document.createElement('button');

            if (fihish) {
                iBtn.className= 'list-button';
                iBtn.setAttribute('id', 'check_important');
                li.appendChild(iBtn); 
            }  

            // Basket button
            let bBtn = document.createElement('button');
            bBtn.className = 'list-button';
            bBtn.setAttribute('id', 'check_basket');
            li.appendChild(bBtn);

            // Fihish button
            let fBtn = document.createElement('button');
            if (fihish || importants) {
                fBtn.className = 'list-button';
                fBtn.setAttribute('id', 'check_fihish');
                li.appendChild(fBtn);     
            }

            let bDiv = document.createElement('div');
            bDiv.className = 'text';
            bDiv.textContent = task;
            bDiv.style.background = 'rgb(28, 38, 47)';
            li.appendChild(bDiv);

            return li;
            
        }

        function addTask () {
            if (addMessage.value) {
                let listItem = CreateNewElement(addMessage.value, true, false);
                todo.appendChild(listItem);
                bindTaskEvents(listItem);
                addMessage.value = '';
            }
            save();
        }

        add.addEventListener('click', addTask, false);

        function deleteTask () {
            let listItem = this.parentNode,
                ul       = listItem.parentNode;
            ul.removeChild(listItem);
            save();
        }

        function finishTask () {
            let listItem = this.parentNode,
                fihish   = listItem.querySelector('#check_fihish'),
                impotant = listItem.querySelector('#check_important'),
                deletes   = listItem.querySelector('#check_basket')
            fihish.style.display = 'none';
            if (impotant) impotant.style.display = 'none';
            deletes.style.margin = 0;

            checkFihish.appendChild(listItem);
            bindTaskEvents(listItem);
            save();
        }
        
        function importantTask () {
            let listItem = this.parentNode,
                importants = listItem.querySelector('#check_important'),
                li = listItem.querySelector('.text'),
                deletes  = listItem.querySelector('#check_basket'),
                fihish   = listItem.querySelector('#check_fihish');

            deletes.style.margin = 0;
            fihish.style.margin = '0 0 0 394px';
            importants.style.display = 'none';

            todoImportant.appendChild(listItem);
            save();
        }

        function bindTaskEvents (listItem) {
            let important = listItem.querySelector('#check_important'),
                deletes   = listItem.querySelector('#check_basket'),
                fihish    = listItem.querySelector('#check_fihish'),
                back      = listItem.querySelector('#check_back');

            if (important) important.onclick = importantTask;
            deletes.onclick = deleteTask;
            if (fihish) fihish.onclick = finishTask;
        }

        function save () {
            let notTask = [], goodTask = [], importantTask = []; 
            for (let i = 0; i < todo.children.length; i++) 
                notTask.push(todo.children[i].getElementsByTagName('div')[0].innerText);

            console.log(notTask);

            for (let i = 0; i < checkFihish.children.length; i++) 
                goodTask.push(checkFihish.children[i].getElementsByTagName('div')[0].innerText);

            console.log(goodTask)

            for (let i = 0; i < todoImportant.children.length; i++) 
                importantTask.push(todoImportant.children[i].getElementsByTagName('div')[0].innerText);

            console.log(importantTask)

            localStorage.removeItem('todo');
            localStorage.setItem('todo', JSON.stringify({
                goodTasks: goodTask,
                notTasks: notTask,
                impTask: importantTask
            }))
            
        }

        function load () {
            return JSON.parse(localStorage.getItem('todo'));
        }

        let data = load();

        for (let i in data.notTasks) {
            let listItem = CreateNewElement(data.notTasks[i], true, false);
            todo.appendChild(listItem);
            bindTaskEvents(listItem);
        }

        for (let i in data.goodTasks) {
            let listItem = CreateNewElement(data.goodTasks[i], false, false);
            let deletes  = listItem.querySelector('#check_basket');
            deletes.style.margin = 0;
            checkFihish.appendChild(listItem);
            bindTaskEvents(listItem);
        }

        for (let i in data.impTask) {
            let listItem = CreateNewElement(data.impTask[i], false, true);
            let deletes  = listItem.querySelector('#check_basket'),
                fihish   = listItem.querySelector('#check_fihish');
            deletes.style.margin = 0;
            fihish.style.margin = '0 0 0 394px';
            todoImportant.appendChild(listItem);
            bindTaskEvents(listItem);
        }
        
        return false;
    });

    return false;    

}
(window.jQuery, window, document);