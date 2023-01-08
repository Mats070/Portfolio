function appendOperation(operation) {
    var container = document.getElementById("result-area");
    if (container.classList.contains("result")){
        container.innerHTML = operation
        container.classList.remove("result")
    }else{
        container.innerHTML += operation;
    }
}

function calculate() {
    var container = document.getElementById("result-area");
    var result = eval(container.innerHTML);
    container.innerHTML = result; 
    container.classList.add("result")
}

function deleteLast() {
    var container = document.getElementById("result-area");
    if (container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3)
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1)
    }
    

}

function deleteAll() {
    var container = document.getElementById("result-area");
    container.innerHTML = "";
}