#include<iostream>
#include<stack>

using namespace std;

bool isValidParenthesis(string expr){
    stack<char> s;
    for(int i=0;i<expr.length();i++){
        char ch = expr[i];

        //if opening bracket, stack push
        //if closing bracket, stack top check and then pop

        if(ch=='(' || ch=='{' || ch=='['){
            s.push(ch);
        }else{
            //for closing bracket
            if(ch==')' || ch=='}' || ch==']'){
                if(!s.empty()){
                    char top = s.top();
                    if( (ch==')' && top=='(') || (ch=='}' && top=='{') || (ch==']' && top=='[') ){
                        s.pop();
                    }else{
                        return false;
                    }
                }   
            }
        }
    }
}

int main(){
    string expr;
    cout << "Enter an expression: " <<endl;
    cin>>expr;
    if(isValidParenthesis(expr) == true){
        cout << "Valid." <<endl;
    }else{
        cout << "Not valid." <<endl;
    }
    return 0;
}