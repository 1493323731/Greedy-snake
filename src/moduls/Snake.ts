class Snake{
    //定义一个属性表示蛇对应的元素
    snakeEle:HTMLElement;
    //表示蛇头的元素
    head:HTMLElement;
    //表示整个蛇
    snake:HTMLCollection;
    constructor(){
        this.snakeEle=document.getElementById("snake")!;
        this.head=document.querySelector("#snake>div")!;
        this.snake=this.snakeEle.getElementsByTagName("div");
    }
    //获取蛇头坐标
    get X(){
        return this.head.offsetLeft; 
    }
    get Y(){
        return this.head.offsetTop;
    }
    //设置蛇头坐标
    set X(value){
        //如果新值和旧值相同,则直接返回不再修改
        if(this.X===value){
            return;
        }
        
        //判断蛇是否撞墙,如果蛇撞墙了,则抛出异常
        if(value<0||value>290){
            throw new Error("蛇撞墙了");
        }
        //防止蛇掉头--该写法存在bug(蛇头位置发生错乱，第一截并不一定是蛇头)
        // if(this.snake[1]&&(this.snake[1] as HTMLElement).offsetLeft===value){
        //     //当存在第二截时,如果第一截的坐标等于第二截,说明发生了掉头
        //     //如果发生了掉头,让蛇反方向继续移动
            
        //     if(value>this.X){
        //         //如果新的value大于旧值X,说明蛇在向右走，应该使蛇继续向左走
        //         value=this.X-10;
        //     }else{
        //         //反之则说明蛇在向左走，应该使蛇继续向右走
        //         value=this.X+10;
        //     }
            
        // }
        //移动身体
        this.moveBody();

        this.head.style.left=value+'px';

        //检查有没有撞到自己
        this.checkCollision();
    }
    set Y(value){
        if(this.Y===value){
            return;
        }

        if(value<0||value>290){
            throw new Error("蛇撞墙了");
        }
        //防止蛇掉头--该写法存在bug(蛇头位置发生错乱，第一截并不一定是蛇头)
        // if(this.snake[1]&&(this.snake[1] as HTMLElement).offsetTop===value){
        //     //当存在第二截时,如果第一截的坐标等于第二截,说明发生了掉头
        //     //如果发生了掉头,让蛇反方向继续移动
            
        //     if(value>this.Y){
        //         //如果新的value大于旧值X,说明蛇在向右走，应该使蛇继续向左走
        //         value=this.Y-10;
        //     }else{
        //         //反之则说明蛇在向左走，应该使蛇继续向右走
        //         value=this.Y+10;
        //     }
            
        // }
        //移动身体
        this.moveBody();
        
        this.head.style.top=value+'px';

        //检查有没有撞到自己
        this.checkCollision();
    }
    //增加蛇身体的方法
    addBody(){
        this.snakeEle.insertAdjacentHTML("beforeend","<div></div>");//在结束标签之前添加一个div标签
    }
    //蛇身体移动的方法
    moveBody(){
        // 将后边身体的位置设置为前边身体的位置(从后往前遍历，从前往后会导致前边身体的位置丢失)
        for(let i=this.snake.length-1;i>0;i--){
            //获取前边身体的位置
            let X=(this.snake[i-1] as HTMLElement).offsetLeft;
            let Y=(this.snake[i-1] as HTMLElement).offsetTop;
            //将前边身体的位置设置到当前身体上
            (this.snake[i] as HTMLElement).style.left=X+"px";
            (this.snake[i] as HTMLElement).style.top=Y+"px";
        }

    }
    //检查蛇是否撞到自己
    checkCollision(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.snake.length;i++){
            if(this.X===(this.snake[i] as HTMLElement).offsetLeft&&this.Y===(this.snake[i] as HTMLElement).offsetTop){
                throw new Error("撞到自己了");
            }
        }
    }
}
export default Snake;