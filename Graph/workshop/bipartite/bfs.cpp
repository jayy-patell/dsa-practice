#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class Solution
{
public:
    bool check(int start, int V, vector<int> adj[], int color[])
    {
        queue<int> q;
        color[start] = 0;
        q.push(start);

        while (!q.empty())
        {
            int node = q.front();
            q.pop();
            for (auto it : adj[node])
            {
                // if the adjacent node is yet not colored
                //  you will give the opposite color of the node
                if (color[it] == -1)
                {
                    color[it] = !color[node];
                    q.push(it);
                }
                // if the adjacent node is already colored same
                // someone did color it on some othe path
                else if (color[it] == color[node])
                {
                    return false;
                }
                // if the adjacent node is already colored different
                // then do nothing
            }
        }
        return true;
    }

    bool isBipartite(int V, vector<int> adj[])
    {
        int color[V];
        for (int i = 0; i < V; i++)
            color[i] = -1;

        for (int i = 0; i < V; i++)
        {
            if (color[i] == -1)
            {
                if (!check(i, V, adj, color))
                {
                    return false;
                }
            }
        }
        return true;
    }
};

int main()
{
    Solution s;
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

    if (s.isBipartite(n, adj))
    {
        cout << "yes" << endl;
    }
    else
    {
        cout << "no" << endl;
    }

    return 0;
}

// Test Case :
// 6
// 6
// 0 1
// 1 2
// 2 3
// 3 4
// 4 5
// 1 4