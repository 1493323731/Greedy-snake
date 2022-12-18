//引入其他类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
//游戏控制器,控制其他所有类
class GameControl{
    //定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    //创建一个属性来存储蛇的移动方向(按键方向)
    direction:string='';
    //创建一个属性记录游戏是否结束
    isGameover=true;
    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel();
        this.init();
    }
    //游戏初始化方法,调用后游戏即开始
    init(){
        document.addEventListener("keydown",this.keydownHendler.bind(this));
        //调用move方法使蛇移动
        this.move();
    }
    //创建一个键盘按下的响应函数
    keydownHendler(event:KeyboardEvent){
        this.direction=event.key;        
    }
    //让蛇移动的方法
    move(){
        //获取蛇现在的坐标
        let X=this.snake.X;
        let Y=this.snake.Y;
        switch(this.direction){
            case "ArrowUp":
                Y-=10;
                break;
            case "ArrowDown":
                Y+=10;
                break;
            case "ArrowLeft":
                X-=10;
                break;
            case "ArrowRight":
                X+=10;
                break;
        }
        //检查蛇是否吃到了食物
        this.checkEat(X,Y);
        //修改蛇的X值和Y值
        try{
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(error:any){
            //进入catch,说明出现了异常
            alert(error.message+"!  游戏结束！");
            this.isGameover=false;//游戏结束,定时器不会继续执行
        }
        //开启一个定时调用,确保蛇一直在移动
        this.isGameover&&setTimeout(this.move.bind(this), 300-(this.scorePanel.level-1)*30);//随着等级提高速度越来越快
    }
    //定义一个方法,用来检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X===this.food.X&&Y===this.food.Y){
            //吃到食物后,食物位置重置
            this.food.modifythelocation();
            //吃到食物后,分数增加
            this.scorePanel.addScore();
            //蛇增加一截
            this.snake.addBody();
        }
    }
}
export default GameControl;