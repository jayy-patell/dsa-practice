#include <bits/stdc++.h>
using namespace std;

class Graph
{
public:
    vector<int> bellman_ford(int V, vector<vector<int>> &edges, int S)
    {
        vector<int> dist(V, 1e8);
        dist[S] = 0;
        for (int i = 0; i < V - 1; i++)
        {
            for (auto edge : edges)
            {
                int u = edge[0];
                int v = edge[1];
                int wt = edge[2];
                if (dist[u] != 1e8 && dist[u] + wt < dist[v])
                {
                    dist[v] = dist[u] + wt;
                }
            }
        }
        // Nth relaxation to check negative cycle
        for (auto edge : edges)
        {
            int u = edge[0];
            int v = edge[1];
            int wt = edge[2];
            if (dist[u] != INT_MAX && dist[u] + wt < dist[v])
            {
                cout << "Negative cycle found";
                exit(0);
            }
        }
        return dist;
    }
};

int main()
{
    int n, m;
    cin >> n >> m;
    vector<vector<int>> edges;
    for (int i = 0; i < m; i++)
    {
        int u, v, wt;
        cin >> u >> v >> wt;
        edges.push_back({u, v, wt});
    }
    Graph g;
    vector<int> dist = g.bellman_ford(n, edges, 0);
    for (int i = 0; i < n; i++)
    {
        cout << i << " " << dist[i] << endl;
    }
    return 0;
}

// Time complexity: O(N*E)
// Space complexity: O(N)

// Input:
// 6 7
// 0 1 5
// 1 2 -2
// 1 5 -3
// 3 2 6
// 2 4 3
// 3 4 -2
// 5 3 1