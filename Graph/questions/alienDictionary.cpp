#include <bits/stdc++.h>
using namespace std;

class Graph
{
public:
    vector<int> topoSort(int V, vector<int> adj[])
    {
        vector<int> inDegree(V, 0);
        for (int i = 0; i < V; i++)
        {
            for (auto it : adj[i])
            {
                inDegree[it]++;
            }
        }
        queue<int> q;
        for (int i = 0; i < V; i++)
        {
            if (inDegree[i] == 0)
            {
                q.push(i);
            }
        }
        vector<int> topo;
        while (!q.empty())
        {
            int node = q.front();
            q.pop();
            topo.push_back(node);
            for (auto it : adj[node])
            {
                inDegree[it]--;
                if (inDegree[it] == 0)
                {
                    q.push(it);
                }
            }
        }
        return topo;
    }

    string findOrder(string dict[], int N, int K)
    {
        vector<int> adj[K];
        for (int i = 0; i < N - 1; i++)
        {
            string word1 = dict[i];
            string word2 = dict[i + 1];
            int len = min(word1.length(), word2.length());
            for (int j = 0; j < len; j++)
            {
                if (word1[j] != word2[j])
                {
                    adj[word1[j] - 'a'].push_back(word2[j] - 'a');
                    break;
                }
            }
        }
        vector<int> topo = topoSort(K, adj);
        string ans = "";
        for (int i = 0; i < topo.size(); i++)
        {
            ans += (topo[i] + 'a');
        }
        return ans;
    }
};

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int N, K;
        cin >> N >> K;
        string dict[N];
        for (int i = 0; i < N; i++)
        {
            cin >> dict[i];
        }
        Graph obj;
        cout << obj.findOrder(dict, N, K) << endl;
    }
    return 0;
}