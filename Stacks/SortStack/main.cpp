#include<iostream>
#include<stack>

using namespace std;

void sortedInsert(stack<int>&s, int num){
    //base case
    if(s.empty() || (!s.empty() && s.top()<=num)){
        s.push(num);
        return;
    }
    int val = s.top();
    s.pop();

    //recursive call
    sortedInsert(s,num);

    s.push(val);
}

void sortStack(stack<int>&s){
    //base case
    if(s.empty()){
        return;
    }
    int num = s.top();
    s.pop();

    //recursive call
    sortStack(s);

    sortedInsert(s,num);
}

int main(){
    stack<int> s;
    int size, num;
    cout<<"Enter size of stack: "<<endl;
    cin>>size;
    cout<<"Enter elements in stack: "<<endl;
    for(int i=0;i<size;i++){
        cin>>num;
        s.push(num);
    }

    sortStack(s);

    while(!s.empty()){
        int p = s.top();
        s.pop();
        cout<<p<<"\t";
    }

    return 0;
}