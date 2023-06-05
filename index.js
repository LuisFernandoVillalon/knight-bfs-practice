//class for storing a box on the board's data
class Node {
    constructor(x,y,distance,nodeBefore) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.nodeBefore = nodeBefore;
    }
}
///returns true if (x, y) lies inside the board
function isInside(x,y,board) {
    if (x >= 1 && x <= board && y >= 1 && y <= board) {
        return true;
    } else {
        return false;
    }
}
//returns minimum steps to reach target
function minStepToReachTarget(knightPos, targetPos, board) {
    // x and y direction, where a knight can move
    let dx = [ -2, 1, 1, 2, -2, -1, 1, 2];
    let dy= [ -1, -2, -2, -1, 1, 2, 2, 1];

    //queue for storing states of knight in board
    let q = [];
    //push starting position of knight with zero distance
    q.push(new Node(knightPos[0], knightPos[1], 0, null));
    let temp;
    let x, y;
    let visit = new Array(board + 1);
    
    // make all spaces(Node) unvisisted
    for (let i = 0; i <= board; ++i) {
        visit[i] = new Array(board+1);
        
        for (let j = 1; j <= board; ++j) {
            visit[i][j] = false;
        } 
    }

    // visit starting state
    visit[knightPos[0]][knightPos[1]] = true;
  
    //loop until we have one element in queue
    while (q.length != 0) {
        temp = q.shift();
        //if current node equals to target, returns its distance
        if (temp.x === targetPos[0] && temp.y === targetPos[1]) {
           return temp; 
        }
      
        //loop for all reachable states
        for (let i = 0; i < 8; ++i) {
            x = temp.x + dx[i];
            y = temp.y + dy[i];
           
            //If reachable state is not yet visited an d inside board, push that state into queue
            if (isInside (x, y, board) && !visit[x][y]) {
                visit[x][y] = true;
                q.push(new Node(x, y, temp.distance + 1, temp));
          
            }
          
        }
    }
    
}

let board = 8;
let knightPost = [5,3];
let trgtPos = [3,1];

let tempNode = minStepToReachTarget(knightPost, trgtPos, board);
let ansDist = minStepToReachTarget(knightPost, trgtPos, board);
let track = [];
while(tempNode.nodeBefore !== null) {
    track.push([tempNode.nodeBefore.x, tempNode.nodeBefore.y]);
    tempNode = tempNode.nodeBefore;
}
track.unshift(trgtPos);
console.log("=> You made it in " + ansDist.distance + " moves!");
console.log("Here's your path: ");
let orderArr = [...track].reverse();
orderArr.map((coord) =>
    console.log(coord)
)