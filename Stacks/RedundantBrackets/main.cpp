#include<iostream>
#include<stack>

using namespace std;

bool findRedandantBrackets(string &s){
    stack<char>st;
    for(int i=0;i<s.length();i++){
        char ch = s[i];
        if(ch=='('||ch=='+'||ch=='-'||ch=='*'||ch=='/'){
            st.push(ch);
        }else{
            //ch is either ')' or lowercase letter
            if( ch==')' ){
                bool isRedundant = true;
                while(st.top()!='('){
                    char top = st.top();
                    if(top=='+'||top=='-'||top=='*'||top=='/'){
                        isRedundant=false;   //it is NOT useless, its necessary
                    }
                    st.pop();   //works like top--
                }
                if(isRedundant == true){
                    return true;
                }
                st.pop();    //for clearing stack and removing last '('
            }
        }
    }
    return false;
}

int main(){
    string st;
    cout<<"Enter a string: ";
    cin>>st;

    if(findRedandantBrackets(st) == true){
        cout<<"GALAT HAI"<<endl;
    }else{
        cout<<"SAHI HAI"<<endl;
    }
    
    return 0;
}