//定义食物类
class Food{
    //定义一个属性表示食物所对应的元素
    element:HTMLElement;
    constructor(){
        //获取页面中的food元素并将其赋值给element
        this.element=document.getElementById("food")!;
    }
    //定义一个获取食物X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    //定义一个获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    //修改食物的位置的方法
    modifythelocation(){
        let left=Math.round(Math.random()*29)*10;//随机产生一个0-290的X坐标
        let top=Math.round(Math.random()*29)*10;//随机产生一个0-290的Y坐标
        this.element.style.left=left+"px";
        this.element.style.left=top+"px";
    }
}
export default Food;