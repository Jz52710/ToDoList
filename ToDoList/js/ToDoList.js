window.onload = function(){
    let data = localStorage.todolist ? JSON.parse(localStorage.todolist):[]

    let doingCon = document.querySelector('.doingCon')
    let doneCon = document.querySelector('.doneCon')
    let num1 = document.querySelector(".num1")
    let num2 = document.querySelector(".num2")

    // 渲染
    render()
    function render(){
        let con1 = ""  // 上面
        let con2 = ""  // 下面
        let arrs = ""
        let arrx = ""
        data.forEach(function(item,index){
            if(item.done){
                con2+=` <div class="dw">
                <input type="checkbox" checked index='${index}' tp="done">
                <p index=${index}>${item.title}</p>
                <div class="jian" index=${index}>-</div>
            </div>`
                arrx += index
            }else{
                con1+=` <div class="dw">
                <input type="checkbox" index="${index}" tp="doing">
                <p index=${index}>${item.title}</p>
                <div class="jian" index=${index}>-</div>
            </div>`
                arrs += index
            }
        })
        num1.innerHTML = arrs.length
        num2.innerHTML = arrx.length
        doingCon.innerHTML = con1
        doneCon.innerHTML = con2
        localStorage.todolist = JSON.stringify(data)
    }

    //修改
    let input = document.querySelector("#input")
    input.onkeydown = function(event){
        if(event.keyCode==13 && this.value!="" ){
            data.unshift({'title':this.value,done:false})
            this.value=""
            render()
        }
    }

    //移动
    let main = document.querySelector(".main")
    main.onclick = function(event){
        let target = event.target
        if(target.nodeName=="INPUT" && target.getAttribute("type")=="checkbox"){
            let index = target.getAttribute("index")
            if(target.getAttribute("tp")=="doing"){
                data[index].done = true
            }else{
                data[index].done = false
            }
            render()
        }
        if(target.nodeName=="DIV"){
            let index = target.getAttribute("index")
            data.splice(index,1)
            render()
        }

    }
    main.ondblclick = function(event){
        let target = event.target
        if(target.nodeName=="P"){
            let con = target.innerHTML
            let index = target.getAttribute('index')
            target.innerHTML = ""
            let input = document.createElement("input")
            input.value = con
            input.onblur = function(){
                data[index].title = this.value
                render()
            }
            target.appendChild(input)
            input.focus()

        }
    }
    //清除所有
    let clear = document.querySelector(".foot")
    clear.onclick = function () {
        data.length = 0
        render()
    }
    //加数目
    // let arrs = []
    // let arrx = []
    // data.forEach(function (item, index) {
    //     if (item.done) {
    //         arrs +=1
    //     }else {
    //         arrx +=1
    //     }
    // })





}


