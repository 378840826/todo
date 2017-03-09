/*
1，基础html
2，获取输入框内容，生成 html ，插入到页面
*/


//定义log
const log = function() {
    console.log.apply(console, arguments)
}

//定义 toggleClass
const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}


//获取 input 的内容 ,生成 html
var appendHtml = function() {
    var input = document.querySelector('.new_todo_input')
    var val = input.value
    var t = `
            <div class="todos">
                <span>${val}</span>
                <span class="state">未完成</span>
                <div class="control_buttons">
                    <button class="button_done" type="button">完成</button>
                    <button class="button_delete" type="button">删除</button>
                </div>
            </div>
        `
    var container = document.querySelector('.container')
    container.innerHTML += t
}

//给 add 按钮绑定事件，添加项目
var bindAdd = function() {
    var addButton = document.querySelector('.button_addtodo')
    addButton.addEventListener('click',appendHtml)
}

//事件委托，绑定删除、完成按钮事件
//找到一直存在的父元素
var container = document.querySelector('.container')
container.addEventListener('click', function(event) {
    var e = event.target
    if (e.classList.contains('button_delete')) {
        //如果是删除按钮
        // closest()方法，往上层节点找到第一个包含参数（元素选择器）的节点
        var p = e.closest('.todos')
        //删除这个节点
        p.remove()
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
})







//绑定所有事件
var bindAll = function() {
    bindAdd()
}

//主函数
var __main = function() {
    bindAll()
}

//程序入口
__main()
