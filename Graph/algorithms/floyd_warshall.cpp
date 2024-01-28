#include <iostream>
#include <vector>
using namespace std;

class Graph
{
public:
    void floyd_warshall(vector<vector<int>> &matrix)
    {
        int n = matrix.size();
        for (int k = 0; k < n; k++)
        {
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    if (matrix[i][k] != INT_MAX && matrix[k][j] != INT_MAX && matrix[i][k] + matrix[k][j] < matrix[i][j])
                    {
                        matrix[i][j] = matrix[i][k] + matrix[k][j];
                    }
                }
            }
        }
    }
};

int main()
{
    int n, m;
    cin >> n >> m;
    vector<vector<int>> matrix(n, vector<int>(n, INT_MAX));
    for (int i = 0; i < m; i++)
    {
        int u, v, wt;
        cin >> u >> v >> wt;
        matrix[u][v] = wt;
    }
    for (int i = 0; i < n; i++)
    {
        matrix[i][i] = 0;
    }
    Graph g;
    g.floyd_warshall(matrix);
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}

// Input
// 4 6
// 0 1 2
// 1 0 1
// 1 2 3
// 3 2 4
// 3 0 3
// 3 1 5
