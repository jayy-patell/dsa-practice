#include<iostream>
#include<stack>

using namespace std;

void solve(stack<int>&s,int count,int size){
    //base case
    if(count == size/2){
        s.pop(); return;
    }
    int num = s.top();
    s.pop();

    //recursive call
    solve(s,count+1,size);

    s.push(num);
}

int main(){
    stack<int> s;
    int count=0, size, num;
    cout<<"Enter size of stack: "<<endl;
    cin>>size;
    cout<<"Enter elements in stack: "<<endl;
    for(int i=0;i<size;i++){
        cin>>num;
        s.push(num);
    }
    solve(s,count,size);
    
    for(int i=0;i<size;i++){
        int rem = s.top();
        s.pop();
        cout<<rem<<endl;
    }

    // while (!s.empty())
    // {
    //     int p=s.top();
    //     s.pop();
    //     cout << p << endl;
    // }

    return 0;
}