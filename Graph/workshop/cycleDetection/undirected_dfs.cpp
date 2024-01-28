#include <iostream>
#include <vector>

using namespace std;

class Graph
{
    bool dfs(int node, int parent, vector<int> &vis, vector<int> adj[])
    {
        vis[node] = 1;
        for (auto adjnode : adj[node])
        {
            if (!vis[adjnode])
            {
                if (dfs(adjnode, node, vis, adj))
                    return true;
            }
            else if (parent != adjnode)
                return true;
        }
        return false;
    }

public:
    bool isCycle(int V, vector<int> adj[])
    {
        vector<int> vis(V, 0);
        for (int i = 0; i < V; i++)
        {
            if (!vis[i])
            {
                if (dfs(i, -1, vis, adj))
                {
                    return true;
                }
            }
        }
        return false;
    }
};

int main()
{
    Graph g;
    int n, m, u, v;
    cout << "enter the number of vertices" << endl;
    cin >> n;
    cout << "enter the number of edges" << endl;
    cin >> m;
    vector<int> adj[n];

    for (int i = 0; i < m; i++)
    {
        cout << "enter the vertices:" << endl;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    if (g.isCycle(n, adj))
    {
        cout << "cycle is present" << endl;
    }
    else
    {
        cout << "cycle is not present" << endl;
    }
}

// Time Complexity: O(V+E)
// Space Complexity: O(V)

// Test Case:
// 5
// 6
// 0 1
// 1 2
// 2 3
// 3 4
// 4 1
// 0 2