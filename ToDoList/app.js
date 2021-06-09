let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e =>{
    //避免表單被提交
    e.preventDefault();

    //取得表單value
    let form = e.target.parentElement;
    //children return HTMLCollection
    //childNodes return NodeList
    let todoText = form.children[0].value;
    let todoMon = form.children[1].value;
    let todoDay = form.children[2].value;

    if(todoText === ""){
        alert("Please Enter The Text!");
        //這裡的return不是為了回傳什麼value，而是為了跳出這個addEventListner，避免在沒有輸入任何代辦事項時，下方還是出現沒有value的代辦事項
        return;
    }
    //避免使用者輸入錯誤月份，parseInt的用法是 => parseInt( string , radix); radix指的是用幾進位去換算，這裡是月份所以用10進位
    else if(parseInt(todoMon,10) > 12){
        alert("Please Enter The Correct Month");
        return;
    }

    //避免使用者輸入錯誤日期，parseInt的用法是 => parseInt( string , radix); radix指的是用幾進位去換算，這裡是日期所以用10進位
    else if(parseInt(todoDay, 10) > 31){
        alert("Please Enter The Correct Day");
        return;
    }

    //create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;

    let todo_time = document.createElement("P");
    todo_time.classList.add("todo-time");
    todo_time.innerText = todoMon + "/" + todoDay;

    todo.appendChild(text);
    todo.appendChild(todo_time);

    //新增完成及刪除icon
    let comleteButton = document.createElement("button");
    comleteButton.classList.add("complete");
    comleteButton.innerHTML = '<i class="far fa-check-circle"></i>';
    comleteButton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="far fa-trash-alt"></i>';

    trashButton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        //為了讓todoItem在scaleDown動畫結束後remve，所以對todoItem使用addEventListener
        todoItem.addEventListener("animationend",() =>{

            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item,index)=> {
                if(item.todoText == text){
                    //array的splice語法=> splice(從哪個位置開始,要刪除幾個元素,要新增的元素)
                    myListArray.splice(index, 1);
                    localStorage.setItem("list",JSON.stringify(myListArray));
                }
            })
            todoItem.remove();

        })

        todoItem.style.animation = "scaleDown 0.5s forwards"
        
    })

    todo.appendChild(comleteButton);
    todo.appendChild(trashButton);

    //製造逐漸放大效果
    todo.style.animation = "scaleUp 0.5s forwards"

    //先做出一個object用來儲存待辦事項的所有資料
    let myTodo = {
        todoText: todoText,
        todoMon: todoMon,
        todoDay: todoDay
    }


    //將代辦事項以object的形式，儲存到一個array裡面，並存在localStorage，這樣在關閉瀏覽器後，下次打開還能看到之前的待辦事項
    let myList = localStorage.getItem("list");
    if(myList == null ){
        //如果localStorage是空的，就把新增的待辦事項新增到localStorage
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }
    else{
        //如果localStorage不為空，則先把舊的資料轉型成原本的array資料類型
        let myListArray = JSON.parse(myList);
        //轉換成原本的array資料類型後，用push把新一筆資料加進array
        myListArray.push(myTodo);
        //在把新增好最新一筆待辦事項的array，存到localStorage裡面
        localStorage.setItem("list", JSON.stringify(myListArray));

    }


 
    //為了在新增待辦事項後，清空input的欄位
    todoText = form.children[0].value = "";
    section.appendChild(todo);
})

//做出打開網頁後能顯示出localStorage裡的待辦事項資料

let myList = localStorage.getItem("list");
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {

        //像上面一樣做出todo待辦事項(新增後顯示在下面)
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
    
        let todo_time = document.createElement("P");
        todo_time.classList.add("todo-time");
        todo_time.innerText = item.todoMon + "/" + item.todoDay;
    
        todo.appendChild(text);
        todo.appendChild(todo_time);

        //像上面一樣做出按鈕以及按鈕觸發的效果
        let comleteButton = document.createElement("button");
        comleteButton.classList.add("complete");
        comleteButton.innerHTML = '<i class="far fa-check-circle"></i>';
        comleteButton.addEventListener("click",e =>{
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");
            console.log(todoItem.children);
        })

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="far fa-trash-alt"></i>';

        trashButton.addEventListener("click",e =>{
            let todoItem = e.target.parentElement;
            //為了讓todoItem在scaleDown動畫結束後remve，所以對todoItem使用addEventListener
            todoItem.addEventListener("animationend",() =>{
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item,index) => {
                    if(item.todoText == text){
                        myListArray.splice(index, 1);
                        localStorage.setItem("list",JSON.stringify(myListArray));
                    }
                })
            todoItem.remove();
            
        })

        todoItem.style.animation = "scaleDown 0.5s forwards"
        })

        todo.appendChild(comleteButton);
        todo.appendChild(trashButton);

        section.appendChild(todo);
    })
}

