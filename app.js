
const KEY="appstore_test";
let data = JSON.parse(localStorage.getItem(KEY)||"[]");

function density(abv){
    let table=[
        [0,0.998],[20,0.964],[40,0.932],[60,0.899]
    ];
    for(let i=0;i<table.length-1;i++){
        let [a1,d1]=table[i];
        let [a2,d2]=table[i+1];
        if(abv>=a1 && abv<=a2){
            let t=(abv-a1)/(a2-a1);
            return d1+t*(d2-d1);
        }
    }
    return 0.899;
}

function save(){
    let obj={
        name:document.getElementById("name").value,
        abv:Number(document.getElementById("abv").value),
        volume:Number(document.getElementById("volume").value),
        weight:Number(document.getElementById("weight").value)
    };
    obj.empty = obj.weight - (obj.volume * density(obj.abv));
    data.push(obj);
    localStorage.setItem(KEY, JSON.stringify(data));
    render();
}

function render(){
    document.getElementById("list").innerHTML = data.map(d=>
        `<div>${d.name} - empty weight ${d.empty.toFixed(1)}g</div>`
    ).join("");
}

render();
