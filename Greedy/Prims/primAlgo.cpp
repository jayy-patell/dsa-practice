#include <iostream>
using namespace std;

int findMinVertex(int distance[], int visited[], int v) {
    int minVal = INT_MAX, minIndex;

    for (int i = 0; i < v; i++)
        if (!visited[i] && distance[i] < minVal) {
            minIndex = i;
            minVal = distance[i];
        }

    return minIndex;
}

int main() {
    int v, e;
    cout<<"Enter no of vertices and edges"<<endl;
    cin >> v >> e;
    cout << endl;

    int adj[20][20];

    for (int i = 0; i < v; i++)
        for (int j = 0; j < v; j++)
            adj[i][j] = 0;

    cout<<"Enter source destination and path length"<<endl;
    for (int i = 0; i < e; i++) {
        int s, d, c;
        cin >> s >> d >> c;
        adj[s][d] = c;
    }

    int visited[20];
    for (int i = 0; i < v; i++)
        visited[i] = 0;

    int distance[20];
    int parent[20];

    for (int i = 1; i < v; i++)
        distance[i] = INT_MAX;

    distance[0] = 0;

    for (int i = 0; i < v - 1; i++) {
        int curr = findMinVertex(distance, visited, v);
        visited[curr] = 1;

        for (int j = 0; j < v; j++)
            if (visited[j]==0 && adj[curr][j] != 0)
                if (distance[j] > adj[curr][j]) {
                    distance[j] = adj[curr][j];
                    parent[j] = curr;
                }
    }

    for (int i = 1; i < v; i++)
        cout << min(parent[i], i) << " -> " << max(parent[i], i) << " : " << distance[i] << "\n";

    return 0;
}