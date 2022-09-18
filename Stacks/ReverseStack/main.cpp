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
void reversestack(stack<int>&s){
    //base case
    if(s.empty()){
        return;
    }
    int num = s.top();
    s.pop();

    //recursive call
    reversestack(s);

    insertAtBottom(s,num);
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
    reversestack(s);
    cout<<"---------------"<<endl;
    while (!s.empty())
    {
        int p=s.top();
        s.pop();
        cout << p << endl;
    }
    return 0;
}