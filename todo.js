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
var templateTodo = function(todo, done) {
    //把 todo 内容，和完成状态的 class 一起写入
    //默认未完成(设置完成状态的class名为空)
    var status = ''
    var describe = '未完成'
    //如果 done 为 true，则说明这条 todo 是已完成状态
    if (done) {
        //就加上 'done' 这个 css
        status = 'done'
        //把描述改成'完成'
        describe = '完成'
    }
    var t = `
            <div class="todos ${status}">
                <span class="todo_content">${todo}</span>
                <span class="state">${describe}</span>
                <div class="control_buttons">
                    <button class="button_done" type="button">完成</button>
                    <button class="button_delete" type="button">删除</button>
                </div>
            </div>
        `
        return t
}

//定义 插入 todo 到页面中 的函数
var insertTodo = function(todo, done) {
    var container = document.querySelector('.container')
    var t = templateTodo(todo, done)
    container.innerHTML += t
}

//定义 添加 todo(插入生成的 html) 的函数
var appendHtml = function() {
    var input = document.querySelector('.new_todo_input')
    var todo = input.value
    //把 todo 插入到页面中，并且把是否完成状态也传进去,默认是未完成
    insertTodo(todo, false)
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
        //切换状态，保存状态结果到 localStorage
        saveTodos()
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
        // todo 项
        var content = c.innerHTML
        //完成状态(得到一个布尔值，父元素有'done'这个 class 就是 true(已完成))
        var done = c.parentElement.classList.contains('done')
        //保存 todo 和 完成状态
        var todo = {
            done: done,
            content: c.innerHTML,
        }
        // var todo = c.innerHTML
        todos.push(todo)
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
        insertTodo(todo.content, todo.done)
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
