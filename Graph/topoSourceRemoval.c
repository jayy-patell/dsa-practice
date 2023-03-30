//Topological Sort using Source Removal method

#include<stdio.h>
#include<stdlib.h>

int g[20][20];
int V;
int removed[20];
int seq[20];
int c=0;

int incoming(int v){
    for(int i=0;i<V;i++){
        if(g[i][v]==1)
            return 1;
    }
    return 0;
}

void delVertex(int v){
    seq[c++]=v;
    removed[v]=1;
    for(int i=0;i<V;i++)
        g[v][i]=0;
}

void findSource(){
    while(c<V){
        for(int i=0;i<V;i++){
            if(!incoming(i) && !removed[i])
                delVertex(i);
        }
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
    findSource();
    printf("\n--Topological Sort Sequence--\n");
    for(int i=0;i<V;i++)
        printf("%d\t",seq[i]);
    printf("\n");
}