#include <iostream>
#include <vector>
#include <stack>

using namespace std;

class Graph
{
public:
    bool dfsCheck(int node, vector<int> adj[], int vis[], int pathVis[])
    {
        vis[node] = 1;
        pathVis[node] = 1;

        for (auto it : adj[node])
        {
            // when the node is not visited
            if (!vis[it])
            {
                if (dfsCheck(it, adj, vis, pathVis) == true)
                    return true;
            }
            // if the node has previously been visited
            // but it has to be visited on the same path
            else if (pathVis[it])
                return true;
        }

        // remove from path while returning
        pathVis[node] = 0;
        return false;
    }

    bool isCyclic(int V, vector<int> adj[])
    {
        int vis[V] = {0};
        int pathVis[V] = {0};

        for (int i = 0; i < V; i++)
        {
            if (!vis[i])
            {
                if (dfsCheck(i, adj, vis, pathVis))
                    return true;
            }
        }
        return false;
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

    Graph g;
    cout << g.isCyclic(n, adj);
    return 0;
}

// Test Case :
// 10
// 11
// 0 1
// 1 2
// 2 3
// 3 4
// 4 5
// 2 6
// 6 4
// 7 1
// 7 8
// 8 9
// 9 7