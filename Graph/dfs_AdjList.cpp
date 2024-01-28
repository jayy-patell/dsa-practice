#include <iostream>
#include <vector>

using namespace std;

class graph2
{
private:
    void dfs2(int s, int visited[], vector<int> adj[], vector<int> &ls)
    {
        visited[s] = 1;
        ls.push_back(s);

        for (auto it : adj[s])
        {
            if (!visited[it])
            {
                dfs2(it, visited, adj, ls);
            }
        }
    }

public:
    void dfs(int n, vector<int> adj[])
    {
        int s;
        int visited[n] = {0};
        cout << "enter the source: " << endl;
        cin >> s;
        vector<int> ls;
        dfs2(s, visited, adj, ls);
        cout << "the dfs is:" << endl;
        for (auto i : ls)
        {
            cout << i << " ";
        }
    }
};

int main()
{
    graph2 g;
    int n, m, u, v, p;
    cout << "enter the number of vertices" << endl;
    cin >> n;
    cout << "enter the number of edges" << endl;
    cin >> m;
    vector<int> adj[n];
    cout << "enter the edge" << endl;
    for (int i = 0; i < m; i++)
    {
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // cause undirected graph
    }
    g.dfs(n, adj);
}