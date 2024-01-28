// Source Removal Algorithm for Topological Sort

#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Graph
{
public:
    vector<int> topoSort(int V, vector<int> adj[])
    {
        int indegree[V] = {0};
        for (int i = 0; i < V; i++)
        {
            for (auto it : adj[i])
            {
                indegree[it]++;
            }
        }

        queue<int> q;
        for (int i = 0; i < V; i++)
        {
            if (indegree[i] == 0)
                q.push(i);
        }

        vector<int> topo;
        while (!q.empty())
        {
            int node = q.front();
            q.pop();
            topo.push_back(node);

            // node is in your topo sort now
            // so please reduce it from the indegree of its children
            for (auto it : adj[node])
            {
                indegree[it]--;
                if (indegree[it] == 0)
                    q.push(it);
            }
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