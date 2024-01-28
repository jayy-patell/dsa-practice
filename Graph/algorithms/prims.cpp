#include <bits/stdc++.h>
using namespace std;

class Graph
{
public:
    int spanningTree(int V, vector<vector<int>> adj[])
    {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        // {wt, node}

        vector<int> vis(V, 0);
        pq.push({0, 0});
        int sum = 0;

        while (!pq.empty())
        {
            auto it = pq.top();
            pq.pop();
            int node = it.second;
            int wt = it.first;

            if (vis[node])
                continue;
            // add it to MST
            vis[node] = 1;
            sum += wt;

            for (auto it : adj[node])
            {
                int adjnode = it[0];
                int adjwt = it[1];
                if (!vis[adjnode])
                {
                    pq.push({adjwt, adjnode});
                }
            }
        }
        return sum;
    }
};

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int V, E;
        cin >> V >> E;

        vector<vector<int>> adj[V];

        int i = 0;
        while (i++ < E)
        {
            int u, v, w;
            cin >> u >> v >> w;
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }

        Graph obj;
        cout << obj.spanningTree(V, adj) << "\n";
    }

    return 0;
}

// Time Complexity: O(ElogV)
// Auxiliary Space: O(V)

// Testcase 1:
// 4 5
// 0 1 5
// 0 2 10
// 0 3 100
// 1 3 50
// 2 3 200

// Output: 150