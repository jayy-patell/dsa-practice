#include<iostream>
#include<vector>
#include<queue>

using namespace std;

class graph{
    public:
    void bfs(int n,vector<int>adj[]){
        int s;
        int visited[n]={0};
        cout<<"enter the source :"<<endl;
        cin>>s;
        visited[s]=1;
        queue<int> q;
        q.push(s);
        vector<int>bfs;
        
        while(!q.empty()){
            int node=q.front();
            q.pop();
            bfs.push_back(node);

            for(auto it : adj[node]){
                if(!visited[it]){
                    visited[it]=1;
                    q.push(it);
                }
            }
        }
        cout<<"the bfs traversal: "<<endl;
        for(auto i : bfs){
            cout<<i<<" ";
        }
    }
};



int main(){
    graph g;
    int n,m,u,v;
    cout<<"enter the number of vertices"<<endl;
    cin>>n;
    cout<<"enter the number of edges"<<endl;
    cin>>m;
    vector<int>adj[n];

    for(int i=0;i<m;i++){
        cout<<"enter the vertices:"<<endl;
        cin>>u>>v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    g.bfs(n,adj);
    //cout<<"show off:"<<endl;
    //int p;
    //cin>>p;
    //for(auto it:adj[p]){
    //    cout<<it<<" ";
    //}
    return 0;
}