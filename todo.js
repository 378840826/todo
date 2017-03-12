/*
1，基础html
2，获取输入框内容，生成 html ，插入到页面
3，绑定事件，完成，删除功能
4，保存数据
*/

//辅助函数
//定义 log 函数
const log = function() {
    console.log.apply(console, arguments)
}

//定义 toggleClass 函数
const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}





//功能函数
//定义 生成要插入的 html 的函数
var templateTodo = function(todo) {
    var t = `
            <div class="todos">
                <span class="todo_content">${todo}</span>
                <span class="state">未完成</span>
                <div class="control_buttons">
                    <button class="button_done" type="button">完成</button>
                    <button class="button_delete" type="button">删除</button>
                </div>
            </div>
        `
        return t
}

//定义 插入 todo 到页面中 的函数
var insertTodo = function(todo) {
    var container = document.querySelector('.container')
    var t = templateTodo(todo)
    container.innerHTML += t
}

//定义 添加 todo(插入生成的 html) 的函数
var appendHtml = function() {
    var input = document.querySelector('.new_todo_input')
    var todo = input.value
    //把 todo 插入到页面中
    insertTodo(todo)
    //添加后，保存结果到 localStorage
    saveTodos()
}

//定义 完成、删除按钮功能 函数
var operatingButtons = function(event) {
    var e = event.target
    if (e.classList.contains('button_delete')) {
        //如果是删除按钮
        // closest()方法，往上层节点找到第一个包含参数（元素选择器）的节点
        var p = e.closest('.todos')
        //删除这个节点
        p.remove()
        //删除后，保存结果到 localStorage
        saveTodos()
    } else if (e.classList.contains('button_done')) {
        //如果是完成按钮
        var p = e.closest('.todos')
        //切换一个 class
        toggleClass(p, 'done')
        var state = p.querySelector('.state')
        //改变完成状态描述
        if (state.innerText == '未完成') {
            state.innerText = '完成'
        } else {
            state.innerText = '未完成'
        }
    }
}

//定义 把一个数组写入到 localStorage 的函数
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

//定义 把 localStorage 中的数据解析返回 的函数
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

//定义 用 save函数保存所有 todo 的函数
var saveTodos = function() {
    //得到所有包含 todo 的标签
    var contents = document.querySelectorAll('.todo_content')
    var todos = []
    //遍历获得所有 todo 项
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var t = c.innerHTML
        todos.push(t)
    }
    //用 save 保存到浏览器 localStorage 中
    save(todos)
}

//定义 加载保存的 localStorage 中的数据 的函数
var loadTodos = function() {
    //获得 localStorage 中的数据
    var todos = load()
    //循环添加到页面中
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        //插入 todo 到页面中
        insertTodo(todo)
    }
}





//绑定事件
//给 add 按钮绑定事件，添加 todo 项目
var bindAdd = function() {
    var addButton = document.querySelector('.button_addtodo')
    addButton.addEventListener('click',appendHtml)
}

//委托绑定删除、完成按钮事件
//找到一直存在的父元素
var bindOperatingButtons = function() {
    var container = document.querySelector('.container')
    container.addEventListener('click', operatingButtons)
}





//绑定所有事件集合
var bindAll = function() {
    bindAdd()
    bindOperatingButtons()
}

//主函数
var __main = function() {
    bindAll()
    //加载所有 todo
    loadTodos()
}

//程序入口
__main()
