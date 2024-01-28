#include <iostream>
#include <vector>

using namespace std;

class Graph
{
private:
    bool dfs(int node, int col, int color[], vector<int> adj[])
    {
        color[node] = col;
        for (auto it : adj[node])
        {
            if (color[it] == -1)
            {
                // allot a color to the node
                if (dfs(it, !col, color, adj) == false)
                    return false;
            }
            else if (color[it] == col)
            {
                // if adjacent node has same color
                return false;
            }
        }
        return true;
    }

public:
    bool isBipartite(int V, vector<int> adj[])
    {
        int color[V];
        for (int i = 0; i < V; i++)
            color[i] = -1;

        for (int i = 0; i < V; i++)
        {
            if (color[i] == -1)
            {
                if (dfs(i, 0, color, adj) == false)
                    return false;
            }
        }
        return true;
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

    if (g.isBipartite(n, adj))
    {
        cout << "It is Bipartite" << endl;
    }
    else
    {
        cout << "It is not bipartite" << endl;
    }
}

// Test Case :
// 7
// 7
// 0 1
// 1 2
// 2 3
// 3 4
// 5 4
// 1 5
// 4 6