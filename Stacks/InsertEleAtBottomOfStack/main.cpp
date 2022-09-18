#include<iostream>
#include<stack>

using namespace std;

void insertAtBottom(stack<int>&s, int x){
    //base case
    if(s.empty()){
        s.push(x); return;
    }
    int num = s.top();
    s.pop();

    //recursive call
    insertAtBottom(s,x);

    s.push(num);
}

int main(){
    stack<int> s;
    int count=0, size, num, val;
    cout<<"Enter size of stack: "<<endl;
    cin>>size;
    cout<<"Enter elements in stack: "<<endl;
    for(int i=0;i<size;i++){
        cin>>num;
        s.push(num);
    }
    cout<<"Enter element to bury at bottom"<<endl;
    cin>>val;
    insertAtBottom(s,val);
    while (!s.empty())
    {
        int p=s.top();
        s.pop();
        cout << p << endl;
    }
//     for(int i=0;i<size;i++){
//         int rem = s.top();
//         s.pop();
//         cout<<rem<<endl;
//     }
}