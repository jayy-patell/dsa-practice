/* Depth First Search Traversal */
//Here we are displaying the vertices when we are pushing them in the stack

#include<stdio.h>
#include<stdlib.h>

int g[20][20];
int V;
int visited[20];
int stack[20], top=-1;
int seq[20], c=0;

void push(int v){
    stack[++top] = v;
}

int pop(){
    if(top==-1)
        return -1;
    return stack[top--];
}

void dfsv(int v){
    seq[c++]=v;
    visited[v] = 1;
    push(v);
    printf("Push %d\n",v);
    int i;
    for(i = 0; i < V; ++i){
        if(!visited[i] && g[v][i])
            dfsv(i);
    }
    printf("Pop %d\n",pop());
}

void dfs(){
    int i;
    for(i = 0; i < V; ++i){
        if(!visited[i])
              dfsv(i);
      }
}

void main(){
    printf("Enter the Number of Vertices : \n");
    scanf(" %d", &V);
    int i, j;
    printf("Enter the Adjacency Matrix: \n");
    for (i = 0; i < V; ++i){
        for (j = 0; j < V; ++j)
            scanf(" %d", &g[i][j]);
    }
    printf("\n");
    dfs();
    printf("\n--Sequence--\n");
    for(int i=0;i<V;i++)
        printf("%d\t",seq[i]);
    printf("\n");
}



// /*Harder Approach.. with actually making graph(vertex and edge)*/

// #include<stdio.h>
// #include<stdlib.h>
// #include<stdbool.h>

// #define MAX 5

// struct Vertex {
//     char label;
//     bool visited;
// };

// int stack[MAX];
// int top = -1;

// //array of vertices
// struct Vertex* Vertices[MAX];

// //adjacency matrix
// int adjMatrix[MAX][MAX];

// //vertex count
// int vertexCount = 0;

// //stack functions
// void push(int item) {stack[++top] = item;}
// int pop() {return stack[top--];}
// int peek() {return stack[top];}
// bool isEmpty() {return (top == -1);}

// //add vertex to the vertex list
// void addVertex(char label) {
//     struct Vertex* vertex = (struct Vertex*)malloc(sizeof(struct Vertex));
//     vertex->label = label;
//     vertex->visited = false;
//     Vertices[vertexCount++] = vertex;
// }   

// //add edge to edge array
// void addEdge(int start, int end) {
//     adjMatrix[start][end] = 1;
//     adjMatrix[end][start] = 1;
// }

// //get the adjacent unvisited vertex
// int getAdjUnvisitedVertex(int vertexIndex) {
//     int i;
//     for(i=0;i<vertexCount;i++){
//         if(adjMatrix[vertexIndex][i] == 1 && Vertices[i]->visited == false) {
//             return i;
//         }
//     }

//     return -1;
// }

// //display the vertex
// void display(int vertexIndex) {
//     printf("%c", Vertices[vertexIndex]->label);
// }

// void dfs() {
//     int i;

//     Vertices[0]->visited = true;  //mark the first node as visited
//     display(0);
//     push(0);    //push vertex index in stack

//     while(!isEmpty()) {
//         //get unvisited vertex of Vertices which is at top of the stack
//         int unvisitedVertex = getAdjUnvisitedVertex(peek());

//         //no adjacent vertex found
//         if(unvisitedVertex == -1){
//             pop();
//         }else{
//             Vertices[unvisitedVertex]->visited = true;
//             display(unvisitedVertex);
//             push(unvisitedVertex);
//         }
//     }

//     //stack empty,search complete,reset flags
//     for(i=0;i<vertexCount;i++){
//         Vertices[i]->visited = false;
//     }
// }

// int main(){
//     int i, j;

//    for(i = 0; i < MAX; i++) {    // set adjacency
//       for(j = 0; j < MAX; j++) // matrix to 0
//          adjMatrix[i][j] = 0;
//    }

//    addVertex('S');   // 0
//    addVertex('A');   // 1
//    addVertex('B');   // 2
//    addVertex('C');   // 3
//    addVertex('D');   // 4

//    addEdge(0, 1);    // S - A
//    addEdge(0, 2);    // S - B
//    addEdge(0, 3);    // S - C
//    addEdge(1, 4);    // A - D
//    addEdge(2, 4);    // B - D
//    addEdge(3, 4);    // C - D

//    printf("Depth First Search: ");
//    dfs(); 

//    return 0;
// }
