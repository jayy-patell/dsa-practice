#include <iostream>
#include <vector>
#include <stack>

using namespace std;

class Graph
{
public:
    void dfs(int node, int vis[], vector<int> adj[], stack<int> &st)
    {
        vis[node] = 1;
        for (auto it : adj[node])
        {
            if (!vis[it])
                dfs(it, vis, adj, st);
        }
        // before returning from call push the value in the stack
        st.push(node);
    }

    vector<int> topoSort(int V, vector<int> adj[])
    {
        int vis[V] = {0};
        stack<int> st;
        for (int i = 0; i < V; i++)
        {
            if (!vis[i])
                dfs(i, vis, adj, st);
        }

        vector<int> topo;
        while (!st.empty())
        {
            topo.push_back(st.top());
            st.pop();
        }
        return topo;
    }
};

int main()
{
    int n, m;
    cin >> n >> m;
    vector<int> adj[n];
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
    }

    Graph obj;
    vector<int> ans = obj.topoSort(n, adj);
    for (auto it : ans)
        cout << it << " ";
    cout << endl;
    return 0;
}

// Test Case :
// 6 6
// 5 0
// 5 2
// 2 3
// 4 0
// 4 1
// 3 1