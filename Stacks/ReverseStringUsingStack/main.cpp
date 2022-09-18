#include<iostream>
#include<stack>
#include<string>

using namespace std;

int main(){
    string str;
    cout<<"Enter a string: "<<endl;
    cin>>str;
    stack<char> s;    //it still works with <int>
    for(int i=0;i<str.length();i++){
        s.push(str[i]);
    }
    string ans = "";
    while(!s.empty()){
        char ch = s.top();
        ans.push_back(ch);
        s.pop();
    }
    cout<<"Reverse of that is: "<<ans<<endl;
}