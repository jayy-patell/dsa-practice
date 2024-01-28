// graph using adjacency list
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, m;
    cout << "Enter the number of nodes and edges: ";
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    cout << "Enter the edges: " << endl;
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v); // directed graph
        adj[v].push_back(u);
    }
    for (int i = 1; i <= n; i++)
    {
        cout << i << "->";
        for (auto it : adj[i])
        {
            cout << it << " ";
        }
        cout << endl;
    }
    return 0;
}

// graph using adjacency matrix
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, m;
    cout << "Enter the number of nodes and edges: ";
    cin >> n >> m;
    vector<vector<int>> adj(n + 1, vector<int>(n + 1, 0));
    cout << "Enter the edges: " << endl;
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        adj[u][v] = 1; // directed graph
        adj[v][u] = 1;
    }
    cout << "Adjacency matrix of above graph is given by: " << endl;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            cout << adj[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}

// Test case
// 5 5
// 1 2
// 1 3
// 2 4
// 3 4
// 4 5
