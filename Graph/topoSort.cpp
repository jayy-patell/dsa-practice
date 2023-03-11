#include<iostream>
#include<vector>
#include<stack>

using namespace std;

class topo{
    public:
    void dfs(vector<int>adj[],int visited[],int n,stack<int> &s){
        visited[n]=1;
        for(auto it:adj[n]){
            if(!visited[it]){
                dfs(adj,visited,it,s);
            }
        }
        s.push(n);
    }

    void sortt(vector<int>adj[],int n){
        int visited[n]={0};
        stack<int> s;
        for(int i=0;i<n;i++){
            if(visited[i]==0){
                dfs(adj,visited,i,s);
            }
        }
        while(!s.empty()){
            cout<<s.top()<<" ";
            s.pop();
        }
    }
};

int main(){
    topo t;
    int n,m,u,v;
    cout<<"vertices number:"<<endl;
    cin>>n;
    cout<<"no.of edges:"<<endl;
    cin>>m;
    cout<<"enter the edges:"<<endl;
    vector<int>adj[n];
    for(int i=0;i<m;i++){
        cin>>u>>v;
        adj[u].push_back(v);
    }
    t.sortt(adj,n);
}