// cycle detection in undirected graph using bfs

#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class graph
{
    bool detect(int src, vector<int> adj[], int vis[])
    {
        vis[src] = 1;
        queue<pair<int, int>> q;
        q.push({src, -1});
        while (!q.empty())
        {
            int node = q.front().first;
            int parent = q.front().second;
            q.pop();

            for (auto adjnode : adj[node])
            {
                if (!vis[adjnode])
                {
                    vis[adjnode] = 1;
                    q.push({adjnode, node});
                }
                else if (parent != adjnode)
                {
                    return true;
                }
            }
        }
        return false;
    }

public:
    bool isCycle(int V, vector<int> adj[])
    {
        int vis[V] = {0};
        for (int i = 0; i < V; i++)
        {
            if (!vis[i])
            {
                if (detect(i, adj, vis))
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
    graph g;
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

// Test Case :
// 5
// 6
// 0 1
// 1 2
// 2 3
// 3 4
// 4 1
// 0 2
