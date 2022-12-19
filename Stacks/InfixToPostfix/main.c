#include<stdio.h>

int main(){
    // char exp[] = "a+b*(c^d-e)^(f+g*h)-i";
    char exp[] = "((a+b)-c*(d/e))+f";
    infixToPostfix(exp);
    return 0;
}

// int isOperand(char ch)
// {
//     return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
// }